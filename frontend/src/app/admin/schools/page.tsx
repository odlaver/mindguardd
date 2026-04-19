import Link from "next/link";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminClasses, adminSchools } from "@/lib/mock-data";

function classTone(riskBand: "Stabil" | "Monitor" | "Perlu perhatian") {
  if (riskBand === "Stabil") {
    return "aman";
  }

  if (riskBand === "Monitor") {
    return "warning";
  }

  return "danger";
}

function completionTone(completion: string) {
  const score = Number.parseInt(completion, 10);

  if (score >= 85) {
    return "aman";
  }

  if (score >= 80) {
    return "warning";
  }

  return "danger";
}

export default function AdminSchoolsPage() {
  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Mengelola Data Kelas/Sekolah</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            Data kelas dan sekolah.
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="monitor">{adminSchools.length} sekolah</StatusBadge>
          <StatusBadge tone="neutral">{adminClasses.length} kelas</StatusBadge>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.96fr_1.04fr]">
        <SectionCard title="Data sekolah" className="h-full p-5 sm:p-6">
          <div className="grid gap-3">
            {adminSchools.map((school) => (
              <Link
                key={school.id}
                href={`/admin/schools/${school.id}`}
                className="panel-hover rounded-[24px] border border-stroke bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold tracking-[-0.03em]">{school.name}</h2>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      {school.studentCount} siswa | {school.counselorCount} guru BK
                    </p>
                  </div>
                  <StatusBadge tone={completionTone(school.completion)}>
                    {school.completion}
                  </StatusBadge>
                </div>

                <div className="mt-4 rounded-[20px] border border-stroke bg-[#f7f8f4] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="soft-label">Progress check-in</p>
                    <span className="text-sm font-semibold text-foreground/72">
                      {school.classCount} kelas
                    </span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#eef5ef]">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{ width: school.completion }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-end">
                  <span className="text-sm font-semibold text-foreground">Detail</span>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Data kelas" className="h-full p-5 sm:p-6">
          <div className="grid gap-3">
            {adminClasses.map((item) => (
              <Link
                key={item.id}
                href={`/admin/schools/classes/${item.id}`}
                className="panel-hover rounded-[24px] border border-stroke bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge tone={classTone(item.riskBand)}>{item.riskBand}</StatusBadge>
                      <StatusBadge tone="monitor">{item.studentCount} siswa</StatusBadge>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                      {item.className}
                    </h2>
                    <p className="mt-2 text-sm text-ink-soft">{item.schoolName}</p>
                  </div>
                  <StatusBadge tone={completionTone(item.completion)}>{item.completion}</StatusBadge>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-stroke bg-[#f7f8f4] px-4 py-4">
                    <p className="soft-label">Wali kelas</p>
                    <p className="mt-3 text-base font-semibold">{item.homeroom}</p>
                  </div>
                  <div className="rounded-[20px] border border-stroke bg-[#f7f8f4] px-4 py-4">
                    <p className="soft-label">Guru BK</p>
                    <p className="mt-3 text-base font-semibold">{item.counselor}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-[20px] border border-stroke bg-[#f7f8f4] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="soft-label">Progress check-in</p>
                    <span className="text-sm font-semibold text-foreground/72">
                      {item.completion}
                    </span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#eef5ef]">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{ width: item.completion }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
