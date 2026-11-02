import {
  ArrowRight01Icon,
  Calling02Icon,
  Chat01Icon,
  Group01Icon,
} from "hugeicons-react";
import { naira } from "@/lib/menu";
import { tables, totalSeats } from "@/lib/tables";
import { venue } from "@/lib/venue";
import Reveal from "./Reveal";
import ReserveButton from "./ReserveButton";
import Leader from "./Leader";

// PLACEHOLDER. The three hire shapes, the per-head figure, the deposit and the
// late grill are written to fill the section — none of it is agreed with the
// venue. The seat counts are the exception: they are read from the same floor
// plan the reservation map draws, so they cannot drift away from it.
const seated = tables
  .filter((table) => !table.outOfService)
  .reduce((sum, table) => sum + table.seats, 0);

const hireShapes = [
  {
    n: "01",
    name: "A corner of the room",
    seats: "10 – 16 seats",
    body: "Two or three tables pulled along the back wall. The grill keeps serving everyone else, so the room stays alive around you.",
  },
  {
    n: "02",
    name: "Half the room",
    seats: "20 – 24 seats",
    body: "The window side, bench and rounds merged into one long table. The bar still pours and the first pot lands at seven.",
  },
  {
    n: "03",
    name: "The whole room",
    seats: `${seated} – ${totalSeats} seats`,
    body: "Your name on the door and both counters to yourself, the pulled table put back if you want every seat there is. The grill runs as long as anybody is still asking.",
  },
];

const rider = [
  { term: "Set menu", value: `${naira(9500)} per head` },
  { term: "To hold the night", value: "A third of the food bill" },
  { term: "Notice", value: "48 hours · a week at weekends" },
  { term: "Last orders", value: "Whatever time you tell us" },
  { term: "Sound", value: "Your playlist through the room" },
  { term: "Outside drinks", value: "Welcome, we will pour them" },
];

const enquiryText = [
  "Private hire — from the website",
  "",
  "How many: about ___ people",
  "Which night: ___",
  "Which shape: corner / half the room / the whole room",
  "Name and a number: ___",
].join("\n");

const enquiryHref = `https://wa.me/${venue.phone.e164.replace("+", "")}?text=${encodeURIComponent(
  enquiryText,
)}`;

export default function PrivateHire() {
  return (
    <section
      id="hire"
      className="scroll-mt-[calc(4rem+1px)] border-b border-line bg-ivory md:scroll-mt-[calc(5rem+1px)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-9 bg-gold/70" />
            <p className="text-eyebrow font-semibold uppercase text-ember-ink">Private hire</p>
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-section text-balance text-walnut">
            Take the room — <em className="italic">all</em> {seated} seats of it.
          </h2>
          <p className="mt-4 max-w-xl text-lede text-walnut-soft text-pretty">
            Birthdays, the final match, the reunion that ends with the chairs stacked on the tables.
            Three ways to take the room — and nothing is owed until we have agreed which night it
            is.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <ol>
              {hireShapes.map((shape) => (
                <li key={shape.n} className="border-t border-line py-6 first:pt-6">
                  <div className="flex items-baseline">
                    <span aria-hidden className="font-display text-sm tabular-nums text-gold">
                      {shape.n}
                    </span>
                    <h3 className="ml-3.5 font-display text-xl text-walnut md:text-2xl">
                      {shape.name}
                    </h3>
                    <Leader />
                    <span className="shrink-0 text-sm font-medium tabular-nums text-walnut-soft">
                      {shape.seats}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-walnut-soft text-pretty">
                    {shape.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-8 max-w-prose text-sm leading-relaxed text-walnut-soft">
              Nine or fewer, you do not need any of this.{" "}
              <ReserveButton className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ember-ink underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ember-deep hover:decoration-gold motion-reduce:transition-none">
                Pick a table on the map
                <ArrowRight01Icon
                  size={14}
                  strokeWidth={1.9}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </ReserveButton>{" "}
              and the seat is yours in a minute.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-ivory-raised px-6 py-7 md:px-8 md:py-8">
              <div className="flex items-center gap-3">
                <Group01Icon size={19} strokeWidth={1.6} aria-hidden className="text-ember-ink" />
                <h3 className="font-display text-2xl text-walnut">Tell us this much</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-walnut-soft">
                Send it rough. A headcount and a week is enough to start, and we will fill the rest
                in with you.
              </p>

              <dl className="mt-6 text-sm">
                {rider.map((row) => (
                  <div key={row.term} className="flex items-baseline border-t border-line py-3">
                    <dt className="shrink-0 text-walnut-soft">{row.term}</dt>
                    <Leader />
                    <dd className="shrink-0 text-right font-medium text-walnut">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={enquiryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ember px-5 py-3.5 text-base font-semibold text-ivory shadow-[0_16px_36px_-16px_rgba(180,83,9,0.8)] transition-colors hover:bg-ember-deep motion-reduce:transition-none"
                >
                  <Chat01Icon
                    size={18}
                    strokeWidth={1.7}
                    aria-hidden
                    className="shrink-0 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                  Send the shape of it
                </a>
                <a
                  href={`tel:${venue.phone.e164}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-walnut-soft/70 px-5 py-3 text-sm font-semibold text-walnut transition-colors hover:border-walnut-soft hover:bg-walnut/5 motion-reduce:transition-none"
                >
                  <Calling02Icon size={17} strokeWidth={1.6} aria-hidden />
                  <span className="tabular-nums">{venue.phone.display}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
