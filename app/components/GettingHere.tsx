import { Chat01Icon, MapPinIcon, Navigation01Icon } from "hugeicons-react";
import { directionsHref, venue } from "@/lib/venue";
import Reveal from "./Reveal";

// PLACEHOLDER. The approach, the landmarks and the gate are written to the
// shape of a Lekki Phase 1 side street — nothing has been confirmed, and the
// door number is still empty in lib/venue.ts. The map below is deliberately a
// schematic rather than a rendered street plan: there is no coordinate to
// render, and a fake tile would look like real geography.
const steps = [
  {
    n: 1,
    title: "Leave the expressway at Admiralty Way",
    body: "Past the filling station, not before it. The slip road you want is the second one after the bridge.",
  },
  {
    n: 2,
    title: "Take the second left — everyone takes the first",
    body: "The first left runs into the estate offices and dead-ends at a barrier. The second has a palm on the island in the middle of it.",
  },
  {
    n: 3,
    title: "Follow it to the blue gate",
    body: "Two hundred metres, then the road stops at a wall. Turn left before the wall and keep going until you see the lamp.",
  },
  {
    n: 4,
    title: "Come in and park by the generator house",
    body: "The gate stands open from six. After dark someone will come and hold it — you do not need to shout over the wall.",
  },
];

const pinHref = `https://wa.me/${venue.phone.e164.replace("+", "")}?text=${encodeURIComponent(
  "Trying to find you — sending my location.\nPlease send the pin back.",
)}`;

/**
 * The approach, drawn rather than mapped. The three numbered dots are the same
 * numbers as the steps beside it, so the reader can hold the picture and the
 * instruction at the same time.
 */
function Schematic() {
  return (
    <svg
      viewBox="0 0 340 250"
      role="img"
      aria-labelledby="here-map-title"
      className="w-full"
    >
      <title id="here-map-title">
        Schematic of the approach: turn off Admiralty Way, take the second left, follow it to the
        blue gate and turn left.
      </title>

      {/* Estate blocks, so the roads read as roads and not as lines. */}
      <g className="fill-line" opacity="0.5">
        <rect x="18" y="122" width="44" height="54" rx="3" />
        <rect x="88" y="128" width="40" height="48" rx="3" />
        <rect x="176" y="142" width="58" height="46" rx="3" />
        <rect x="248" y="150" width="70" height="40" rx="3" />
        <rect x="182" y="72" width="46" height="26" rx="3" />
      </g>

      {/* The expressway and the two lefts off it. */}
      <g className="stroke-line" strokeWidth="16" fill="none" strokeLinecap="round">
        <path d="M-8 210 H348" />
        <path d="M70 210 V118" />
        <path d="M150 210 V110 H280 V58" />
      </g>
      <g className="stroke-ivory" strokeWidth="1.5" strokeDasharray="5 6" fill="none" opacity="0.9">
        <path d="M-8 210 H348" />
        <path d="M150 210 V110 H280 V58" />
      </g>

      {/* The route to drive, and the wrong turn to avoid. */}
      <path
        d="M150 206 V110 H276"
        className="stroke-ember"
        strokeWidth="2.5"
        strokeDasharray="7 5"
        fill="none"
      />
      <g className="stroke-walnut-soft" strokeWidth="1.6" fill="none" opacity="0.55">
        <path d="M62 132 L78 146" />
        <path d="M78 132 L62 146" />
      </g>

      {/* The door: a lamp over a gate, which is how it actually finds you. */}
      <g className="fill-ember">
        <path d="M280 34c-7 0-12 5.5-12 12.5 0 9 12 21.5 12 21.5s12-12.5 12-21.5c0-7-5-12.5-12-12.5z" />
      </g>
      <circle cx="280" cy="46.5" r="4.5" className="fill-ivory" />

      <g>
        {[
          { n: 1, x: 150, y: 208 },
          { n: 2, x: 150, y: 110 },
          { n: 3, x: 280, y: 110 },
        ].map((dot) => (
          <g key={dot.n}>
            <circle cx={dot.x} cy={dot.y} r="9.5" className="fill-ember" />
            <text
              x={dot.x}
              y={dot.y + 3.5}
              textAnchor="middle"
              className="fill-ivory"
              fontSize="10"
              fontWeight="600"
            >
              {dot.n}
            </text>
          </g>
        ))}
      </g>

      {/* The viewBox shrinks on a phone, so the labels carry an extra unit there
          rather than dropping under nine rendered pixels. */}
      <g className="fill-walnut-soft text-[9.5px] sm:text-[8px]" letterSpacing="0.14em" fontWeight="600">
        <text x="8" y="234">
          ADMIRALTY WAY
        </text>
        <text x="34" y="112">
          NOT THIS ONE
        </text>
        <text x="158" y="98">
          SECOND LEFT
        </text>
        <text x="238" y="132">
          BLUE GATE
        </text>
        <text x="196" y="44" className="fill-ember-ink">
          THE LAMP
        </text>
      </g>

      {/* North arrow, because a map without one is a diagram. */}
      <g className="stroke-walnut-soft" strokeWidth="1.2" fill="none" opacity="0.7">
        <path d="M322 40 V22" />
        <path d="M318 27 L322 21 L326 27" />
      </g>
      <text
        x="322"
        y="52"
        textAnchor="middle"
        className="fill-walnut-soft text-[9.5px] sm:text-[8px]"
        fontWeight="600"
      >
        N
      </text>
    </svg>
  );
}

export default function GettingHere() {
  return (
    <section
      id="here"
      className="scroll-mt-[calc(4rem+1px)] border-b border-line bg-ivory md:scroll-mt-[calc(5rem+1px)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-9 bg-gold/70" />
            <p className="text-eyebrow font-semibold uppercase text-ember-ink">Getting here</p>
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-section text-balance text-walnut">
            The turn is the <em className="italic">hard</em> part.
          </h2>
          <p className="mt-4 max-w-xl text-lede text-walnut-soft text-pretty">
            {venue.address.area} is easy to drive past. Every
            driver misses the same left, so it is written out in four steps with the map beside it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <ol className="space-y-7">
              {steps.map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-ember text-sm font-semibold text-ivory"
                  >
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-walnut">{step.title}</h3>
                    <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-walnut-soft text-pretty">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-9 border-l-2 border-gold/60 pl-5 text-sm leading-relaxed text-walnut-soft">
              There is no board on the door yet, and the street numbers here mean nothing to anyone.
              Send us your location on WhatsApp and we will send the pin back — that is the real
              address.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="rounded-3xl border border-line bg-ivory-raised p-5 md:p-6">
              <Schematic />
              <figcaption className="mt-3 text-xs leading-relaxed text-walnut-soft">
                Schematic, not to scale — the turn is the part that matters.
              </figcaption>
            </figure>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-ember px-5 py-3.5 text-base font-semibold text-ivory shadow-[0_16px_36px_-16px_rgba(180,83,9,0.8)] transition-colors hover:bg-ember-deep motion-reduce:transition-none"
              >
                <Navigation01Icon
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden
                  className="shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
                Open in Google Maps
              </a>
              <a
                href={pinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-walnut-soft/70 px-5 py-3 text-sm font-semibold text-walnut transition-colors hover:border-walnut-soft hover:bg-walnut/5 motion-reduce:transition-none"
              >
                <Chat01Icon size={17} strokeWidth={1.6} aria-hidden className="shrink-0" />
                Ask for the pin
              </a>
            </div>

            <ul className="mt-6 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <li className="flex items-baseline gap-3">
                <MapPinIcon size={15} strokeWidth={1.6} aria-hidden className="shrink-0 text-ember-ink" />
                <span className="text-walnut-soft">
                  Ride-hail reaches the gate, but tell the driver{" "}
                  <span className="font-medium text-walnut">second left</span>.
                </span>
              </li>
              <li className="flex items-baseline gap-3">
                <MapPinIcon size={15} strokeWidth={1.6} aria-hidden className="shrink-0 text-ember-ink" />
                <span className="text-walnut-soft">
                  Keke and bus stop on the expressway; the last{" "}
                  <span className="font-medium text-walnut">200 metres</span> is on foot.
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
