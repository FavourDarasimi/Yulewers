import Image from "next/image";
import { venue } from "@/lib/venue";

export default function Hero() {
  return (
    <section id="top" className="overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10 md:px-6 md:pt-28 lg:pb-14">
        <div className="surface-evening relative isolate overflow-hidden rounded-[28px] lg:rounded-[36px]">
          <Image
            src="/hero/suya.jpg"
            alt="Suya — spiced grilled beef with sliced onion and pepper sauce"
            fill
            sizes="(min-width: 1024px) min(1240px, 100vw - 3rem), calc(100vw - 2rem)"
            className="object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {/* The scrim carries the lede and the phone button, nothing else — the
              headline sits on solid frame colour. It is vertical on mobile, where
              the copy spans the width, and horizontal on desktop, where the copy
              is a column down the left. It stays near-solid under the button and
              thins out toward the top/right so the photograph is still legible as
              a photograph where the headline's bites open onto it. */}
          <div className="absolute inset-0 bg-linear-to-t from-evening via-evening/80 to-evening/55 lg:bg-linear-to-r lg:from-evening lg:via-evening/70 lg:to-evening/0" />

          <div className="hero-plate relative flex min-h-[34rem] flex-col justify-between gap-12 lg:min-h-[calc(100svh-12rem)]">
            <div>
              <div className="hero-cutout-frame">
                <h1 className="hero-cutout font-display">
                  <span className="cutout-slab cutout-line">Nigerian classics,</span>{" "}
                  <span className="cutout-slab cutout-line">kept for the</span>{" "}
                  <span className="cutout-slab cutout-line">evening.</span>
                </h1>
              </div>
              <p className="mt-7 max-w-xl text-lede text-ivory">
                From smoky suya to slow-cooked soups, the dishes you grew up with in a warm, low-lit
                room — dinner service from {venue.dinnerServiceFrom}.
              </p>
              <div className="mt-9">
                <a
                  href={`tel:${venue.phone.e164}`}
                  className="inline-flex rounded-full bg-ember px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-ember-deep motion-reduce:transition-none"
                >
                  Reserve by phone
                </a>
              </div>
            </div>

            <div className="rounded-[20px] border border-line bg-ivory-raised p-4 text-walnut sm:max-w-sm sm:self-end lg:absolute lg:bottom-8 lg:right-8 lg:max-w-sm lg:rounded-[24px]">
              <div className="flex items-center gap-4">
                <Image
                  src="/hero/suya.jpg"
                  alt=""
                  width={72}
                  height={72}
                  className="size-[72px] shrink-0 rounded-[14px] object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-walnut-soft">
                    On the plate
                  </p>
                  <p className="mt-1 font-display text-lg leading-snug">
                    Suya, pepper sauce &amp; onion
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed">
                Beef skewers over open flame, rolled in yaji — groundnut, ginger and cayenne — the
                smell of a Nigerian evening starting.
              </p>
              <a
                href="https://commons.wikimedia.org/wiki/File:Suya_with_pepper_sauce.jpg"
                className="mt-4 inline-block text-xs text-ember-ink underline decoration-line-strong/50 underline-offset-2 hover:decoration-2"
              >
                Photo: Bukky658 / Wikimedia Commons (CC BY-SA 4.0)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
