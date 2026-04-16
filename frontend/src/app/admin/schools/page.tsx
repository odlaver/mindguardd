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
        <StatusBadge tone="monitor">
          {adminSchools.length} sekolah | {adminClasses.length} kelas
        </StatusBadge>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.94fr_1.06fr]">
        <SectionCard title="Data sekolah" className="h-full">
          <div className="grid gap-3">
            {adminSchools.map((school) => (
              <Link
                key={school.id}
                href={`/admin/schools/${school.id}`}
                className="panel-hover flex items-center justify-between rounded-[26px] border border-stroke bg-white p-5"
              >
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">{school.name}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">
                    {school.studentCount} siswa | {school.counselorCount} guru BK
                  </p>
                </div>
                <span className="text-xl leading-none text-foreground">-&gt;</span>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Data kelas" className="h-full">
          <div className="grid gap-3">
            {adminClasses.map((item) => (
              <Link
                key={item.id}
                href={`/admin/schools/classes/${item.id}`}
                className="panel-hover grid gap-3 rounded-[26px] border border-stroke bg-white p-5 md:grid-cols-[0.9fr_0.55fr_0.45fr]"
              >
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">{item.className}</h2>
                  <p className="mt-2 text-sm text-ink-soft">{item.schoolName}</p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#eef5ef]">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{ width: item.completion }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge tone={classTone(item.riskBand)}>{item.riskBand}</StatusBadge>
                  <span className="text-xl leading-none text-foreground">-&gt;</span>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>
      </section>
    </>
  );
}
