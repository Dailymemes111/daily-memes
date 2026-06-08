"use client";

import { FormEvent, useRef, useState } from "react";
import { siteData } from "@/data/content";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    setSubmitState("loading");
    setMessage("");

    const formData = new FormData(formRef.current);
    const body = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("/api/send-email response:", res.status, data);

      if (res.ok) {
        formRef.current.reset();
        setSubmitState("success");
        setMessage("Thanks for reaching out. Your message has been sent.");
      } else {
        setSubmitState("error");
        setMessage(
          "Something went wrong while sending your message. Please try again.",
        );
      }
    } catch (err) {
      console.error("send-email error:", err);
      setSubmitState("error");
      setMessage(
        "Something went wrong while sending your message. Please try again.",
      );
    }
  };

  const isLoading = submitState === "loading";

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1500px] px-6 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto w-full max-w-[560px] rounded-3xl border border-border bg-surface/75 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] animate-float-slow md:p-8">
        <h2 className="text-center font-display text-3xl font-bold text-textPrimary md:text-5xl">
          Let&apos;s Work Together
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-textMuted">
          Looking for high-performing social campaigns and branded TikTok
          content? Send a message and let&apos;s build something memorable.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            name="from_name"
            required
            placeholder="Name"
            className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-textPrimary outline-none transition-colors placeholder:text-textMuted focus:border-accent"
          />
          <input
            type="email"
            name="from_email"
            required
            placeholder="Email"
            className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-textPrimary outline-none transition-colors placeholder:text-textMuted focus:border-accent"
          />
          <textarea
            name="message"
            required
            placeholder="Message"
            rows={5}
            className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-textPrimary outline-none transition-colors placeholder:text-textMuted focus:border-accent"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>

        {message ? (
          <p
            className={`mt-4 text-sm ${
              submitState === "success" ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {message}
          </p>
        ) : null}

        <p className="mt-7 text-sm text-textMuted">
          Prefer email? Reach out directly at{" "}
          <span>
            <a
              href={`mailto:${siteData.contactEmail}`}
              className=" text-primary underline transition hover:text-accent"
            >
              {siteData.contactEmail}
            </a>
          </span>
        </p>
      </div>
    </section>
  );
}
