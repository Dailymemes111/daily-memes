"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteData } from "@/data/content";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Stats", href: "#stats" },
  { label: "Collabs", href: "#collabs" },
  { label: "Videos", href: "#videos" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full border-b border-transparent transition-colors duration-300",
        scrolled && "border-border bg-surface/80 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex h-28 w-full max-w-[1500px] items-center justify-between px-5 md:px-8">
        <a href="#" className="flex items-center">
          <Image
            src="/logos/logo.png"
            alt={`${siteData.name} logo`}
            width={72}
            height={72}
            className="h-14 w-14 rounded-2xl object-contain md:h-36 md:w-36"
            priority
          />
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-textMuted transition-colors hover:text-textPrimary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
