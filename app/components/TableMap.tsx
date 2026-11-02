"use client";

import type { Floor, Table } from "@/lib/tables";
import { statusText, tables, totalSeats } from "@/lib/tables";

type Props = {
  /** Empty until the panel knows what night it is looking at. */
  date: string;
  slot: string;
  floor: Floor;
  selectedId: string | undefined;
  onSelect: (table: Table) => void;
  /** So a failed submit can focus the group rather than shout into a void. */
  fieldsetId?: string;
  errorId?: string;
};

const RING =
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-walnut";

/** The radius carries the shape: a couple's round, a four-top, the long bench. */
function shapeRadius(shape: Table["shape"]): string {
  if (shape === "round") return "rounded-[1.6rem]";
  return shape === "bench" ? "rounded-md" : "rounded-lg";
}

function cellTone(status: Floor["statuses"][string], selected: boolean): string {
  if (selected) {
    return `cursor-pointer border-ember bg-ember text-ivory shadow-[0_10px_22px_-12px_rgba(180,83,9,0.85)] ${RING}`;
  }
  if (status === "free") {
    return `cursor-pointer border-line-strong bg-ivory text-walnut transition-colors hover:border-ember hover:bg-ember/5 motion-reduce:transition-none ${RING}`;
  }
  if (status === "out-of-service") {
    return "border-dashed border-line-strong/60 bg-[repeating-linear-gradient(45deg,rgba(74,49,34,0.14)_0_4px,transparent_4px_10px)] text-walnut/45 cursor-not-allowed";
  }
  return "border-line-strong/60 bg-walnut/10 text-walnut/45 cursor-not-allowed";
}

/**
 * The floor as the About section describes it, drawn to scale of the room's own
 * grid: window along the top, the grill down the right, the door at the bottom.
 * A radio per table, because that is the semantics — one table per booking —
 * and a disabled radio is genuinely unclickable and unfocusable rather than a
 * link with `onClick` that returns early.
 */
export default function TableMap({
  date,
  slot,
  floor,
  selectedId,
  onSelect,
  fieldsetId,
  errorId,
}: Props) {
  return (
    <fieldset id={fieldsetId} tabIndex={-1} aria-describedby={errorId} className="min-w-0">
      <legend className="text-eyebrow font-semibold uppercase text-ember-ink">
        {date && slot ? `The floor · ${slot}` : "The floor"}
      </legend>
      <p className="mt-1 text-sm text-walnut-soft">
        Twelve tables, {totalSeats} covers. Tap the one you want.
      </p>

      <div className="relative mt-4 rounded-2xl border border-line-strong/50 bg-ivory-raised pl-3 pt-7 pr-8 pb-8">
        <span
          aria-hidden
          className="absolute left-1/2 top-2.5 -translate-x-1/2 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-walnut-soft"
        >
          Window
        </span>
        <span
          aria-hidden
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-walnut-soft [writing-mode:vertical-rl]"
        >
          Charcoal grill
        </span>
        <span
          aria-hidden
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-walnut-soft"
        >
          Door
        </span>

        <div
          className="grid grid-cols-4 gap-2"
          style={{ gridTemplateRows: "repeat(4, minmax(0, 1fr))" }}
        >
          {tables.map((table) => {
            const status = floor.statuses[table.id];
            const selected = status === "free" && table.id === selectedId;
            return (
              <label
                key={table.id}
                className="relative block"
                style={{
                  gridRow: table.at.row,
                  gridColumn: `${table.at.col} / ${table.at.col + (table.at.span ?? 1)}`,
                }}
              >
                <input
                  type="radio"
                  name="table"
                  value={table.id}
                  checked={selected}
                  disabled={status !== "free"}
                  onChange={() => onSelect(table)}
                  className="peer sr-only"
                />
                <span className="sr-only">
                  {`Table ${table.label}, ${table.seats} ${
                    table.seats === 1 ? "seat" : "seats"
                  }, ${table.where}. ${statusText(status)}.`}
                </span>
                <span
                  aria-hidden
                  className={`flex h-full min-h-[3.75rem] flex-col items-center justify-center gap-0.5 border ${shapeRadius(
                    table.shape,
                  )} ${cellTone(status, selected)}`}
                >
                  <span
                    className={`font-display leading-none ${
                      table.shape === "bench" ? "text-lg" : "text-base"
                    } ${table.shape === "round" ? "italic" : ""}`}
                  >
                    {table.label}
                  </span>
                  <span className="text-[0.625rem] font-medium uppercase tracking-[0.08em]">
                    {table.seats} seats
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.6875rem] text-walnut-soft">
        {[
          { label: "Free", swatch: "border-line-strong bg-ivory" },
          { label: "Taken", swatch: "border-line-strong/60 bg-walnut/20" },
          {
            label: "Out of service",
            swatch:
              "border-dashed border-line-strong/60 bg-[repeating-linear-gradient(45deg,rgba(74,49,34,0.2)_0_3px,transparent_3px_7px)]",
          },
        ].map((entry) => (
          <li key={entry.label} className="flex items-center gap-1.5">
            <span aria-hidden className={`size-3 rounded-[3px] border ${entry.swatch}`} />
            {entry.label}
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
