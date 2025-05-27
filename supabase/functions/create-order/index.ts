
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateOrderRequest {
  items: Array<{
    name: string;
    price: number;
    quantity?: number;
  }>;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { items, totalAmount, customerName, customerEmail, customerPhone }: CreateOrderRequest = await req.json();

    // Generate unique order ID and access token
    const orderId = `EDU-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const accessToken = crypto.randomUUID();

    // Create order in database
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        id: orderId,
        user_id: user.id,
        total_amount: totalAmount * 100, // Convert to cents
        order_status: 'pending',
        access_token: accessToken,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        items: items
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Send confirmation email
    const emailResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-order-confirmation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        customerName,
        customerEmail,
        totalAmount,
        items
      })
    });

    if (!emailResponse.ok) {
      console.error("Failed to send confirmation email:", await emailResponse.text());
    }

    // Clear user's cart
    await supabaseAdmin
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    return new Response(JSON.stringify({ 
      success: true, 
      orderId,
      message: "Order created successfully and confirmation email sent!"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
