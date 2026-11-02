"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cancel01Icon } from "hugeicons-react";
import { useReservation } from "./ReservationProvider";
import ReservationForm from "./ReservationForm";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Stays mounted and slides back out, rather than unmounting on close: the point
 * of a slide-over is that a guest can step away from it and come back to the
 * same half-written request. While it is shut it is translated off-screen and
 * `inert`, which takes it out of the tab order, the accessibility tree and hit
 * testing at once.
 */
export default function ReservationPanel() {
  const { open, hide } = useReservation();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    // The dialog itself, not the close button: `aria-labelledby` is read from here.
    panelRef.current?.focus();

    const root = document.documentElement;
    const shell = shellRef.current;
    const previousOverflow = root.style.overflow;
    const previousRight = shell?.style.right ?? "";
    // Read before the lock, while the gutter is still there to measure. The
    // overlay is sized to the fixed containing block, which stops short of the
    // window by exactly that much, so without the offset a strip of bare page
    // glows beside the panel. The engines disagree on the number (12px here,
    // 15px in Chromium) and on whether `100vw` includes it, hence measuring.
    const gutter = window.innerWidth - root.clientWidth;
    // The panel scrolls on its own; the page behind it must not move under a
    // finger or a wheel that started outside it.
    root.style.overflow = "hidden";
    if (shell && gutter > 0) shell.style.right = `${-gutter}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hide();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || active === panel || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      root.style.overflow = previousOverflow;
      if (shell) shell.style.right = previousRight;
      previous?.focus();
    };
  }, [open, hide]);

  const enter = (duration: number) => ({ duration: reduce ? 0 : duration, ease: EASE });

  return (
    // `inert` while shut: off-screen, out of the tab order, out of hit testing.
    // The effect widens it past the scrollbar gutter while it is up.
    <div ref={shellRef} className="fixed inset-0 z-[60]" inert={!open}>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={enter(0.3)}
        onClick={hide}
        className="absolute inset-0 bg-evening/60 backdrop-blur-[2px]"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-title"
        tabIndex={-1}
        initial={false}
        animate={{ x: open ? "0%" : "100%" }}
        transition={enter(0.44)}
        className="absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col border-l border-line bg-ivory text-walnut shadow-[-30px_0_60px_-30px_rgba(42,27,18,0.6)] focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
          <div>
            <p className="text-eyebrow font-semibold uppercase text-ember-ink">Reservations</p>
            <h2 id="reserve-title" className="mt-1.5 font-display text-2xl leading-none text-walnut">
              Pick a table.
            </h2>
          </div>
          <button
            type="button"
            onClick={hide}
            className="-mr-1.5 -mt-1 grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-walnut/10 motion-reduce:transition-none"
          >
            <span className="sr-only">Close reservations</span>
            <Cancel01Icon size={20} strokeWidth={1.7} aria-hidden />
          </button>
        </div>

        <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <ReservationForm scrollToTop={scrollToTop} />
        </div>
      </motion.div>
    </div>
  );
}
