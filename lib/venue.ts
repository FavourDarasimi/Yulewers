const VENUE_TIME_ZONE = "Africa/Lagos";

export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type DayWindow = { open: string; close: string } | { closed: true };

export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "whatsapp";
};

export const venue = {
  name: "Yulewers",
  neighbourhood: "Lekki",
  phone: { display: "+234 800 000 0000", e164: "+2348000000000" },
  dinnerServiceFrom: "7:00pm",
  // PLACEHOLDER. The district is confirmed; the door number is not, so the
  // footer renders only the lines that have a value.
  address: { street: "", area: "Lekki Phase 1", city: "Lagos" },
  // PLACEHOLDER handles derived from the brand name. Confirm before launch.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/yulewers/", icon: "instagram" },
    { label: "WhatsApp", href: "https://wa.me/2348000000000", icon: "whatsapp" },
  ] satisfies SocialLink[],
};

export const hours: Record<Weekday, DayWindow> = {
  Mon: { closed: true },
  Tue: { open: "5:00pm", close: "10:00pm" },
  Wed: { open: "5:00pm", close: "10:00pm" },
  Thu: { open: "5:00pm", close: "11:00pm" },
  Fri: { open: "5:00pm", close: "11:30pm" },
  Sat: { open: "4:00pm", close: "11:30pm" },
  Sun: { open: "4:00pm", close: "9:00pm" },
};

const weekdayLabel = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  timeZone: VENUE_TIME_ZONE,
});

const weekdayNames: Record<Weekday, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export function todayKey(now: Date = new Date()): Weekday {
  return weekdayLabel.format(now) as Weekday;
}

export function tonight(now: Date = new Date()): {
  weekday: string;
  window: DayWindow;
} {
  const label = todayKey(now);
  return { weekday: weekdayNames[label], window: hours[label] };
}

export function windowText(window: DayWindow): string {
  return "closed" in window ? "Closed" : `${window.open} – ${window.close}`;
}
