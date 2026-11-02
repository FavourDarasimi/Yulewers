"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Cancel01Icon, Menu01Icon } from "hugeicons-react";
import { venue } from "@/lib/venue";
import { useReservation } from "./ReservationProvider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const phoneHref = `tel:${venue.phone.e164}`;

const drawerRows = [
  { href: "#menu", label: "Menu" },
  { href: "#tonight", label: "Tonight" },
  { href: "#about", label: "About" },
  { href: phoneHref, label: venue.phone.display },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { show } = useReservation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    // A panel pinned over the page while the reader scrolls looks detached from both
    // the header and the content, so any scroll dismisses it.
    setOpen(false);
  });

  useEffect(() => {
    if (!open) return;

    const close = () => {
      setOpen(false);
      toggleRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    // The drawer is `sm:hidden`, so growing past the breakpoint would hide it
    // while leaving the bar stuck in its solid open-state treatment.
    const wide = window.matchMedia("(min-width: 640px)");
    const onWideChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWideChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWideChange);
    };
  }, [open]);

  const raised = scrolled || open;

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors motion-reduce:transition-none ${
        raised
          ? "border-line bg-ivory/95 text-walnut backdrop-blur-sm [--focus-ring:var(--focus-ring)]"
          : "border-transparent text-ivory [--focus-ring:var(--focus-ring-inverse)]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 lg:px-8">
        <a href="#top" className="font-display text-xl tracking-tight md:text-2xl">
          {venue.name}
          <span className="text-gold">.</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-5 md:gap-8">
          <nav aria-label="Primary" className="flex items-center gap-5 md:gap-8">
            <a
              href="#menu"
              className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block"
            >
              Menu
            </a>
            <a
              href="#tonight"
              className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block"
            >
              Tonight
            </a>
            <a
              href="#about"
              className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block"
            >
              About
            </a>
            <a
              href={phoneHref}
              className="hidden text-sm font-medium underline-offset-4 hover:underline lg:block"
            >
              {venue.phone.display}
            </a>
            {/* Not <ReserveButton>: the drawer has to go down with the panel
                coming up, or the bar underneath keeps its solid open-state. */}
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                setOpen(false);
                show();
              }}
              className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ember-deep motion-reduce:transition-none"
            >
              Reserve
            </button>

            {/* Lives in the same nav as the inline links so exactly one set is ever
                exposed to assistive tech. Absolute, and the nav is not positioned, so
                its containing block is the header and the sheet spans the viewport.
                Animated only in opacity/transform: a layout animation here cancels the
                viewport's smooth scroll to whichever row was just tapped. Kept mounted
                so `aria-controls` always resolves, with `inert` taking its links out of
                the tab order and out of hit-testing while it is hidden. */}
            <motion.div
              id="mobile-nav"
              inert={!open}
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : -8 }}
              transition={{ duration: reduce ? 0 : 0.26, ease: EASE }}
              className="absolute inset-x-0 top-full border-t border-line bg-ivory text-walnut shadow-[0_24px_44px_-28px_rgba(42,27,18,0.5)] sm:hidden"
            >
              <ul className="mx-auto max-w-6xl px-5">
                {drawerRows.map((row, index) => (
                  <li key={row.label} className="border-b border-line/70">
                    <a
                      href={row.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3.5 py-4 transition-colors hover:text-ember-ink motion-reduce:transition-none"
                    >
                      <span aria-hidden className="font-display text-xs tabular-nums text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium">{row.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mx-auto max-w-6xl px-5 pb-5 pt-4 text-sm text-walnut-soft">
                Dinner from {venue.dinnerServiceFrom} · {venue.address.area}
              </p>
            </motion.div>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((current) => !current)}
            className="-mr-2 grid size-11 place-items-center rounded-full transition-colors hover:bg-current/10 sm:hidden motion-reduce:transition-none"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <Cancel01Icon size={20} strokeWidth={1.7} aria-hidden className="text-ember-ink" />
            ) : (
              <Menu01Icon size={20} strokeWidth={1.7} aria-hidden />
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
