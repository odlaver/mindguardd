import Link from "next/link";

import { cn } from "@/lib/cn";

type EmptyStateProps = {
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  description: string;
  title: string;
};

export function EmptyState({
  actionHref,
  actionLabel,
  className,
  description,
  title,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-dashed border-stroke bg-[#f7f8f4] p-5 text-center",
        className,
      )}
    >
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-ink-soft">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-4 inline-flex rounded-full border border-stroke bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-foreground/16 hover:bg-foreground hover:text-white [-webkit-text-fill-color:currentColor] hover:[-webkit-text-fill-color:#ffffff]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
