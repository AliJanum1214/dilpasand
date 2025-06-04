import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, numberOfPersons, time, date, ownerEmail } =
      await req.json();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to owner
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: "New Reservation",
      text: `New reservation from ${name} (${email}) for ${numberOfPersons} person(s) on ${date} at ${time}.`,
    };

    // Email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reservation Confirmation",
      text: `Dear ${name},\n\nYour reservation for ${numberOfPersons} person(s) on ${date} at ${time} has been confirmed.\n\nThank you!`,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
