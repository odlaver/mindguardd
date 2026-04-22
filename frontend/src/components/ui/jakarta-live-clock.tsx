"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { formatJakartaDate, formatJakartaTime } from "@/lib/time";

type JakartaLiveClockProps = {
  className?: string;
  initialIso: string;
  label?: string;
};

export function JakartaLiveClock({
  className,
  initialIso,
  label = "Waktu Indonesia",
}: JakartaLiveClockProps) {
  const [now, setNow] = useState(() => new Date(initialIso));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className={cn("rounded-[24px] border border-stroke bg-white/82 px-4 py-3", className)}>
      <p className="soft-label">{label}</p>
      <p className="mt-3 text-lg font-semibold text-foreground">{formatJakartaDate(now)}</p>
      <p className="mt-1 text-sm font-semibold tracking-[0.16em] text-ink-soft">
        {formatJakartaTime(now, { withSeconds: true })} WIB
      </p>
    </div>
  );
}
