import { venue } from "@/lib/venue";

export default function Hero() {
  return (
    <section
      id="top"
      className="surface-evening flex min-h-[100svh] items-center pt-16 md:pt-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 lg:px-8">
        <div className="max-w-[36rem]">
          <p className="text-eyebrow font-semibold uppercase text-gold">
            {venue.neighbourhood}, Lagos
          </p>
          <h1 className="mt-5 text-display font-display">
            Nigerian classics, kept for the evening.
          </h1>
          <p className="mt-6 max-w-[52ch] text-lede text-ivory/80">
            From smoky suya to slow-cooked soups, the dishes you grew up with in a warm, low-lit room
            — dinner service from {venue.dinnerServiceFrom}.
          </p>
          <div className="mt-10">
            <a
              href={`tel:${venue.phone.e164}`}
              className="inline-flex rounded-full bg-ember px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-ember-deep motion-reduce:transition-none"
            >
              Reserve by phone
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
