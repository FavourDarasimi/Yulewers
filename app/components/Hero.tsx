"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown01Icon, Calling02Icon } from "hugeicons-react";
import { venue } from "@/lib/venue";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number, duration: number) => ({
    duration: reduce ? 0 : duration,
    delay: reduce ? 0 : delay,
    ease: EASE,
  });

  return (
    <section
      id="top"
      className="surface-evening relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduce ? 0 : 1.8, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src="/Hero_Image.jpeg"
          alt="A candlelit table: suya skewers on a wooden board, a bowl of greens with meat, and a glass of zobo"
          fill
          sizes="100vw"
          className="object-cover object-[68%_50%] lg:object-center"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* The scrim is vertical on mobile, where the copy spans the width, and
          horizontal on desktop, where the copy is a left-hand column. The top
          wash keeps the fixed header legible over the photograph. */}
      <div className="absolute inset-0 bg-linear-to-t from-evening via-evening/75 to-evening/15 lg:bg-linear-to-r lg:from-evening lg:via-evening/55 lg:to-evening/0" />
      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-evening/80 to-transparent md:h-36" />

      {/* Candlelight bloom over the food, and a vignette that sinks the corners
          into the room. Together they keep the photograph from reading as a flat
          background wash. */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(40%_46%_at_79%_44%,rgba(200,155,60,0.18),transparent_72%)] lg:block" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_42%,transparent_36%,rgba(18,10,5,0.6)_100%)]" />
      <div aria-hidden className="hero-grain absolute inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-28 md:px-6 md:py-32 lg:px-8">
        <div className="flex items-center gap-4">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={enter(0.1, 0.8)}
            className="h-px w-9 origin-left bg-gold/80"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0.15, 0.6)}
            className="text-eyebrow font-semibold uppercase text-gold"
          >
            Dinner from {venue.dinnerServiceFrom}
            <span aria-hidden className="mx-2.5 text-gold/50">
              ·
            </span>
            {venue.neighbourhood}
          </motion.p>
        </div>

        <h1 className="mt-6 max-w-4xl font-display text-display text-ivory">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={enter(0.18, 0.9)}
            >
              Nigerian classics,
            </motion.span>
          </span>
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={enter(0.28, 0.9)}
            >
              kept for the <em className="italic">evening</em>
              <span className="text-gold">.</span>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter(0.44, 0.6)}
          className="mt-6 max-w-xl text-lede text-ivory/80"
        >
          From smoky suya to slow-cooked soups, the dishes you grew up with, in a warm, low-lit
          room.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter(0.56, 0.6)}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
        >
          <a
            href={`tel:${venue.phone.e164}`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ember px-6 py-3.5 text-base font-semibold text-white shadow-[0_16px_36px_-14px_rgba(180,83,9,0.65)] transition-colors hover:bg-ember-deep motion-reduce:transition-none"
          >
            <Calling02Icon
              size={18}
              strokeWidth={1.7}
              aria-hidden
              className="transition-transform group-hover:-rotate-6 motion-reduce:transition-none"
            />
            Reserve by phone
          </a>
          <a
            href="#tonight"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ivory/80 underline decoration-gold/40 underline-offset-[6px] transition-colors hover:text-ivory hover:decoration-gold motion-reduce:transition-none"
          >
            See tonight&apos;s hours
            <ArrowDown01Icon
              size={15}
              strokeWidth={1.8}
              aria-hidden
              className="transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#tonight"
        aria-label="Scroll to tonight's hours"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={enter(1, 0.6)}
        className="absolute inset-x-0 bottom-7 mx-auto hidden w-fit flex-col items-center gap-2.5 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-ivory/45 transition-colors hover:text-ivory/75 sm:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-ivory/15">
          <span aria-hidden className="hero-scroll-dot absolute left-0 top-0 h-2.5 w-px bg-gold" />
        </span>
      </motion.a>
    </section>
  );
}
