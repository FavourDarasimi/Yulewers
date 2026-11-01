import Reveal from "./Reveal";
import { menu, naira, orderSteps, type MenuItem } from "@/lib/menu";
import { venue } from "@/lib/venue";

function Heat({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="ml-2 inline-flex items-center gap-1 align-middle">
      <span className="sr-only">Heat {level} of 3</span>
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          aria-hidden
          className={`size-1 rounded-full ${dot <= level ? "bg-ember" : "bg-line-strong/25"}`}
        />
      ))}
    </span>
  );
}

function Dish({ item }: { item: MenuItem }) {
  return (
    <li>
      <div className="flex items-baseline">
        <h4 className="font-medium text-walnut">
          {item.name}
          {item.heat ? <Heat level={item.heat} /> : null}
          {item.veg ? (
            <span className="ml-2 align-super text-[0.625rem] font-semibold uppercase tracking-wide text-ember-ink">
              v
              <span className="sr-only"> — vegetarian-friendly</span>
            </span>
          ) : null}
        </h4>
        <span
          aria-hidden
          className="mx-3 h-px flex-1 -translate-y-[0.35em] bg-[repeating-linear-gradient(90deg,var(--color-line-strong)_0_1px,transparent_1px_5px)] opacity-40"
        />
        <span className="shrink-0 font-medium tabular-nums text-walnut-soft">
          {naira(item.price)}
        </span>
      </div>
      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-walnut-soft/90 text-pretty">
        {item.note}
      </p>
    </li>
  );
}

export default function Menu() {
  return (
    <section
      id="menu"
      className="scroll-mt-[calc(4rem+1px)] border-b border-line bg-ivory md:scroll-mt-[calc(5rem+1px)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-24 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-9 bg-gold/70" />
            <p className="text-eyebrow font-semibold uppercase text-ember-ink">The menu</p>
          </div>
          <h2 className="mt-5 max-w-2xl font-display text-section text-balance text-walnut">
            The pots start at four, so nothing arrives rushed.
          </h2>
          <p className="mt-4 max-w-xl text-lede text-walnut-soft text-pretty">
            A grill, four soups, and rice that has been standing since lunch. Order for the table
            and let the plates keep coming.
          </p>
          <p className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-walnut-soft">
            <span className="inline-flex items-center gap-2">
              Heat
              <Heat level={3} />
              three is genuinely hot
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-ember-ink">
                v
              </span>
              vegetarian-friendly
            </span>
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-14 gap-y-16 md:grid-cols-2">
          {menu.map((section, index) => (
            <Reveal key={section.title} delay={index % 2 === 1 ? 0.08 : 0}>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-6 bg-gold/60" />
                <h3 className="font-display text-2xl text-walnut md:text-[1.65rem]">
                  {section.title}
                </h3>
              </div>
              <p className="mt-1.5 pl-9 font-display text-sm italic text-walnut-soft/85">
                {section.caption}
              </p>
              <ul className="mt-7 space-y-6">{section.items.map((item) => <Dish key={item.name} item={item} />)}</ul>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <aside className="mt-16 rounded-3xl border border-line bg-ivory-raised px-6 py-8 md:px-10 md:py-10">
            <h3 className="font-display text-2xl text-walnut">How to order</h3>
            <ol className="mt-8 grid gap-8 md:grid-cols-3">
              {orderSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4 md:block md:gap-0">
                  <span className="font-display text-xl text-ember-ink md:text-2xl">
                    0{index + 1}
                  </span>
                  <div className="md:mt-3">
                    <p className="font-semibold text-walnut">{step.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-walnut-soft text-pretty">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-9 border-t border-line pt-6 text-sm leading-relaxed text-walnut-soft">
              The board moves with the market, and pounded yam runs out before eight. To hold a
              table or ask what came in today,{" "}
              <a
                href={`tel:${venue.phone.e164}`}
                className="text-ember-ink underline underline-offset-4 transition-colors hover:text-ember-deep motion-reduce:transition-none"
              >
                call {venue.phone.display}
              </a>
              .
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
