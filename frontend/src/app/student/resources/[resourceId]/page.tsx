import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionCard } from "@/components/ui/section-card";
import { resources } from "@/lib/mock-data";

type ResourceDetailPageProps = {
  params: Promise<{
    resourceId: string;
  }>;
};

export default async function ResourceDetailPage({
  params,
}: ResourceDetailPageProps) {
  const { resourceId } = await params;
  const resource = resources.find((item) => item.id === resourceId);

  if (!resource) {
    notFound();
  }

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
        <div>
          <p className="soft-label">{resource.category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {resource.title}
          </h1>
        </div>
        <Link href="/student/resources" className="button-secondary">
          Kembali
        </Link>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <SectionCard title="Ringkasan">
          <p className="text-base leading-8 text-ink-soft">{resource.summary}</p>

          <div className="mt-8 grid gap-3">
            {resource.points.map((point, index) => (
              <div
                key={point}
                className="rounded-[24px] border border-stroke bg-white px-5 py-5"
              >
                <p className="soft-label">Poin {index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-foreground/88">{point}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Info cepat">
          <div className="grid gap-3">
            <div className="rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
              <p className="soft-label">Kategori</p>
              <p className="mt-3 text-lg font-semibold">{resource.category}</p>
            </div>
            <div className="rounded-[22px] border border-stroke bg-[#f7f8f4] px-4 py-4">
              <p className="soft-label">Durasi baca</p>
              <p className="mt-3 text-lg font-semibold">{resource.readTime}</p>
            </div>
            <div className="rounded-[22px] border border-stroke bg-foreground px-5 py-5 text-white">
              <p className="soft-label text-white/64">Saran</p>
              <p className="mt-3 text-lg font-semibold">
                Baca perlahan lalu ambil satu poin yang paling mungkin dipakai hari ini.
              </p>
            </div>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
