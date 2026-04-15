import { cn } from "@/lib/cn";

type SectionCardProps = {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionCard({
  title,
  description,
  className,
  children,
}: SectionCardProps) {
  return (
    <section className={cn("surface-card panel-hover stagger-in p-6", className)}>
      {(title || description) && (
        <header className="mb-5 flex flex-col gap-2">
          {title ? (
            <h2 className="text-[1.7rem] font-semibold tracking-[-0.045em]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-ink-soft">
              {description}
            </p>
          ) : null}
        </header>
      )}

      {children}
    </section>
  );
}
