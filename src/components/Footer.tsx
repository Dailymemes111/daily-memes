import { siteData } from "@/data/content";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

const BrandIcon = {
  instagram: (props: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden>
      <rect width="24" height="24" rx="6" fill="#E1306C" />
      <path d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" fill="#fff" opacity="0.08" />
    </svg>
  ),
  youtube: (props: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden>
      <rect width="24" height="24" rx="4" fill="#FF0000" />
      <path d="M10 8l6 4-6 4V8z" fill="#fff" />
    </svg>
  ),
  x: (props: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden>
      <rect width="24" height="24" rx="4" fill="#1DA1F2" />
      <path d="M7 7l10 10M17 7L7 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  tiktok: (props: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#000" />
      <path d="M14 8v6a3 3 0 11-3-3V8" fill="#69C9D0" opacity="0.95" />
    </svg>
  ),
};

const WhatsAppIcon = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={props.className} aria-hidden>
    <path fill="#25D366" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4.4 14.2l-1.2.6a4.9 4.9 0 01-2.3.6 4.8 4.8 0 01-4.5-2.9 4.6 4.6 0 01.3-3l.5-1 .8.4-.5 1a3 3 0 00-.2 1.3 3.1 3.1 0 003 3.2c.9 0 1.7-.2 2.4-.6l1.2-.6a.7.7 0 01.9.3.7.7 0 01-.3.9z" />
  </svg>
);

export default function Footer() {
  const email = siteData.contact?.email || siteData.contactEmail;
  const whatsappHref = siteData.social?.whatsapp || `https://wa.me/${siteData.contact?.whatsappNumber || "37067863770"}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteData.business?.address || "Vilnius, Lithuania",
  )}`;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
          <div>
            <p className="font-display text-xl font-bold text-textPrimary">{siteData.name}</p>
            <p className="mt-1 text-sm text-textMuted max-w-xs">{siteData.tagline}</p>
          </div>

          <div>
            <p className="font-medium text-textPrimary mb-3">Follow</p>
            <div className="flex flex-wrap gap-3">
              <a href={siteData.social.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-background/50 hover:bg-background/60 transition">
                <span className="h-5 w-5"><BrandIcon.instagram className="h-5 w-5" /></span>
                <span className="text-[#E1306C]">Instagram</span>
              </a>

              <a href={siteData.social.youtube} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-background/50 hover:bg-background/60 transition">
                <span className="h-5 w-5"><BrandIcon.youtube className="h-5 w-5" /></span>
                <span className="text-[#FF0000]">YouTube</span>
              </a>

              <a href={siteData.social.x} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-background/50 hover:bg-background/60 transition">
                <span className="h-5 w-5"><BrandIcon.x className="h-5 w-5" /></span>
                <span className="text-[#1DA1F2]">X</span>
              </a>

              <a href={siteData.social.tiktok} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-background/50 hover:bg-background/60 transition">
                <span className="h-5 w-5"><BrandIcon.tiktok className="h-5 w-5" /></span>
                <span className="text-black">TikTok</span>
              </a>
            </div>
          </div>

          <div>
            <p className="font-medium text-textPrimary mb-3">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${email}`} className="inline-flex items-center gap-3 text-sm text-textMuted hover:text-textPrimary">
                <EnvelopeIcon className="h-5 w-5 text-accent" />
                <span>{email}</span>
              </a>

              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm text-textMuted hover:text-textPrimary">
                <span className="h-5 w-5"><WhatsAppIcon className="h-5 w-5" /></span>
                <span>{siteData.contact?.whatsappNumber || "+37067863770"}</span>
              </a>

              <a href={mapsHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm text-textMuted hover:text-textPrimary">
                <MapPinIcon className="h-5 w-5 text-accent" />
                <span>{siteData.business?.address || "Vilnius, Lithuania"}</span>
              </a>

              <p className="mt-2 text-sm text-textMuted"><span className="font-medium text-textPrimary">Hours:</span> {siteData.business?.hours}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-textMuted">&copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
    </footer>
  );
}
