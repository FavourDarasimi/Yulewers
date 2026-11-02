import { ArrowRight01Icon, Calling02Icon, Chat01Icon } from "hugeicons-react";
import { venue } from "@/lib/venue";
import Leader from "./Leader";
import Reveal from "./Reveal";

// PLACEHOLDER policy. None of these six answers has been confirmed with the
// venue; they are written to the shape of a small Lekki dinner room and will
// need replacing with the real house rules before launch.
const know = [
  {
    term: "Walk-ins",
    verdict: "Room at the bar",
    body: "Two stools are kept back for people who did not call, and the grill side is usually free before seven.",
  },
  {
    term: "Children",
    verdict: "Welcome until ten",
    body: "They eat what you eat. Ask for the rice early and it comes out early — there is no separate children's menu.",
  },
  {
    term: "Parking",
    verdict: "Street, after seven",
    body: "The estate fills up before the first pot lands. Come later, or leave the car with someone who can bring it back.",
  },
  {
    term: "Allergies",
    verdict: "Say it in writing",
    body: "Groundnut runs through half of what we cook. Flag it on the reservation form or in the WhatsApp message, not at the table.",
  },
  {
    term: "Card or cash",
    verdict: "Card, or transfer",
    body: "The machine takes Visa and Mastercard. Cash is fine but we are not a cash house, and a transfer needs a name on it.",
  },
  {
    term: "Running late",
    verdict: "Twenty minutes",
    body: "After that the table goes to whoever is already standing at the bar. Ring and we hold it longer — ring and lie and we will not.",
  },
];

const questionHref = `https://wa.me/${venue.phone.e164.replace("+", "")}?text=${encodeURIComponent(
  "A question before we book — from the website",
)}`;

export default function GoodToKnow() {
  return (
    <section
      id="know"
      className="scroll-mt-[calc(4rem+1px)] border-b border-line bg-ivory-raised md:scroll-mt-[calc(5rem+1px)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
          <Reveal className="lg:sticky lg:top-[7.5rem]">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-9 bg-gold/70" />
              <p className="text-eyebrow font-semibold uppercase text-ember-ink">Good to know</p>
            </div>
            <h2 className="mt-5 font-display text-section text-balance text-walnut">
              What the phone gets before we pick it up.
            </h2>
            <p className="mt-4 max-w-md text-lede text-walnut-soft text-pretty">
              Six things people ask the day they come. If a house rule changes, this is the page that
              changes first.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={questionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ember-ink underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ember-deep hover:decoration-gold motion-reduce:transition-none"
              >
                <Chat01Icon size={15} strokeWidth={1.7} aria-hidden className="shrink-0" />
                Ask the rest on WhatsApp
              </a>
              <a
                href={`tel:${venue.phone.e164}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-walnut-soft transition-colors hover:text-walnut motion-reduce:transition-none"
              >
                <Calling02Icon size={15} strokeWidth={1.6} aria-hidden className="shrink-0" />
                <span className="tabular-nums">{venue.phone.display}</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <dl>
              {know.map((item) => (
                <div key={item.term} className="border-t border-line py-6 first:border-t-0 first:pt-0">
                  <dt className="flex items-baseline font-semibold text-walnut">
                    {item.term}
                    <Leader />
                    <span className="shrink-0 text-sm font-medium text-walnut-soft">
                      {item.verdict}
                    </span>
                  </dt>
                  <dd className="mt-2 max-w-prose text-sm leading-relaxed text-walnut-soft text-pretty">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-sm leading-relaxed text-walnut-soft">
              Ten or more, or the whole room to yourself? That is a{" "}
              <a
                href="#hire"
                className="group inline-flex items-center gap-1.5 font-semibold text-ember-ink underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ember-deep hover:decoration-gold motion-reduce:transition-none"
              >
                private hire
                <ArrowRight01Icon
                  size={14}
                  strokeWidth={1.9}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </a>{" "}
              conversation, not a table on the map.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
