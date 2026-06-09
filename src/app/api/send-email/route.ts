import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { from_name, from_email, message } = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL || "";
    const to = process.env.RESEND_TO_EMAIL || "";

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <tr>
            <td style="background:#111827;padding:30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;">
                DailyMemes111
              </h1>
              <p style="margin:8px 0 0;color:#d1d5db;font-size:14px;">
                New Contact Form Submission
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;color:#374151;font-size:16px;">
                A new message has been received through the website contact form.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#111827;">Name</strong><br>
                    <span style="color:#4b5563;">${from_name}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
                    <strong style="color:#111827;">Email</strong><br>
                    <a href="mailto:${from_email}" style="color:#2563eb;text-decoration:none;">
                      ${from_email}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 0 0;">
                    <strong style="color:#111827;">Message</strong>
                    <div
                      style="
                        margin-top:10px;
                        padding:16px;
                        background:#f9fafb;
                        border:1px solid #e5e7eb;
                        border-radius:8px;
                        color:#374151;
                        line-height:1.7;
                      "
                    >
                      ${String(message).replace(/\n/g, "<br/>")}
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>



        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const payload = {
      from,
      to: [to],
      subject: `New contact: ${from_name}`,
      html,
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      json = text;
    }

    console.log("Resend API status", res.status, "response:", json);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to send email", details: json },
        { status: res.status },
      );
    }

    return NextResponse.json({ ok: true, details: json });
  } catch (err) {
    console.error("send-email error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
