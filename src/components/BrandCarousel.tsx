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
          once: true,
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
      className="mx-auto w-full max-w-[1500px] px-6 py-20 md:px-8 md:py-24"
    >
      <h2 className="mb-8 text-center font-display text-3xl font-bold text-textPrimary md:text-5xl">
        Trusted By
      </h2>

      <div
        data-brand-shell
        className="overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface to-[#0c0c17] py-10 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
      >
        <div className="group">
          <div className="flex min-w-max animate-ticker items-center group-hover:[animation-play-state:paused]">
            {repeatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex items-center justify-center px-10"
              >
                <div
                  style={{
                    width: "220px",
                    height: "90px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={220}
                    height={90}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                      transform:
                        brand.name === "Nickelodeon"
                          ? "scale(1.65)"
                          : brand.name === "Kling AI"
                          ? "scale(1.5)"
                          : brand.name === "Hailuo AI"
                          ? "scale(1.5)"
                          : brand.name === "Polymarket"
                          ? "scale(0.95)"
                          : brand.name === "Temu"
                          ? "scale(1.05)"
                          : "scale(1.2)",
                    }}
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

