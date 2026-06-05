import { siteData } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-xl font-bold text-textPrimary">
            {siteData.name}
          </p>
          <p className="mt-1 text-sm text-textMuted">{siteData.tagline}</p>
        </div>

        <a
          href={siteData.social.tiktok}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-textMuted transition-colors hover:text-textPrimary"
        >
          <span aria-hidden="true">♪</span>
          <span>@dailymemes111</span>
        </a>

        {/* TODO: Add Instagram and YouTube links when social handles are ready. */}
      </div>
      <p className="pb-8 text-center text-xs text-textMuted">
        &copy; {new Date().getFullYear()} Dailymemes111. All rights reserved.
      </p>
    </footer>
  );
}
