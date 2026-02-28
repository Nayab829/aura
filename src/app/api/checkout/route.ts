import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { CheckoutData, CartItem } from '@/types';

export async function POST(req: Request) {
  try {
    const data: CheckoutData = await req.json();
    const { contactInfo, cart, total } = data;

    // Create a Nodemailer transporter using production SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const userEmailHtml = `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, <strong>${contactInfo.firstName}</strong>!</p>
      <p>We have received your order and will process it shortly.</p>
      <br />
      <h2>Order Details</h2>
      <ul style="list-style-type: none; padding: 0;">
        ${cart.map((item: CartItem) => `<li style="padding: 10px 0; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br />
          Qty: ${item.qty} &times; PKR ${item.price.toLocaleString()}
        </li>`).join('')}
      </ul>
      <h3 style="margin-top:20px;"><strong>Order Total: PKR ${total.toLocaleString()}</strong></h3>
    `;

    const adminEmailHtml = `
      <h1>New Order Received!</h1>
      <p>A new order has been placed by ${contactInfo.firstName} ${contactInfo.lastName} (${contactInfo.email})</p>
      <br />
      <h2>Customer Details</h2>
      <p><strong>Name:</strong> ${contactInfo.firstName} ${contactInfo.lastName}</p>
      <p><strong>Email:</strong> ${contactInfo.email}</p>
      <p><strong>Phone:</strong> ${contactInfo.phone}</p>
      <p><strong>Address:</strong> ${contactInfo.address}, ${contactInfo.apartment ? contactInfo.apartment + ',' : ''} ${contactInfo.city}, ${contactInfo.postalCode}</p>
      <br />
      <h2>Order Items</h2>
      <ul style="list-style-type: none; padding: 0;">
        ${cart.map((item: CartItem) => `<li style="padding: 10px 0; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br />
          Qty: ${item.qty} &times; PKR ${item.price.toLocaleString()}
        </li>`).join('')}
      </ul>
      <h3 style="margin-top:20px;"><strong>Total Value: PKR ${total.toLocaleString()}</strong></h3>
    `;

    // Send user order confirmation
    let infoUser = await transporter.sendMail({
      from: '"Aura Sentiments" <no-reply@aurasentiments.com>',
      to: contactInfo.email,
      subject: "Your Order Confirmation - Aura Sentiments",
      html: userEmailHtml,
    });

    // Send admin notification
    let infoAdmin = await transporter.sendMail({
      from: '"Store System" <system@aurasentiments.com>',
      to: "haniakhan69717@gmail.com",
      subject: `New Order from ${contactInfo.firstName} - Aura Sentiments`,
      html: adminEmailHtml,
    });

    // Remove Ethereal test URLs for production
    console.log("Emails sent successfully.");

    return NextResponse.json({ 
      success: true 
    });

  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
