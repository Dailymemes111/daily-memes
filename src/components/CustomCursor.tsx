"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) {
      return;
    }

    const moveCursor = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      gsap.to(dot, {
        x,
        y,
        duration: 0.15,
        ease: "power2.out",
      });

      gsap.to(ring, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const interactiveElements = Array.from(
      document.querySelectorAll("a, button, [data-cursor='hover']"),
    );

    const onEnter = () => {
      gsap.to(ring, {
        scale: 2,
        opacity: 0.45,
        duration: 0.2,
      });
    };

    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 0.8,
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent opacity-80 md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10001] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
      />
    </>
  );
}
