
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  orderId: string;
  orderNumber?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  totalAmount: number;
  items: Array<{
    name: string;
    price: number;
    quantity?: number;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, orderNumber, customerName, customerEmail, customerPhone, totalAmount, items }: AdminNotificationRequest = await req.json();

    const itemsList = items.map(item => 
      `<li style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px;">
        <strong style="color: #1e40af;">${item.name}</strong><br>
        <span style="color: #64748b;">Price: ₹${item.price.toLocaleString()}</span>
        ${item.quantity ? ` | Quantity: ${item.quantity}` : ''}
        <br><span style="color: #059669; font-weight: 600;">Subtotal: ₹${(item.price * (item.quantity || 1)).toLocaleString()}</span>
      </li>`
    ).join('');

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9fafb; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none; }
          .order-summary { background: #fef3c7; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 6px solid #f59e0b; }
          .customer-info { background: #dbeafe; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 6px solid #3b82f6; }
          .items-list { background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 20px 0; }
          .total-amount { font-size: 24px; font-weight: bold; color: #dc2626; text-align: center; background: #fee2e2; padding: 15px; border-radius: 8px; }
          .action-needed { background: #fecaca; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0; }
          .urgent { animation: pulse 2s infinite; }
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header urgent">
            <h1>🚨 NEW ORDER ALERT!</h1>
            <p style="font-size: 18px; margin: 10px 0;">Immediate Action Required</p>
          </div>
          
          <div class="content">
            <div class="action-needed">
              <h3>⚡ ACTION REQUIRED</h3>
              <p><strong>A new order has been placed and requires immediate processing!</strong></p>
              <p>Customer is expecting delivery within 48-72 hours.</p>
            </div>

            <div class="order-summary">
              <h3>📋 Order Summary</h3>
              <p><strong>Order ID:</strong> ${orderId}</p>
              ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
              <p><strong>Order Date:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              <div class="total-amount">Total: ₹${totalAmount.toLocaleString()}</div>
            </div>

            <div class="customer-info">
              <h3>👤 Customer Information</h3>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
              ${customerPhone ? `<p><strong>Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p>` : ''}
            </div>

            <div class="items-list">
              <h3>🛒 Items Ordered</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">${itemsList}</ul>
            </div>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border-left: 6px solid #22c55e; margin: 20px 0;">
              <h3>📝 Next Steps</h3>
              <ol style="color: #166534;">
                <li><strong>Immediate:</strong> Acknowledge receipt of order</li>
                <li><strong>Within 2 hours:</strong> Begin content preparation</li>
                <li><strong>48-72 hours:</strong> Complete delivery to customer</li>
                <li><strong>Quality Check:</strong> Ensure all materials meet standards</li>
              </ol>
            </div>

            <div style="background: #fffbeb; padding: 20px; border-radius: 12px; border-left: 6px solid #f59e0b; margin: 20px 0;">
              <h3>⚠️ Important Reminders</h3>
              <ul style="color: #92400e;">
                <li>Verify project requirements with customer if needed</li>
                <li>Ensure plagiarism-free content</li>
                <li>Follow university guidelines and formatting</li>
                <li>Prepare both .docx and .pdf formats</li>
                <li>Include comprehensive viva questions</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>EduElan Admin Dashboard</strong></p>
            <p><small>This is an automated notification. Please process this order promptly to maintain our delivery commitments.</small></p>
            <p><small>Order received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send to admin email
    const emailResponse = await resend.emails.send({
      from: "EduElan Orders <orders@eduelan.com>",
      to: ["admin@eduelan.com"], // Replace with your actual admin email
      subject: `🚨 NEW ORDER #${orderNumber || orderId.slice(0, 8)} - ₹${totalAmount.toLocaleString()} - ${customerName}`,
      html: adminEmailHtml,
    });

    console.log("Admin notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending admin notification email:", error);
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
