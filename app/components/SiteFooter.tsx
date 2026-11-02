import { connection } from "next/server";
import {
  ArrowUp01Icon,
  Calling02Icon,
  Chat01Icon,
  InstagramIcon,
  MapPinIcon,
  RestaurantTableIcon,
} from "hugeicons-react";
import { hours, todayKey, venue, windowText } from "@/lib/venue";
import ReserveButton from "./ReserveButton";

const socialIcons = { instagram: InstagramIcon, whatsapp: Chat01Icon };

export default async function SiteFooter() {
  // The highlighted weekday and the copyright year are both read per request,
  // so a build-time render would freeze them.
  await connection();
  const today = todayKey();
  const year = new Date().getFullYear();
  const place = [venue.address.street, venue.address.area, venue.address.city]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="surface-evening relative isolate overflow-hidden">
      {/* The same room light as the hero, arriving from the other end: an ember
          glow under the reservations column, plus the film grain so the dark
          surface is not a flat panel. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(50%_42%_at_14%_102%,rgba(180,83,9,0.24),transparent_72%)]"
      />
      <div aria-hidden className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-6 lg:px-8">
        <div className="grid gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-9 bg-gold/80" />
              <p className="text-eyebrow font-semibold uppercase text-gold">Reservations</p>
            </div>
            <h2 className="mt-6 max-w-2xl font-display text-section text-balance text-ivory">
              Pick a table and we keep it <em className="italic text-gold">warm</em>.
            </h2>
            <p className="mt-5 max-w-md text-lede text-ivory/70 text-pretty">
              Six or more, say so the day before. Anything smaller, there is a stool by the grill
              with your name on it.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:self-end">
            <ReserveButton className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-evening transition-colors hover:bg-ivory motion-reduce:transition-none">
              <RestaurantTableIcon
                size={18}
                strokeWidth={1.7}
                aria-hidden
                className="shrink-0 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
              Reserve a table
            </ReserveButton>
            <a
              href={`tel:${venue.phone.e164}`}
              className="group inline-flex w-fit items-center gap-3 self-start rounded-full border border-ivory/25 px-6 py-4 transition-colors hover:border-gold/70 motion-reduce:transition-none"
            >
              <Calling02Icon
                size={20}
                strokeWidth={1.6}
                aria-hidden
                className="shrink-0 text-gold transition-transform group-hover:-rotate-6 motion-reduce:transition-none"
              />
              <span className="font-display text-xl tabular-nums text-ivory md:text-2xl">
                {venue.phone.display}
              </span>
            </a>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-14 border-t border-ivory/10 py-14 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] lg:py-16">
          <section aria-labelledby="footer-visit">
            <h3 id="footer-visit" className="text-eyebrow font-semibold uppercase text-gold">
              Visit
            </h3>
            <address className="mt-5 text-sm not-italic leading-7 text-ivory/80">
              {[venue.address.street, venue.address.area, venue.address.city]
                .filter(Boolean)
                .map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ivory underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold motion-reduce:transition-none"
            >
              <MapPinIcon size={15} strokeWidth={1.7} aria-hidden />
              Get directions
            </a>
          </section>

          <nav aria-labelledby="footer-explore">
            <h3 id="footer-explore" className="text-eyebrow font-semibold uppercase text-gold">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory/80">
              <li>
                <a href="#menu" className="underline-offset-4 transition-colors hover:text-gold motion-reduce:transition-none">
                  The menu
                </a>
              </li>
              <li>
                <a
                  href="#tonight"
                  className="underline-offset-4 transition-colors hover:text-gold motion-reduce:transition-none"
                >
                  Tonight&apos;s hours
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="underline-offset-4 transition-colors hover:text-gold motion-reduce:transition-none"
                >
                  The room
                </a>
              </li>
              <li>
                <a
                  href="#hire"
                  className="underline-offset-4 transition-colors hover:text-gold motion-reduce:transition-none"
                >
                  Private hire
                </a>
              </li>
              <li>
                <a
                  href="#top"
                  className="group inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-gold motion-reduce:transition-none"
                >
                  Back to the top
                  <ArrowUp01Icon
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden
                    className="transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </a>
              </li>
            </ul>
            <ul className="mt-7 flex items-center gap-3">
              {venue.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Yulewers on ${social.label}`}
                      className="grid size-10 place-items-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold/70 hover:text-gold motion-reduce:transition-none"
                    >
                      <Icon size={17} strokeWidth={1.6} aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <section aria-labelledby="footer-hours">
            <h3 id="footer-hours" className="text-eyebrow font-semibold uppercase text-gold">
              Opening hours
            </h3>
            <ul className="mt-5 max-w-sm text-sm tabular-nums">
              {Object.entries(hours).map(([day, window]) => {
                const isToday = day === today;
                return (
                  <li
                    key={day}
                    className={`flex items-baseline gap-3 border-b border-ivory/10 py-2.5 last:border-b-0 ${
                      isToday ? "text-ivory" : "text-ivory/65"
                    }`}
                  >
                    <span className={`w-11 shrink-0 ${isToday ? "font-semibold" : ""}`}>{day}</span>
                    {isToday ? (
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold">
                        Today
                      </span>
                    ) : null}
                    <span className="ml-auto shrink-0">{windowText(window)}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm text-ivory/65">
              Dinner service from {venue.dinnerServiceFrom}, {venue.neighbourhood} time.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-5 border-t border-ivory/10 py-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl tracking-tight text-ivory">
              {venue.name}
              <span className="text-gold">.</span>
            </p>
            <p className="mt-2 text-xs text-ivory/60">
              &copy; {year} {venue.name}. Nigerian classics, kept for the evening.
            </p>
          </div>
          <p className="text-xs text-ivory/60">
            Requests reach the room by WhatsApp or phone — nothing is held until someone there says
            yes.
          </p>
        </div>
      </div>
    </footer>
  );
}
