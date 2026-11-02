import {
  ArrowRight01Icon,
  Fire02Icon,
  Lamp01Icon,
  MusicNote02Icon,
  RestaurantTableIcon,
} from "hugeicons-react";
import Reveal from "./Reveal";

// PLACEHOLDER copy — the room description, table count and house notes are
// written to fill the section, not taken from anything the venue has confirmed.
const houseNotes = [
  {
    icon: Fire02Icon,
    title: "Charcoal is lit before you are",
    body: "The grill runs from six, so the first plate is not a waiting game.",
  },
  {
    icon: RestaurantTableIcon,
    title: "Tables push together",
    body: "Say how many when you call and we will make the long bench work.",
  },
  {
    icon: MusicNote02Icon,
    title: "Volume rises after ten",
    body: "It is not a quiet room, and we have stopped pretending to be one.",
  },
  {
    icon: Lamp01Icon,
    title: "Lights stay low",
    body: "A candle on every table. Your photographs will come out warm.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-[calc(4rem+1px)] border-b border-line bg-ivory-raised md:scroll-mt-[calc(5rem+1px)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-9 bg-gold/70" />
            <p className="text-eyebrow font-semibold uppercase text-ember-ink">The room</p>
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-section text-balance text-walnut">
            Low light, loud tables, and nobody checking the clock.
          </h2>
          <p className="mt-4 max-w-xl text-lede text-walnut-soft text-pretty">
            A small room built around one grill, for the kind of evening that takes longer than you
            planned.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="max-w-prose space-y-5 text-base leading-relaxed text-walnut-soft">
              <p>
                Twelve tables, one long bench under the window, and a charcoal grill you can see
                from anywhere in the room. The menu stays short on purpose — soups that start in the
                afternoon, rice that has been standing since lunch, and whatever the market handed
                us that morning.
              </p>
              <p>
                We open for dinner because that is when the room works. Come as you are, bring more
                people than you said you would, and order the second pot when the first one empties.
              </p>
            </div>

            <figure className="mt-10 border-l-2 border-gold/60 pl-6">
              <blockquote className="max-w-md font-display text-2xl italic leading-snug text-walnut md:text-[1.6rem]">
                A good evening ends with the table still talking.
              </blockquote>
              <figcaption className="mt-3 text-eyebrow font-semibold uppercase text-walnut-soft">
                House rule one
              </figcaption>
            </figure>

            <a
              href="#menu"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-ember-ink underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ember-deep hover:decoration-gold motion-reduce:transition-none"
            >
              See what is on the grill
              <ArrowRight01Icon
                size={15}
                strokeWidth={1.9}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-ivory px-6 py-7 md:px-8 md:py-8">
              <h3 className="font-display text-2xl text-walnut">When you get here</h3>
              <ul className="mt-6">
                {houseNotes.map(({ icon: Icon, title, body }) => (
                  <li
                    key={title}
                    className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ember-ink">
                      <Icon size={17} strokeWidth={1.6} aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-walnut">{title}</p>
                      <p className="mt-1 max-w-prose text-sm leading-relaxed text-walnut-soft text-pretty">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
