"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { venue } from "@/lib/venue";

export default function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors motion-reduce:transition-none ${
        solid
          ? "border-line bg-ivory-raised/95 text-walnut backdrop-blur-sm"
          : "border-transparent text-ivory"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 lg:px-8">
        <a href="#top" className="font-display text-xl tracking-tight md:text-2xl">
          {venue.name}
        </a>

        <nav aria-label="Primary" className="flex items-center gap-5 md:gap-8">
          <a
            href="#tonight"
            className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block"
          >
            Tonight
          </a>
          <a
            href={`tel:${venue.phone.e164}`}
            className="hidden text-sm font-medium underline-offset-4 hover:underline lg:block"
          >
            {venue.phone.display}
          </a>
          <a
            href={`tel:${venue.phone.e164}`}
            className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ember-deep motion-reduce:transition-none"
          >
            Reserve
          </a>
        </nav>
      </div>
    </header>
  );
}
