import { hours, todayKey, type Weekday, venueTimeZone } from "@/lib/venue";

/**
 * The room as the About section describes it: twelve tables, one long bench
 * under the window. Seat counts, positions and the pulled table are all
 * PLACEHOLDER — the real floor plan has not been measured. Nothing here is
 * backed by a booking system; `tableStatus` below says what that means.
 */

export type TableShape = "round" | "square" | "bench";

export type Table = {
  id: string;
  label: string;
  seats: number;
  shape: TableShape;
  /** Where it sits, in words a guest would recognise when they walk in. */
  where: string;
  /** Position on the four-column floor grid the map renders. */
  at: { row: number; col: number; span?: number };
  /** Pulled from the floor whatever the night — never bookable. */
  outOfService?: boolean;
};

export const tables: Table[] = [
  { id: "t1", label: "1", seats: 2, shape: "round", where: "Window side", at: { row: 1, col: 1 } },
  { id: "t2", label: "2", seats: 2, shape: "round", where: "Window side", at: { row: 1, col: 2 } },
  {
    id: "bench",
    label: "Bench",
    seats: 8,
    shape: "bench",
    where: "The long bench",
    at: { row: 1, col: 3, span: 2 },
  },
  { id: "t4", label: "4", seats: 2, shape: "round", where: "Mid-room", at: { row: 2, col: 1 } },
  { id: "t5", label: "5", seats: 4, shape: "square", where: "Mid-room", at: { row: 2, col: 2 } },
  { id: "t6", label: "6", seats: 4, shape: "square", where: "Mid-room", at: { row: 2, col: 3 } },
  { id: "t7", label: "7", seats: 2, shape: "round", where: "By the grill", at: { row: 2, col: 4 } },
  {
    id: "t8",
    label: "8",
    seats: 6,
    shape: "square",
    where: "Back wall",
    at: { row: 3, col: 1, span: 2 },
  },
  { id: "t9", label: "9", seats: 4, shape: "square", where: "Back wall", at: { row: 3, col: 3 } },
  { id: "t10", label: "10", seats: 2, shape: "round", where: "By the grill", at: { row: 3, col: 4 } },
  {
    id: "t11",
    label: "11",
    seats: 6,
    shape: "square",
    where: "Near the door",
    at: { row: 4, col: 1, span: 2 },
  },
  {
    id: "t12",
    label: "12",
    seats: 4,
    shape: "square",
    where: "Quiet corner",
    at: { row: 4, col: 3 },
    outOfService: true,
  },
];

export const totalSeats = tables.reduce((sum, table) => sum + table.seats, 0);

export type TableStatus = "free" | "taken" | "out-of-service";


/** 30 minutes from the first table being laid to the last one seated. */
const SLOT_MINUTES = 30;
/** Kitchen and grill need this much of the tail of the night. */
const LAST_SEATING_BEFORE_CLOSE = 90;
/** A guest cannot ask for a table that is about to be sat. */
const MIN_LEAD_MINUTES = 30;

export function parseClock(value: string): number {
  const match = /^(\d{1,2}):(\d{2})(am|pm)$/i.exec(value.trim());
  if (!match) return 0;
  const hour = Number(match[1]) % 12;
  const minute = Number(match[2]);
  return (match[3].toLowerCase() === "pm" ? hour + 12 : hour) * 60 + minute;
}

export function formatClock(minutes: number): string {
  const suffix = minutes >= 720 ? "pm" : "am";
  const raw = Math.floor(minutes / 60);
  const hour = ((raw + 11) % 12) + 1;
  const minute = String(minutes % 60).padStart(2, "0");
  return `${hour}:${minute}${suffix}`;
}

const isoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: venueTimeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: venueTimeZone,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Lagos calendar date, so a booking never resolves to "yesterday" abroad. */
export function venueTodayISO(now: Date = new Date()): string {
  return isoFormatter.format(now);
}

function venueMinutesNow(now: Date): number {
  const [hour, minute] = clockFormatter.format(now).split(":").map(Number);
  return hour * 60 + minute;
}

/** Noon UTC, so the parsed date cannot slip a day at a timezone edge. */
export function dateOf(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

export function weekdayOf(iso: string): Weekday {
  return todayKey(dateOf(iso));
}

export function addDays(iso: string, days: number): string {
  const date = dateOf(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return isoFormatter.format(date);
}

/**
 * First table of the night to the last one seated, every 30 minutes, for the
 * whole service. Slots already sat at are dropped separately below.
 */
function serviceSlots(iso: string): string[] {
  if (!iso) return [];
  const window = hours[weekdayOf(iso)];
  if ("closed" in window) return [];
  const open = parseClock(window.open);
  const lastSeating = parseClock(window.close) - LAST_SEATING_BEFORE_CLOSE;
  const slots: string[] = [];
  for (let minutes = open; minutes <= lastSeating; minutes += SLOT_MINUTES) {
    slots.push(formatClock(minutes));
  }
  return slots;
}

/** The same list, minus times a guest tonight could no longer be sat at. */
export function slotsFor(iso: string, now: Date = new Date()): string[] {
  if (!iso) return [];
  const all = serviceSlots(iso);
  if (iso !== venueTodayISO(now)) return all;
  const cutoff = venueMinutesNow(now) + MIN_LEAD_MINUTES;
  return all.filter((slot) => parseClock(slot) >= cutoff);
}

export function nextOpenDate(iso: string, now: Date = new Date()): string {
  let candidate = iso;
  // Seven iterations is the worst case: a Monday walk-in, six nights ahead.
  for (let step = 0; step < 7 && slotsFor(candidate, now).length === 0; step += 1) {
    candidate = addDays(candidate, 1);
  }
  return candidate;
}

export function bookableDates(from: string, count = 21): string[] {
  return Array.from({ length: count }, (_, index) => addDays(from, index));
}

const longDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: venueTimeZone,
  weekday: "long",
  day: "numeric",
  month: "long",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: venueTimeZone,
  weekday: "short",
  day: "numeric",
  month: "short",
});

export function formatLongDate(iso: string): string {
  return iso ? longDateFormatter.format(dateOf(iso)) : "";
}

export function formatShortDate(iso: string): string {
  return iso ? shortDateFormatter.format(dateOf(iso)) : "";
}

/** "Today"/"Tomorrow" where it reads better than the date, otherwise nothing. */
export function relativeDayLabel(iso: string, today: string): string | null {
  if (!today || !iso) return null;
  if (iso === today) return "Today";
  if (iso === addDays(today, 1)) return "Tomorrow";
  return null;
}

export function tableById(id: string): Table | undefined {
  return tables.find((table) => table.id === id);
}

/** FNV-1a. Cheap, pure, and stable across a server and client render. */
function hashKey(value: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x010000193);
  }
  return hash >>> 0;
}

/**
 * The demand level for one moment: busier at the weekend, busier later in the
 * night, and bigger tables wanted first — the room has three six-plus seats,
 * so a party of six has fewer places to land than a couple does.
 */
function levelFor(date: string, table: Table, progress: number): number {
  const weekday = weekdayOf(date);
  let level = 0.16;
  if (weekday === "Fri" || weekday === "Sat") level += 0.18;
  else if (weekday === "Thu" || weekday === "Sun") level += 0.09;
  else if (weekday === "Tue" || weekday === "Wed") level += 0.02;
  level += 0.3 * progress;
  if (table.seats >= 6) level += 0.12;
  return Math.min(level, 0.72);
}

/**
 * How much a table is wanted for that moment. Most of it is fixed for the
 * night, so the floor fills in a coherent order as the evening runs on rather
 * than reshuffling every half hour, with a little per-slot play on top.
 * Positive means wanted enough to be gone.
 */
function tableDemand(date: string, slot: string, table: Table, progress: number): number {
  const nightly = hashKey(`${date}|${table.id}`) / 0xffffffff;
  const perSlot = hashKey(`${date}|${slot}|${table.id}`) / 0xffffffff;
  return levelFor(date, table, progress) - (0.85 * nightly + 0.15 * perSlot);
}

/**
 * PLACEHOLDER availability. There is no booking system to ask, so a table is
 * taken when its demand for the moment clears that moment's level, and the
 * most-wanted tables are taken first down to a floor of `MIN_FREE_TABLES`. A
 * late weekend seating therefore clears more of the room than an early Tuesday
 * one, and the map can never go entirely red — that floor is a demo guard, not
 * a policy. Nobody is seated from this function: a request is confirmed by the
 * venue over WhatsApp or the phone.
 */
export type Floor = {
  statuses: Record<string, TableStatus>;
  free: Table[];
  taken: Table[];
  largestFreeSeats: number;
};

const MIN_FREE_TABLES = 3;

export function floorFor(date: string, slot: string): Floor {
  const statuses: Record<string, TableStatus> = Object.fromEntries(
    tables.map((table) => [table.id, table.outOfService ? "out-of-service" : "free"]),
  );

  if (date && slot) {
    // How far into that night's service the slot sits, 0 at the first seating.
    const service = serviceSlots(date);
    const index = service.indexOf(slot);
    const progress = service.length > 1 && index >= 0 ? index / (service.length - 1) : 0;
    const bookable = tables.filter((table) => !table.outOfService);
    const allowedTaken = Math.max(0, bookable.length - MIN_FREE_TABLES);
    const demanded = bookable
      .map((table) => ({ table, demand: tableDemand(date, slot, table, progress) }))
      .sort((a, b) => b.demand - a.demand);

    for (const entry of demanded.slice(0, allowedTaken)) {
      if (entry.demand <= 0) break;
      statuses[entry.table.id] = "taken";
    }
  }

  const free = tables.filter((table) => statuses[table.id] === "free");
  const taken = tables.filter((table) => statuses[table.id] === "taken");
  return {
    statuses,
    free,
    taken,
    largestFreeSeats: free.reduce((max, table) => Math.max(max, table.seats), 0),
  };
}

export function statusText(status: TableStatus): string {
  if (status === "out-of-service") return "Out of service";
  return status === "taken" ? "Taken" : "Free";
}
