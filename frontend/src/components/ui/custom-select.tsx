"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

type SelectOption = {
  description?: string;
  label: string;
};

type CustomSelectProps = {
  icon?: React.ReactNode;
  label: string;
  options: SelectOption[];
};

export function CustomSelect({
  icon,
  label,
  options,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative space-y-2">
      <span className="text-sm font-semibold">{label}</span>

      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "group relative flex w-full items-center gap-4 overflow-hidden rounded-[24px] border bg-white px-4 py-4 text-left shadow-[0_12px_28px_rgba(32,51,45,0.05)] transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/10",
          open
            ? "border-foreground/20 shadow-[0_18px_34px_rgba(32,51,45,0.08)]"
            : "border-stroke hover:-translate-y-0.5 hover:border-foreground/14",
        )}
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[#f4f7f3] text-foreground/72 transition-all duration-300 ease-in-out group-hover:bg-[#edf3ee] group-hover:text-foreground">
          {icon}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-foreground">
            {selected.label}
          </span>
          {selected.description ? (
            <span className="mt-0.5 block truncate text-sm text-ink-soft">
              {selected.description}
            </span>
          ) : null}
        </span>

        <span
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-foreground text-white transition duration-300",
            "transition-all duration-300 ease-in-out",
            open ? "rotate-180" : "",
          )}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open ? (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-[24px] border border-stroke bg-white p-2 shadow-[0_22px_46px_rgba(32,51,45,0.14)]">
          <div role="listbox" className="grid gap-1">
            {options.map((option) => {
              const active = option.label === selected.label;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => {
                    setSelected(option);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-[18px] px-4 py-3 text-left transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/10",
                    active
                      ? "bg-foreground text-white"
                      : "bg-white text-foreground hover:bg-[#f5f7f4]",
                  )}
                >
                  <span className="block text-sm font-semibold">
                    {option.label}
                  </span>
                  {option.description ? (
                    <span
                      className={cn(
                        "mt-1 block text-sm",
                        active ? "text-white/70" : "text-ink-soft",
                      )}
                    >
                      {option.description}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
