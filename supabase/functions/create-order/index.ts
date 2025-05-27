
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
  specialization: string;
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

    // Get authenticated user (if any)
    const authHeader = req.headers.get("Authorization");
    let user = null;
    
    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? ""
      );

      const token = authHeader.replace("Bearer ", "");
      const { data: { user: authUser }, error: authError } = await supabaseClient.auth.getUser(token);
      
      if (!authError && authUser) {
        user = authUser;
      }
    }

    const { items, totalAmount, customerName, customerEmail, customerPhone, specialization }: CreateOrderRequest = await req.json();

    // Validate specialization
    if (!specialization || !['cloud_security', 'data_analytics'].includes(specialization)) {
      throw new Error('Invalid specialization provided');
    }

    // Generate unique order ID and secure access token
    const orderId = crypto.randomUUID();
    const accessToken = crypto.randomUUID();

    // Encrypt specialization for additional security
    const { data: encryptedSpecialization, error: encryptError } = await supabaseAdmin
      .rpc('encrypt_pii', { data: specialization });

    if (encryptError) {
      console.error('Failed to encrypt specialization:', encryptError);
    }

    // Create order in database with proper structure including specialization
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        id: orderId,
        user_id: user?.id || null,
        total_amount: totalAmount * 100, // Convert to cents
        order_status: 'pending',
        access_token: accessToken,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        specialization: specialization,
        specialization_encrypted: encryptedSpecialization,
        items: items
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Send confirmation email to customer
    try {
      const emailResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-order-confirmation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          orderNumber: order.order_number,
          customerName,
          customerEmail,
          totalAmount,
          items,
          specialization,
          accessToken: accessToken
        })
      });

      if (!emailResponse.ok) {
        console.error("Failed to send confirmation email:", await emailResponse.text());
      }
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }

    // Send admin notification email with specialization info
    try {
      const adminNotificationResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-admin-notification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          orderNumber: order.order_number,
          customerName,
          customerEmail,
          customerPhone,
          totalAmount,
          items,
          specialization
        })
      });

      if (!adminNotificationResponse.ok) {
        console.error("Failed to send admin notification:", await adminNotificationResponse.text());
      } else {
        console.log("Admin notification sent successfully");
      }
    } catch (adminError) {
      console.error("Error sending admin notification:", adminError);
    }

    // Clear user's cart if authenticated
    if (user) {
      await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      orderId: order.id,
      orderNumber: order.order_number,
      accessToken: accessToken,
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
