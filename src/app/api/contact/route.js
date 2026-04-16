import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      fullName,
      companyName,
      email,
      phone,
      inquiryType,
      message,
    } = data;

    // Validate essential fields
    if (!fullName || !email || !inquiryType || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to MongoDB
    try {
      await connectDB();
      await Inquiry.create({
        fullName,
        companyName,
        email,
        phone,
        inquiryType,
        message,
      });
    } catch (dbErr) {
      console.error("Database Save Error:", dbErr);
    }

    // 2. Configure Nodemailer transporter
    let transporter;
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.hostinger.com",
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Format the email content
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Inquiry — Hempel Sports</h2>
        <p><strong>From:</strong> ${fullName} ${companyName ? `(${companyName})` : ""}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Inquiry Type:</strong> <span style="text-transform: uppercase;">${inquiryType}</span></p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <h3 style="color: #333;">Message Details</h3>
        <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
        <p style="font-size: 10px; color: #999; margin-top: 30px;">Hempel Sports Customer Relations</p>
      </div>
    `;

    // Send the email to the admin
    await transporter.sendMail({
      from: `"Hempel Sports" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `[INQUIRY] ${fullName} - ${inquiryType}`,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Inquiry sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { message: "Failed to send inquiry", error: error.message },
      { status: 500 }
    );
  }
}
