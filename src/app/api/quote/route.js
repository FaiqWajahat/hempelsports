import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      fullName,
      companyName,
      email,
      phone,
      country,
      categories,
      quantity,
      deliveryDate,
      projectDescription,
      productSku, // Read from product URL query param if present
    } = data;

    // Validate essential fields
    if (!fullName || !email || !phone || !projectDescription) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter - Fallback to Test Account if no SMTP creds exist!
    let transporter;
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Generate a test ethereal account on the fly for development/testing
      const testAccount = await nodemailer.createTestAccount();
      console.log("No SMTP credentials found in .env. Using Ethereal Test Account:", testAccount.user);
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }

    // Format the email content
    const htmlContent = `
      <h2>New Quote Request via Venpa Sports</h2>
      <p><strong>From:</strong> ${fullName} ${companyName ? `(${companyName})` : ""}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Country:</strong> ${country}</p>
      <hr />
      <h3>Project Details</h3>
      ${productSku ? `<p><strong>Requested Product SKU:</strong> ${productSku}</p>` : ""}
      <p><strong>Categories of Interest:</strong> ${categories && categories.length > 0 ? categories.join(", ") : "None specified"}</p>
      <p><strong>Estimated Quantity:</strong> ${quantity || "Not specified"}</p>
      <p><strong>Target Delivery:</strong> ${deliveryDate || "Not specified"}</p>
      <hr />
      <h3>Project Description / Requirements</h3>
      <p style="white-space: pre-wrap;">${projectDescription}</p>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: `"Venpa Sports Site" <${process.env.SMTP_USER || "noreply@venpasports.com"}>`,
      to: "asadoffical7007@gmail.com",
      subject: `New Request from ${fullName} ${productSku ? `[Product: ${productSku}]` : ""}`,
      html: htmlContent,
      replyTo: email,
    });

    console.log("Email sent successfully. Message ID:", info.messageId);
    
    // If using the Ethereal test account, log the URL to view the fake email in browser!
    if (!process.env.SMTP_USER) {
      console.log("Preview your sent Quote email at URL: %s", nodemailer.getTestMessageUrl(info));
    }

    return NextResponse.json(
      { message: "Quote request sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending quote email:", error);
    return NextResponse.json(
      { message: "Failed to send quote request", error: error.message },
      { status: 500 }
    );
  }
}
