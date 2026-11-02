"use client";

import type { ReactNode } from "react";
import { useReservation } from "./ReservationProvider";

/**
 * Every Reserve control on the page opens the same slide-over, so the styling
 * stays with the section around it and only the click is shared.
 */
export default function ReserveButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { show } = useReservation();
  return (
    <button type="button" onClick={show} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}
