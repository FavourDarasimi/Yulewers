"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import ReservationPanel from "./ReservationPanel";

type ReservationApi = {
  open: boolean;
  show: () => void;
  hide: () => void;
};

const ReservationContext = createContext<ReservationApi | null>(null);

export function useReservation(): ReservationApi {
  const value = useContext(ReservationContext);
  if (!value) {
    throw new Error("useReservation must be used inside <ReservationProvider>");
  }
  return value;
}

/**
 * One panel for the whole page, so the header pill, the hero call to action and
 * the footer all open the same form with the same half-filled answers. Rendered
 * around the page and the footer because both carry a Reserve button; the
 * children stay Server Components — only the open flag lives here.
 */
export default function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo<ReservationApi>(
    () => ({
      open,
      show: () => setOpen(true),
      hide: () => setOpen(false),
    }),
    [open],
  );

  return (
    <ReservationContext.Provider value={value}>
      {children}
      <ReservationPanel />
    </ReservationContext.Provider>
  );
}
