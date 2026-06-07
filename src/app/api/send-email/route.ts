import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { from_name, from_email, message } = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL || "dailymemes <no-reply@dailymemes.com>";
    const to = process.env.RESEND_TO_EMAIL || "sajidzoya72@gmail.com";
    const name = process.env.RESEND_NAME || "dailymemes";

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const html = `
      <h2>New message from ${from_name}</h2>
      <p><strong>From:</strong> ${from_name} &lt;${from_email}&gt;</p>
      <p><strong>Message:</strong></p>
      <p>${String(message).replace(/\n/g, "<br/>")}</p>
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
      return NextResponse.json({ error: "Failed to send email", details: json }, { status: res.status });
    }

    return NextResponse.json({ ok: true, details: json });
  } catch (err) {
    console.error("send-email error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
