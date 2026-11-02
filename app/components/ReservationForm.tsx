"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowRight01Icon, Calling02Icon } from "hugeicons-react";
import type { Table } from "@/lib/tables";
import {
  bookableDates,
  floorFor,
  formatLongDate,
  formatShortDate,
  nextOpenDate,
  relativeDayLabel,
  slotsFor,
  tableById,
  venueTodayISO,
} from "@/lib/tables";
import { venue } from "@/lib/venue";
import TableMap from "./TableMap";

const ALLERGENS = ["Groundnut", "Crayfish", "Fish", "Gluten", "Dairy", "Egg"];

const OCCASIONS = [
  "Just dinner",
  "Birthday",
  "Anniversary",
  "Work dinner",
  "Something to celebrate",
];

const FIELD =
  "mt-1.5 w-full rounded-lg border border-line-strong bg-ivory px-3 py-2.5 text-base text-walnut placeholder:text-walnut-soft/60 focus:border-ember motion-reduce:transition-none";

const GROUP_LABEL = "text-eyebrow font-semibold uppercase text-ember-ink";

const ERROR_ORDER = ["table", "guests", "name", "phone"] as const;
type FieldKey = (typeof ERROR_ORDER)[number];

type Props = {
  /** The panel owns the scroller, so a sent request can start back at the top. */
  scrollToTop: () => void;
};

export default function ReservationForm({ scrollToTop }: Props) {
  // Read during render, not staged in an effect: the clock is the only source,
  // and the page is rendered per request (the footer forces it), so the server
  // and the first client render agree except for a few seconds at the Lagos
  // midnight and at each half-hour seating boundary.
  const today = venueTodayISO();
  const [date, setDate] = useState(() => nextOpenDate(venueTodayISO()));
  const [slotInput, setSlotInput] = useState("");
  const [tableId, setTableId] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyOther, setAllergyOther] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) scrollToTop();
  }, [sent, scrollToTop]);

  const dateOptions = useMemo(() => bookableDates(today, 21), [today]);
  const timeOptions = useMemo(() => slotsFor(date), [date]);
  // A date the venue is open on, but not at that time — tonight at 9pm does not
  // still have a 5pm seating. Derived, so nothing has to be corrected later.
  const slot = timeOptions.includes(slotInput) ? slotInput : (timeOptions[0] ?? "");
  const floor = useMemo(() => floorFor(date, slot), [date, slot]);
  // A pick is only good for the moment it was made. Move the day or the time and
  // the same table can already be sat, so the selection is derived against the
  // floor in front of the guest rather than corrected afterwards: a stale pick
  // simply stops being a pick, and cannot be sent.
  const pickedId = tableId && floor.statuses[tableId] === "free" ? tableId : undefined;
  const staleId = tableId && !pickedId ? tableId : undefined;
  const table = pickedId ? tableById(pickedId) : undefined;
  // The thumb cannot sit outside its own max, so the count beside it is clamped
  // the same way. The party size itself is kept in state: re-pick a six-seater
  // after a stale bench and the six comes back.
  const shownGuests = table ? Math.min(guests, table.seats) : 1;

  function pickTable(next: Table) {
    setTableId(next.id);
    setGuests((current) => Math.min(current, next.seats));
    setErrors((current) => (current.table ? { ...current, table: undefined } : current));
  }

  function toggleAllergy(value: string) {
    setAllergies((current) =>
      current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value],
    );
  }

  function validate(): Partial<Record<FieldKey, string>> {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!table) next.table = "Pick a table from the floor.";
    if (guests < 1) next.guests = "At least one seat.";
    if (name.trim().length < 2) next.name = "We need a name for the table.";
    if (phone.replace(/\D/g, "").length < 8) next.phone = "A number the venue can ring back on.";
    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    const first = ERROR_ORDER.find((key) => next[key]);
    if (first) {
      document.getElementById(`reserve-${first}`)?.focus();
      return;
    }
    setSent(true);
  }

  const summary = table
    ? `Table ${table.label} · ${guests} of ${table.seats} seats · ${
        date ? formatShortDate(date) : ""
      } ${slot}`
    : "No table picked yet";

  const allergyLine = [
    ...allergies,
    ...(allergyOther.trim() ? [allergyOther.trim()] : []),
  ].join(", ");

  const requestText = [
    "Table request — from the website",
    "",
    date ? `${formatLongDate(date)}, ${slot}` : `${slot}`,
    table ? `Table ${table.label} (${table.seats} seats, ${table.where})` : "",
    `Party of ${guests}`,
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
    occasion === OCCASIONS[0] ? "" : `Occasion: ${occasion}`,
    allergyLine ? `Allergies: ${allergyLine}` : "Allergies: none flagged",
    notes.trim() ? `Notes: ${notes.trim()}` : "",
    "",
    "Please confirm if you can hold this.",
  ]
    .filter(Boolean)
    .join("\n");

  const whatsAppHref = `https://wa.me/${venue.phone.e164.replace("+", "")}?text=${encodeURIComponent(
    requestText,
  )}`;

  const recapRows = [
    { term: "When", value: `${formatLongDate(date)}, ${slot}` },
    { term: "Table", value: table ? `${table.label} · ${table.where} · ${table.seats} seats` : "" },
    { term: "Guests", value: String(guests) },
    { term: "Name", value: name.trim() },
    { term: "Phone", value: phone.trim() },
    ...(occasion === OCCASIONS[0] ? [] : [{ term: "Occasion", value: occasion }]),
    { term: "Allergies", value: allergyLine || "None" },
    ...(notes.trim() ? [{ term: "Notes", value: notes.trim() }] : []),
  ];

  if (sent) {
    return (
      <div className="px-5 py-6 md:px-6">
        <p className={GROUP_LABEL}>One more step</p>
        <h3 className="mt-3 font-display text-2xl text-walnut">
          Nothing is held until the venue says yes.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-walnut-soft">
          Send this as it is — WhatsApp opens with your request written out. Or ring the room and
          read it over.
        </p>

        <dl className="mt-6 rounded-2xl border border-line bg-ivory-raised px-5 py-4 text-sm">
          {recapRows.map(({ term, value }) => (
            <div key={term} className="flex gap-4 border-b border-line py-2 last:border-b-0">
              <dt className="w-20 shrink-0 text-eyebrow font-semibold uppercase text-walnut-soft">
                {term}
              </dt>
              <dd className="min-w-0 flex-1 break-words text-walnut">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-3">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-ember px-5 py-3.5 text-base font-semibold text-ivory shadow-[0_16px_36px_-16px_rgba(180,83,9,0.8)] transition-colors hover:bg-ember-deep motion-reduce:transition-none"
          >
            Send it on WhatsApp
            <ArrowRight01Icon size={17} strokeWidth={1.9} aria-hidden />
          </a>
          <a
            href={`tel:${venue.phone.e164}`}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line-strong px-5 py-3.5 text-base font-semibold text-walnut transition-colors hover:bg-walnut/5 motion-reduce:transition-none"
          >
            <Calling02Icon size={17} strokeWidth={1.7} aria-hidden />
            Ring {venue.phone.display}
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-1 self-center text-sm font-medium text-walnut-soft underline decoration-gold/60 underline-offset-4 transition-colors hover:text-walnut hover:decoration-gold motion-reduce:transition-none"
          >
            Change something
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="px-5 pb-2 pt-5 md:px-6">
      <div>
        <h3 className={GROUP_LABEL}>Your table</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-medium text-walnut-soft">Day</span>
            <select
              id="reserve-date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={FIELD}
            >
              {dateOptions.map((option) => {
                const closed = slotsFor(option).length === 0;
                const label = relativeDayLabel(option, today) ?? formatShortDate(option);
                return (
                  <option key={option} value={option} disabled={closed}>
                    {closed ? `${label} — closed` : label}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-walnut-soft">Sit at</span>
            <select
              id="reserve-slot"
              value={slot}
              onChange={(event) => setSlotInput(event.target.value)}
              className={FIELD}
            >
              {timeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6">
        <TableMap
          date={date}
          slot={slot}
          floor={floor}
          selectedId={pickedId}
          onSelect={pickTable}
          fieldsetId="reserve-table"
          errorId={errors.table ? "reserve-table-error" : undefined}
        />
        {errors.table ? (
          <p role="alert" id="reserve-table-error" className="mt-2 text-sm font-medium text-ember-deep">
            {errors.table}
          </p>
        ) : null}
        {/* Announced, not an error: the guest did nothing wrong, the floor moved. */}
        {staleId && !errors.table ? (
          <p role="status" className="mt-2 text-sm font-medium text-ember-deep">
            Table {tableById(staleId)?.label} is not free at that time. Pick another.
          </p>
        ) : null}
      </div>

      <div className="mt-7">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="reserve-guests" className="text-sm font-semibold text-walnut">
            How many are coming?
          </label>
          <span className="font-display text-xl tabular-nums text-walnut">
            {shownGuests}
            <span className="text-sm text-walnut-soft">
              {table ? ` of ${table.seats}` : ""}
            </span>
          </span>
        </div>
        <input
          id="reserve-guests"
          type="range"
          min={1}
          max={table?.seats ?? 1}
          step={1}
          value={shownGuests}
          disabled={!table}
          onChange={(event) => setGuests(Number(event.target.value))}
          aria-describedby={table ? "guests-hint" : "guests-blocked"}
          aria-invalid={errors.guests ? "true" : undefined}
          className="mt-3 w-full accent-ember disabled:opacity-40"
        />
        <div className="mt-1 flex justify-between text-[0.6875rem] tabular-nums text-walnut-soft">
          <span>1</span>
          <span>{table ? `${table.seats}` : "—"}</span>
        </div>
        <p id="guests-blocked" className="mt-1 text-sm text-walnut-soft">
          Pick a table first — the slider tops out at its seats.
        </p>
        {table ? (
          <p id="guests-hint" className="mt-1 text-sm text-walnut-soft">
            {table.shape === "bench"
              ? "The bench takes the whole party, or ring ahead to push tables together."
              : `${table.seats} seats at table ${table.label}.`}
          </p>
        ) : null}
        {errors.guests ? (
          <p role="alert" className="mt-1 text-sm font-medium text-ember-deep">
            {errors.guests}
          </p>
        ) : null}
      </div>

      <fieldset className="mt-7 border-t border-line pt-6">
        <legend className={GROUP_LABEL}>Who is coming</legend>
        <label className="mt-3 block">
          <span className="text-sm font-medium text-walnut">Name for the table</span>
          <input
            id="reserve-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Who should we shout for?"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "reserve-name-error" : undefined}
            className={FIELD}
          />
          {errors.name ? (
            <p role="alert" id="reserve-name-error" className="mt-1.5 text-sm font-medium text-ember-deep">
              {errors.name}
            </p>
          ) : null}
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-walnut">Phone</span>
          <input
            id="reserve-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+234 …"
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "reserve-phone-error" : "reserve-phone-hint"}
            className={FIELD}
          />
          {errors.phone ? (
            <p role="alert" id="reserve-phone-error" className="mt-1.5 text-sm font-medium text-ember-deep">
              {errors.phone}
            </p>
          ) : (
            <p id="reserve-phone-hint" className="mt-1.5 text-sm text-walnut-soft">
              It goes in the message so the room can call back.
            </p>
          )}
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-walnut">Occasion</span>
          <select
            id="reserve-occasion"
            value={occasion}
            onChange={(event) => setOccasion(event.target.value)}
            className={FIELD}
          >
            {OCCASIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <fieldset className="mt-7 border-t border-line pt-6">
        <legend className={GROUP_LABEL}>Anything we should know</legend>
        <p className="mt-3 text-sm font-medium text-walnut" id="allergies-label">
          Allergies
        </p>
        <div
          role="group"
          aria-labelledby="allergies-label"
          className="mt-2 flex flex-wrap gap-2"
        >
          {ALLERGENS.map((allergen) => {
            const on = allergies.includes(allergen);
            return (
              <button
                key={allergen}
                type="button"
                aria-pressed={on}
                onClick={() => toggleAllergy(allergen)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors motion-reduce:transition-none ${
                  on
                    ? "border-ember bg-ember text-ivory"
                    : "border-line-strong bg-ivory text-walnut hover:bg-walnut/5"
                }`}
              >
                {allergen}
              </button>
            );
          })}
        </div>

        <label className="mt-3 block">
          <span className="sr-only">Other allergy or dietary note</span>
          <input
            id="reserve-allergy-other"
            type="text"
            value={allergyOther}
            onChange={(event) => setAllergyOther(event.target.value)}
            placeholder="Anything else the kitchen should avoid"
            className={FIELD}
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-walnut">Notes for the room</span>
          <textarea
            id="reserve-notes"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="High chair, tables pushed together, arriving late…"
            className={FIELD}
          />
        </label>
      </fieldset>

      {/* Opaque, not frosted: at 95% the labels scrolling underneath stay
          readable through the bar, which looks like a smudge rather than a
          frost. The shadow carries the separation instead. */}
      <div className="sticky bottom-0 -mx-5 mt-7 border-t border-line bg-ivory px-5 pb-5 pt-4 shadow-[0_-18px_26px_-20px_rgba(42,27,18,0.45)] md:-mx-6 md:px-6">
        <p className="text-sm text-walnut-soft">{summary}</p>
        <button
          type="submit"
          className="mt-3 w-full rounded-full bg-ember px-5 py-3.5 text-base font-semibold text-ivory shadow-[0_16px_36px_-16px_rgba(180,83,9,0.8)] transition-colors hover:bg-ember-deep motion-reduce:transition-none"
        >
          Review request
        </button>
        <p className="mt-2.5 text-xs leading-relaxed text-walnut-soft">
          The map is the room as we expect it, not a live diary — nothing is held until the venue
          confirms.
        </p>
      </div>
    </form>
  );
}
