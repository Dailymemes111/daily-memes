"use client";

import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteData } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const repeatedBrands = [...siteData.brands, ...siteData.brands];

export default function BrandCarousel() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-brand-shell]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#collabs",
          start: "top 80%",
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="collabs"
      className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-8 md:py-24"
    >
      <h2 className="mb-8 text-center font-display text-3xl font-bold text-textPrimary md:text-5xl">
        Trusted By
      </h2>

      <div
        data-brand-shell
        className="overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-[#0c0c17] py-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
      >
        <div className="group">
          <div className="flex min-w-max animate-ticker items-center group-hover:[animation-play-state:paused]">
            {repeatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex items-center px-3"
              >
                <div className="rounded-xl border border-border/80 bg-[#0c1022] p-2.5 transition-transform duration-300 hover:scale-105 hover:border-accent/50">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={140}
                    height={46}
                    className="h-11 w-[140px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
