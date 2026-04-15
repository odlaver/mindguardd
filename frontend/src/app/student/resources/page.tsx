import Link from "next/link";

import { resources } from "@/lib/mock-data";

export default function StudentResourcesPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">Materi Edukasi</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Pilih materi yang ingin kamu buka.
          </h1>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <Link
            key={resource.id}
            href={`/student/resources/${resource.id}`}
            className={`surface-card-strong panel-hover stagger-in flex min-h-[260px] flex-col gap-6 p-6 ${
              index === 1 ? "bg-[#f5f8f1]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-fit rounded-full bg-secondary/16 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                {resource.category}
              </div>
              <span className="text-sm font-medium text-ink-soft">
                {resource.readTime}
              </span>
            </div>
            <h2 className="text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.05em]">
              {resource.title}
            </h2>
            <p className="text-sm leading-7 text-ink-soft">{resource.summary}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="inline-flex w-fit items-center rounded-[18px] bg-foreground px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                Buka detail
              </span>
              <span className="text-lg font-semibold text-foreground/70">-&gt;</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
