"use client";

import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { siteData } from "@/data/content";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titleTextRef = useRef<HTMLSpanElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const parallaxNearRef = useRef<HTMLDivElement | null>(null);
  const parallaxFarRef = useRef<HTMLDivElement | null>(null);

  const handleContactCta = () => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) {
      return;
    }

    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      const firstField = contactSection.querySelector<HTMLElement>(
        "input, textarea, button",
      );
      firstField?.focus();
    }, 450);
  };

  const handleJoinCta = () => {
    const tiktokUrl = siteData?.social?.tiktok;
    if (!tiktokUrl) return;

    window.open(tiktokUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const titleText = titleTextRef.current;
    const subtitle = subtitleRef.current;
    const parallaxNear = parallaxNearRef.current;
    const parallaxFar = parallaxFarRef.current;
    if (
      !section ||
      !canvas ||
      !content ||
      !title ||
      !titleText ||
      !subtitle ||
      !parallaxNear ||
      !parallaxFar
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero='label']", { opacity: 0, y: 40, duration: 0.7 })
        .from(
          "[data-hero='title']",
          { opacity: 0, y: 40, duration: 0.7 },
          "-=0.5",
        )
        .from(
          "[data-hero='subtitle']",
          { opacity: 0, y: 40, duration: 0.65 },
          "-=0.45",
        );

      const particles: Particle[] = [];
      const particleCount = 72;

      const resizeCanvas = () => {
        const rect = section.getBoundingClientRect();
        canvas.width = Math.floor(rect.width * window.devicePixelRatio);
        canvas.height = Math.floor(rect.height * window.devicePixelRatio);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      };

      resizeCanvas();

      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.34,
          vy: (Math.random() - 0.5) * 0.34,
          radius: (Math.random() * 1.8 + 1.8) * window.devicePixelRatio,
          alpha: 0.12 + Math.random() * 0.16,
        });
      }

      let frameId = 0;

      const render = () => {
        const context = canvas.getContext("2d");
        if (!context) {
          return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (
            particle.x - particle.radius <= 0 ||
            particle.x + particle.radius >= canvas.width
          ) {
            particle.vx *= -1;
          }

          if (
            particle.y - particle.radius <= 0 ||
            particle.y + particle.radius >= canvas.height
          ) {
            particle.vy *= -1;
          }

          context.beginPath();
          context.fillStyle = `rgba(108, 99, 255, ${particle.alpha})`;
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fill();
        });

        frameId = window.requestAnimationFrame(render);
      };

      frameId = window.requestAnimationFrame(render);

      let hoverFloatTween: gsap.core.Tween | null = null;

      const onResize = () => {
        resizeCanvas();
      };

      const onMouseMove = (event: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const normalizedX = event.clientX / innerWidth - 0.5;
        const normalizedY = event.clientY / innerHeight - 0.5;
        const titleShiftX = innerWidth < 640 ? 6 : innerWidth < 1024 ? 12 : 20;
        const titleShiftY = innerWidth < 640 ? 4 : innerWidth < 1024 ? 8 : 12;
        const titleRotateX = innerWidth < 640 ? 2 : innerWidth < 1024 ? 4 : 6;
        const titleRotateY = innerWidth < 640 ? 3 : innerWidth < 1024 ? 5 : 7;

        const zoomLevel = Math.min(
          innerWidth < 640 ? 0.018 : innerWidth < 1024 ? 0.035 : 0.065,
          Math.abs(normalizedX) * 0.06 + Math.abs(normalizedY) * 0.06,
        );

        gsap.to(parallaxNear, {
          x: normalizedX * -20,
          y: normalizedY * -20,
          duration: 0.65,
          ease: "power2.out",
        });

        gsap.to(parallaxFar, {
          x: normalizedX * 14,
          y: normalizedY * 14,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(title, {
          x: normalizedX * titleShiftX,
          y: normalizedY * titleShiftY,
          scale: 1 + zoomLevel,
          rotateX: normalizedY * -titleRotateX,
          rotateY: normalizedX * titleRotateY,
          transformPerspective: 900,
          duration: 0.55,
          ease: "power3.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(title, {
          x: 0,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      };

      const onTitleEnter = () => {
        hoverFloatTween?.kill();
        hoverFloatTween = gsap.to([titleText, subtitle], {
          y: "-=8",
          duration: 1.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.12,
        });

        gsap.to(titleText, {
          scale: 1.03,
          letterSpacing: "0.02em",
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const onTitleMove = (event: MouseEvent) => {
        const rect = title.getBoundingClientRect();
        const localX = (event.clientX - rect.left) / rect.width - 0.5;
        const localY = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(titleText, {
          x: localX * 12,
          y: localY * 8,
          rotateZ: localX * 1.5,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(subtitle, {
          x: localX * 8,
          y: localY * 6,
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const onTitleLeave = () => {
        hoverFloatTween?.kill();
        hoverFloatTween = null;

        gsap.to(titleText, {
          x: 0,
          y: 0,
          scale: 1,
          rotateZ: 0,
          letterSpacing: "0em",
          duration: 0.5,
          ease: "power3.out",
        });

        gsap.to(subtitle, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      window.addEventListener("resize", onResize);
      window.addEventListener("mousemove", onMouseMove);
      section.addEventListener("mouseleave", onMouseLeave);
      title.addEventListener("mouseenter", onTitleEnter);
      title.addEventListener("mousemove", onTitleMove);
      title.addEventListener("mouseleave", onTitleLeave);

      return () => {
        window.cancelAnimationFrame(frameId);
        hoverFloatTween?.kill();
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        section.removeEventListener("mouseleave", onMouseLeave);
        title.removeEventListener("mouseenter", onTitleEnter);
        title.removeEventListener("mousemove", onTitleMove);
        title.removeEventListener("mouseleave", onTitleLeave);
      };
    }, content);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88svh] items-center justify-center overflow-hidden px-4 py-16 sm:min-h-[92svh] sm:px-6 sm:py-20 md:min-h-[100svh] md:px-8 md:py-24"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      <div
        ref={parallaxFarRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 10%, rgba(0,207,255,0.12) 0%, rgba(8,8,16,0) 45%), radial-gradient(90% 70% at 80% 30%, rgba(108,99,255,0.16) 0%, rgba(8,8,16,0) 55%)",
        }}
      />

      <div
        ref={parallaxNearRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #1a0e3a 0%, #080810 70%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,8,16,0)_45%,rgba(8,8,16,0.72)_100%)]" />

      {/* TODO: If needed later, this cinematic layer can be replaced with a branded slow-motion background plate. */}
      <div
        ref={contentRef}
        className="relative z-30 mx-auto flex w-full max-w-[1500px] flex-col items-center text-center"
      >
        <h1
          ref={titleRef}
          data-hero="title"
          className="max-w-full px-2 font-display text-[clamp(1.5rem,7vw,4rem)] font-extrabold leading-[0.98] tracking-tight sm:px-0 md:text-[clamp(3rem,7vw,6.4rem)] lg:text-[clamp(4rem,7vw,7rem)]"
        >
          <span
            ref={titleTextRef}
            className="inline-block max-w-full bg-gradient-to-r from-textPrimary via-white to-accent bg-clip-text text-transparent"
          >
            {siteData.name}
          </span>
        </h1>
        <p
          ref={subtitleRef}
          data-hero="subtitle"
          className="mt-4 max-w-[94%] text-xs leading-relaxed text-textMuted sm:mt-5 sm:max-w-2xl sm:text-sm md:mt-6 md:text-lg lg:text-xl"
        >
          {siteData.tagline}
          <span className="block text-accentBlue sm:ml-2 sm:inline">
            {siteData.taglineSub}
          </span>
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3  sm:mt-8">
          <button
            type="button"
            data-hero="cta"
            onClick={handleContactCta}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent via-accent to-accentBlue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(108,99,255,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(108,99,255,0.75)] sm:px-6 sm:py-3"
          >
            Contact Us
            <ArrowRightIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            data-hero="cta"
            onClick={handleJoinCta}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#151522]/98 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-accent/50 hover:bg-[#1b1b2d]/98 sm:px-6 sm:py-3"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current text-[#69C9D0]"
              aria-hidden
            >
              <path d="M14.5 3.3c1.3 1.7 2.1 3.7 2.1 6.1 0 5.2-4.1 9.4-9.3 9.4-1.4 0-2.8-.3-4-.9.4.1.8.1 1.2.1 2.7 0 5.2-1.7 6.2-4.1-2.4-.1-4.5-1.7-5.2-4.1.4.1.8.1 1.2.1.6 0 1.1-.1 1.7-.3-2.3-.5-4-2.5-4-4.9 0-1 .3-2 .8-2.9 2.4 3 6.1 4.9 10.2 5.1-.1-.4-.2-.8-.2-1.2 0-2.7 2.2-4.9 4.9-4.9 1.4 0 2.7.6 3.6 1.5-.6-.2-1.2-.4-1.8-.6.7.8 1.1 1.8 1.1 2.9 0 .9-.3 1.8-.8 2.5.7-.1 1.4-.3 2-.5-.5.8-1.1 1.5-1.8 2.1z" />
            </svg>
            Join Us
          </button>
        </div>
      </div>
    </section>
  );
}
