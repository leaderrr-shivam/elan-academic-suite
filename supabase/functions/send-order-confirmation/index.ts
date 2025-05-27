
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  orderId: string;
  orderNumber?: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  accessToken?: string;
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
    const { orderId, orderNumber, customerName, customerEmail, totalAmount, accessToken, items }: OrderConfirmationRequest = await req.json();

    const itemsList = items.map(item => 
      `<li style="margin-bottom: 8px;">
        <strong>${item.name}</strong>
        ${item.quantity ? ` (Quantity: ${item.quantity})` : ''} - ₹${item.price.toLocaleString()}
      </li>`
    ).join('');

    // Create secure order tracking link if access token is provided
    const trackingLink = accessToken 
      ? `${Deno.env.get("SITE_URL") || "https://eduelan.com"}/track-order?token=${accessToken}`
      : '';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #4f46e5); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px 20px; border: 1px solid #e5e7eb; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
          .order-details { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .total { font-size: 18px; font-weight: bold; color: #2563eb; }
          .security-note { background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0; }
          .tracking-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for choosing EduElan</p>
          </div>
          
          <div class="content">
            <h2>Hello ${customerName},</h2>
            
            <p>Your order has been successfully placed and confirmed! We're excited to help you achieve academic excellence.</p>
            
            <div class="order-details">
              <h3>📋 Order Details</h3>
              <p><strong>Order ID:</strong> ${orderId}</p>
              ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
              <p><strong>Items Purchased:</strong></p>
              <ul>${itemsList}</ul>
              <p class="total">Total Amount: ₹${totalAmount.toLocaleString()}</p>
            </div>

            ${trackingLink ? `
            <div style="text-align: center; margin: 20px 0;">
              <a href="${trackingLink}" class="tracking-button">🔍 Track Your Order</a>
              <p style="font-size: 12px; color: #666;">Secure order tracking with your unique access token</p>
            </div>
            ` : ''}

            <div class="security-note">
              <h4>🔒 Privacy & Security</h4>
              <p>Your personal information is encrypted and secure. We never share your data with third parties and maintain strict privacy standards for all student information. Your order is protected with a unique access token for secure tracking.</p>
            </div>

            <h3>📚 What's Included in Your Order:</h3>
            <ul>
              <li>Complete project report (100-150 pages)</li>
              <li>Comprehensive viva questions with detailed answers</li>
              <li>Professional formatting per university guidelines</li>
              <li>Plagiarism report for quality assurance</li>
              <li>Technical documentation (if applicable)</li>
              <li>Delivery in both .docx and .pdf formats</li>
            </ul>

            <h3>⏰ What Happens Next:</h3>
            <ul>
              <li><strong>Within 2 hours:</strong> Our expert team will start working on your order</li>
              <li><strong>48-72 hours:</strong> You'll receive your complete materials via email</li>
              <li><strong>Quality Check:</strong> Every project undergoes thorough review before delivery</li>
              <li><strong>Support:</strong> Our team is available for any questions or clarifications</li>
            </ul>

            <p>Your academic success is our priority. If you have any questions, please don't hesitate to contact our support team.</p>
            
            <p>Best regards,<br>
            <strong>The EduElan Team</strong><br>
            Your Academic Success Partners</p>
          </div>
          
          <div class="footer">
            <p><small>This is an automated confirmation email. Your order details are securely stored and accessible only to you with your unique access token.</small></p>
            <p><small>© 2025 EduElan. Committed to student privacy and academic excellence.</small></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "EduElan <orders@eduelan.com>",
      to: [customerEmail],
      subject: `Order Confirmation - ${orderNumber || orderId} | EduElan`,
      html: emailHtml,
    });

    console.log("Order confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation email:", error);
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
