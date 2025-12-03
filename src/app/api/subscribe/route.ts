import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Get current timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "long",
    });

    // Get user's timezone if available from headers
    const userTimezone = request.headers.get("x-timezone") || "Unknown";

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to admin (you)
    const adminMailOptions = {
      from:
        process.env.EMAIL_FROM || `"Kyro Launch" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `🚀 New Kyro Launch Subscriber: ${email}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #121b2d 0%, #0a0a0a 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">
              🎉 New Launch Subscriber
            </h1>
            <p style="color: rgba(255,255,255,0.8); margin-top: 10px; font-size: 16px;">
              Someone just subscribed to Kyro launch notifications
            </p>
          </div>
          
          <div style="background: #f8f8f8; padding: 25px; border-radius: 10px; border: 1px solid #e5e5e5; margin-bottom: 20px;">
            <h2 style="color: #121b2d; margin-top: 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #121b2d; padding-bottom: 10px;">
              Subscriber Details
            </h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e5e5;">
                <p style="margin: 0 0 5px 0; color: #737373; font-size: 14px; font-weight: 500;">Email Address</p>
                <p style="margin: 0; color: #121b2d; font-size: 18px; font-weight: 600; word-break: break-all;">
                  ${email}
                </p>
              </div>
              
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e5e5;">
                <p style="margin: 0 0 5px 0; color: #737373; font-size: 14px; font-weight: 500;">Subscription Time</p>
                <p style="margin: 0; color: #121b2d; font-size: 16px; font-weight: 500;">
                  ${timestamp}
                </p>
              </div>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e5e5; margin-top: 15px;">
              <p style="margin: 0 0 5px 0; color: #737373; font-size: 14px; font-weight: 500;">User Timezone</p>
              <p style="margin: 0; color: #121b2d; font-size: 16px; font-weight: 500;">
                ${userTimezone}
              </p>
            </div>
          </div>
          
          <div style="background: #e8f4ff; padding: 20px; border-radius: 10px; border-left: 4px solid #121b2d;">
            <h3 style="color: #121b2d; margin-top: 0; font-size: 18px; font-weight: 600;">📈 Current Stats</h3>
            <p style="color: #121b2d; margin: 10px 0 0 0; font-size: 15px;">
              This subscriber will be notified when Kyro launches. Consider adding them to your email marketing list for future updates.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center;">
            <p style="color: #737373; font-size: 14px; margin: 0;">
              Sent from Kyro Launch Page • <a href="https://kyro.com" style="color: #121b2d; text-decoration: none; font-weight: 500;">View Dashboard</a>
            </p>
          </div>
        </div>
      `,
    };

    // Optional: Send confirmation email to subscriber
    const userMailOptions = {
      from:
        process.env.EMAIL_FROM || `"Kyro Launch" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🚀 You're on the list! Kyro Launch Updates",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #121b2d 0%, #0a0a0a 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0 0 15px 0; font-size: 32px; font-weight: 600;">
              You're In! 🎯
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 18px; line-height: 1.5;">
              Thanks for joining the Kyro launch list. We'll notify you as soon as we go live.
            </p>
          </div>
          
          <div style="background: #f8f8f8; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #121b2d; margin-top: 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #121b2d; padding-bottom: 10px;">
              What to Expect
            </h2>
            
            <div style="display: grid; gap: 15px; margin-top: 20px;">
              <div style="display: flex; align-items: flex-start; gap: 15px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e5e5e5;">
                <div style="background: #121b2d; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 600;">
                  1
                </div>
                <div>
                  <h3 style="margin: 0 0 5px 0; color: #121b2d; font-size: 16px; font-weight: 600;">Launch Notification</h3>
                  <p style="margin: 0; color: #737373; font-size: 15px; line-height: 1.5;">
                    We'll send you one email when Kyro is officially launched and ready to use.
                  </p>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start; gap: 15px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e5e5e5;">
                <div style="background: #121b2d; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 600;">
                  2
                </div>
                <div>
                  <h3 style="margin: 0 0 5px 0; color: #121b2d; font-size: 16px; font-weight: 600;">Exclusive Access</h3>
                  <p style="margin: 0; color: #737373; font-size: 15px; line-height: 1.5;">
                    Early subscribers may get special access or perks when we launch.
                  </p>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start; gap: 15px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e5e5e5;">
                <div style="background: #121b2d; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 600;">
                  3
                </div>
                <div>
                  <h3 style="margin: 0 0 5px 0; color: #121b2d; font-size: 16px; font-weight: 600;">No Spam Promise</h3>
                  <p style="margin: 0; color: #737373; font-size: 15px; line-height: 1.5;">
                    We respect your inbox. You'll only hear from us about the launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; padding: 25px; background: #e8f4ff; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #121b2d; margin-top: 0; font-size: 18px; font-weight: 600;">Have questions?</h3>
            <p style="color: #121b2d; margin: 10px 0 20px 0; font-size: 15px;">
              Reply to this email anytime. We're happy to help!
            </p>
            <a href="mailto:${process.env.EMAIL_USER}" style="display: inline-block; background: #121b2d; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
              Contact Us
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center;">
            <p style="color: #737373; font-size: 14px; margin: 0 0 10px 0;">
              You're receiving this email because you subscribed to Kyro launch notifications.
            </p>
            <p style="color: #737373; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Kyro. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    console.log(`Admin notification sent for email: ${email}`);

    // Try to send user confirmation (but don't fail if it doesn't work)
    try {
      await transporter.sendMail(userMailOptions);
      console.log(`User confirmation sent to: ${email}`);
    } catch (userError) {
      console.warn(`Failed to send user confirmation to ${email}:`, userError);
      // Continue anyway since admin email was sent successfully
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Successfully subscribed! You will receive a confirmation email.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscription error:", error);

    // Return more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json(
          {
            error: "Email service configuration error. Please contact support.",
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    );
  }
}

// Also handle GET for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Subscribe API is working. Use POST to subscribe.",
    method: "POST",
    body: {
      email: "user@example.com",
    },
  });
}
