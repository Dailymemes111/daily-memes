import { siteData } from "@/data/content";
import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const BrandIcon = {
  instagram: (props: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      viewBox="0 0 640 640"
      aria-hidden
    >
      <defs>
        <linearGradient id="instagram-gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFD676" />
          <stop offset="35%" stopColor="#F56040" />
          <stop offset="70%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#5B51D8" />
        </linearGradient>
      </defs>
      <path
        fill="url(#instagram-gradient)"
        d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"
      />
    </svg>
  ),
  youtube: (props: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden>
      <rect width="24" height="24" rx="4" fill="#FF0000" />
      <path d="M10 8l6 4-6 4V8z" fill="#fff" />
    </svg>
  ),
  x: (props: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" />
    </svg>
  ),
  tiktok: (props: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
    </svg>
  ),
};

const WhatsAppIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={props.className} aria-hidden>
    <path
      fill="#25D366"
      d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4.4 14.2l-1.2.6a4.9 4.9 0 01-2.3.6 4.8 4.8 0 01-4.5-2.9 4.6 4.6 0 01.3-3l.5-1 .8.4-.5 1a3 3 0 00-.2 1.3 3.1 3.1 0 003 3.2c.9 0 1.7-.2 2.4-.6l1.2-.6a.7.7 0 01.9.3.7.7 0 01-.3.9z"
    />
  </svg>
);

export default function Footer() {
  const email = siteData.contact?.email || siteData.contactEmail;
  const whatsappHref =
    siteData.social?.whatsapp ||
    `https://wa.me/${siteData.contact?.whatsappNumber || "37067863770"}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteData.business?.address || "Vilnius, Lithuania",
  )}`;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#080810_0%,#0b0d18_50%,#07070d_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(108,99,255,0.10),_transparent_30%),radial-gradient(circle_at_right,_rgba(112,214,255,0.08),_transparent_20%)]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 py-10 md:px-8 lg:py-12">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
          <div className=" grid gap-8 lg:grid-cols-[1.05fr_1fr_0.95fr]">
            <div className="">
              <Image
                src="/logos/logo.png"
                alt={`${siteData.name} logo`}
                width={456}
                height={547}
                sizes="(max-width: 768px) 96px, 128px"
                quality={100}
                className="h-24 w-auto rounded-2xl object-contain md:h-32"
              />

              <p className="max-w-sm text-sm text-textMuted md:text-[15px]">
                {siteData.tagline}
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-textPrimary">
                Follow
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <a
                  href={siteData.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-textPrimary transition hover:-translate-y-0.5 hover:border-[#E1306C]/60 hover:bg-[#E1306C]/10"
                >
                  <span className="h-5 w-5">
                    <BrandIcon.instagram className="h-5 w-5" />
                  </span>
                  <span className="text-[#F04F8E]">Instagram</span>
                </a>

                <a
                  href={siteData.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-textPrimary transition hover:-translate-y-0.5 hover:border-[#FF0000]/60 hover:bg-[#FF0000]/10"
                >
                  <span className="h-5 w-5">
                    <BrandIcon.youtube className="h-5 w-5" />
                  </span>
                  <span className="text-[#FF4D4D]">YouTube</span>
                </a>

                <a
                  href={siteData.social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-textPrimary transition hover:-translate-y-0.5 hover:border-[#1DA1F2]/60 hover:bg-[#1DA1F2]/10"
                >
                  <span className="h-5 w-5">
                    <BrandIcon.x className="h-5 w-5" />
                  </span>
                  <span className="text-[#5EC5FF]">X</span>
                </a>

                <a
                  href={siteData.social.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-textPrimary transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/8"
                >
                  <span className="h-5 w-5">
                    <BrandIcon.tiktok className="h-5 w-5" />
                  </span>
                  <span className="text-white">TikTok</span>
                </a>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-textPrimary">
                Contact Us
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-textMuted transition hover:border-accent/40 hover:bg-accent/8 hover:text-textPrimary"
                >
                  <EnvelopeIcon className="h-5 w-5 text-accent" />
                  <span>{email}</span>
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-textMuted transition hover:border-[#25D366]/50 hover:bg-[#25D366]/10 hover:text-textPrimary"
                >
                  <span className="h-5 w-5">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span>
                    {siteData.contact?.whatsappNumber || "+37067863770"}
                  </span>
                </a>

                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-textMuted transition hover:border-accent/40 hover:bg-accent/8 hover:text-textPrimary"
                >
                  <MapPinIcon className="h-5 w-5 text-accent" />
                  <span>
                    {siteData.business?.address || "Vilnius, Lithuania"}
                  </span>
                </a>

                <p className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-textMuted">
                  <ClockIcon className="h-5 w-5 text-accent" />
                  <span>{siteData.business?.hours}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="pb-8 text-center text-xs text-textMuted">
        &copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.
      </p>
    </footer>
  );
}
