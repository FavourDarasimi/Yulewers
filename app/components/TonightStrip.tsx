import { connection } from "next/server";
import { tonight, venue, windowText } from "@/lib/venue";

export default async function TonightStrip() {
  // Without this the strip bakes in the build-time weekday and goes stale.
  await connection();
  const { weekday, window } = tonight();

  return (
    <section
      id="tonight"
      className="scroll-mt-[calc(4rem+1px)] border-y border-line bg-ivory-raised md:scroll-mt-[calc(5rem+1px)]"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:grid-cols-3 lg:px-8">
        <div>
          <p className="text-eyebrow font-semibold uppercase text-walnut-soft">
            Tonight, {weekday}
          </p>
          <p className="mt-2 font-medium text-walnut">{windowText(window)}</p>
        </div>
        <div>
          <p className="text-eyebrow font-semibold uppercase text-walnut-soft">Dinner service</p>
          <p className="mt-2 font-medium text-walnut">From {venue.dinnerServiceFrom}</p>
        </div>
        <div>
          <p className="text-eyebrow font-semibold uppercase text-walnut-soft">Reservations</p>
          <p className="mt-2 font-medium">
            <a
              href={`tel:${venue.phone.e164}`}
              className="text-ember-ink underline underline-offset-4"
            >
              {venue.phone.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
