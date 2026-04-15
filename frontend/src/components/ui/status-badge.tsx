import { cn } from "@/lib/cn";

const tones = {
  aman: "bg-safe/18 text-safe",
  monitor: "bg-secondary/18 text-foreground",
  warning: "bg-warning/22 text-foreground",
  danger: "bg-danger/18 text-danger",
  neutral: "bg-foreground/8 text-foreground",
};

type Tone = keyof typeof tones;

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: Tone;
};

export function StatusBadge({
  children,
  tone = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
