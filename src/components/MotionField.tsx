"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MotionField() {
  const violetRef = useRef<HTMLDivElement | null>(null);
  const blueRef = useRef<HTMLDivElement | null>(null);
  const cyanRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const violet = violetRef.current;
    const blue = blueRef.current;
    const cyan = cyanRef.current;
    const trail = trailRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!violet || !blue || !cyan || trail.length === 0) {
      return;
    }

    const moveVioletX = gsap.quickTo(violet, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const moveVioletY = gsap.quickTo(violet, "y", {
      duration: 0.5,
      ease: "power3.out",
    });
    const moveBlueX = gsap.quickTo(blue, "x", {
      duration: 0.9,
      ease: "power3.out",
    });
    const moveBlueY = gsap.quickTo(blue, "y", {
      duration: 0.9,
      ease: "power3.out",
    });
    const moveCyanX = gsap.quickTo(cyan, "x", {
      duration: 1.2,
      ease: "power3.out",
    });
    const moveCyanY = gsap.quickTo(cyan, "y", {
      duration: 1.2,
      ease: "power3.out",
    });

    const onMouseMove = (event: MouseEvent) => {
      moveVioletX(event.clientX);
      moveVioletY(event.clientY);
      moveBlueX(event.clientX * 0.86 + 80);
      moveBlueY(event.clientY * 0.86 + 45);
      moveCyanX(event.clientX * 1.08 - 55);
      moveCyanY(event.clientY * 1.08 - 40);

      trail.forEach((dot, index) => {
        const strength = 1 - index / trail.length;
        gsap.to(dot, {
          x: event.clientX,
          y: event.clientY,
          scale: 0.35 + strength * 0.95,
          opacity: 0.05 + strength * 0.32,
          duration: 0.22 + index * 0.08,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    const interactive = Array.from(
      document.querySelectorAll<HTMLElement>("a, button"),
    );

    const onEnter = (element: HTMLElement) => {
      gsap.to(element, { y: -2, duration: 0.25, ease: "power2.out" });
      gsap.to(violet, {
        scale: 1.15,
        opacity: 0.28,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(blue, {
        scale: 1.12,
        opacity: 0.22,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onLeave = (element: HTMLElement) => {
      gsap.to(element, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
      gsap.to(violet, {
        scale: 1,
        opacity: 0.2,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(blue, {
        scale: 1,
        opacity: 0.16,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onElementMove = (event: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: offsetX * 0.08,
        y: offsetY * 0.08,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const listeners = interactive.map((element) => {
      const handleEnter = () => onEnter(element);
      const handleLeave = () => onLeave(element);
      const handleMove = (event: MouseEvent) => onElementMove(event, element);

      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
      element.addEventListener("mousemove", handleMove);

      return { element, handleEnter, handleLeave, handleMove };
    });

    window.addEventListener("mousemove", onMouseMove);

    const pulse = gsap.to([violet, blue, cyan], {
      scale: 1.08,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      pulse.kill();
      listeners.forEach(({ element, handleEnter, handleLeave, handleMove }) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
        element.removeEventListener("mousemove", handleMove);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={violetRef}
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 opacity-20 blur-3xl mix-blend-screen md:block"
      />
      <div
        ref={blueRef}
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accentBlue/25 opacity-16 blur-3xl mix-blend-screen md:block"
      />
      <div
        ref={cyanRef}
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 opacity-14 blur-3xl mix-blend-screen md:block"
      />
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[1px] md:block"
          style={{ opacity: 0 }}
        />
      ))}
    </>
  );
}
