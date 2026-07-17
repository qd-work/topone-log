"use client";

import {usePathname} from "next/navigation";
import {useEffect} from "react";

const REVEAL_SELECTOR = "[data-reveal], main > section:not([data-motion-static])";

export function SiteMotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    revealTargets.forEach((element) => {
      const siblings = element.parentElement
        ? Array.from(element.parentElement.children).filter((child) => child.matches("[data-reveal], [data-depth]"))
        : [];
      const index = Math.max(0, siblings.indexOf(element));
      element.style.setProperty("--reveal-delay", `${Math.min(index * 65, 325)}ms`);
    });

    if (reducedMotion.matches) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    revealTargets.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94) element.classList.add("is-visible");
    });
    document.documentElement.classList.add("motion-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {rootMargin: "0px 0px -8% 0px", threshold: 0.08}
    );

    revealTargets.forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });

    if (finePointer.matches) {
      let activeElement: HTMLElement | null = null;

      const resetDepth = (element: HTMLElement | null) => {
        if (!element) return;
        element.style.setProperty("--depth-ry", "0deg");
        element.style.setProperty("--depth-rx", "0deg");
        element.classList.remove("is-depth-active");
      };

      const handlePointerMove = (event: PointerEvent) => {
        const target = event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-depth]")
          : null;

        if (!target) {
          resetDepth(activeElement);
          activeElement = null;
          return;
        }

        if (activeElement !== target) resetDepth(activeElement);
        activeElement = target;

        const rect = target.getBoundingClientRect();
        const horizontal = (event.clientX - rect.left) / rect.width;
        const vertical = (event.clientY - rect.top) / rect.height;
        const strength = target.dataset.depthStrength === "soft" ? 2.2 : 4.2;

        target.style.setProperty("--depth-ry", `${(horizontal - 0.5) * strength}deg`);
        target.style.setProperty("--depth-rx", `${(0.5 - vertical) * strength}deg`);
        target.style.setProperty("--pointer-x", `${horizontal * 100}%`);
        target.style.setProperty("--pointer-y", `${vertical * 100}%`);
        target.classList.add("is-depth-active");
      };

      const handlePointerOut = (event: PointerEvent) => {
        if (!activeElement) return;
        const nextTarget = event.relatedTarget;
        if (nextTarget instanceof Node && activeElement.contains(nextTarget)) return;
        resetDepth(activeElement);
        activeElement = null;
      };

      document.addEventListener("pointermove", handlePointerMove, {passive: true});
      document.addEventListener("pointerout", handlePointerOut, {passive: true});

      return () => {
        observer.disconnect();
        resetDepth(activeElement);
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerout", handlePointerOut);
        document.documentElement.classList.remove("motion-enabled");
      };
    }

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-enabled");
    };
  }, [pathname]);

  return null;
}
