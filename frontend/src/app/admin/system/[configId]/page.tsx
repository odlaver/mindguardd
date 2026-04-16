import Link from "next/link";
import { notFound } from "next/navigation";

import { SystemConfigEditor } from "@/components/admin/system-config-editor";
import { StatusBadge } from "@/components/ui/status-badge";
import { adminSystemConfigs } from "@/lib/mock-data";

type AdminSystemDetailPageProps = {
  params: Promise<{
    configId: string;
  }>;
};

function configTone(status: "Aktif" | "Tertunda") {
  return status === "Aktif" ? "aman" : "warning";
}

export default async function AdminSystemDetailPage({
  params,
}: AdminSystemDetailPageProps) {
  const { configId } = await params;
  const config = adminSystemConfigs.find((item) => item.id === configId);

  if (!config) {
    notFound();
  }

  return (
    <>
      <section className="page-hero stagger-in flex flex-col gap-4 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="soft-label">Mengkonfigurasi Sistem</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{config.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone="monitor">{config.group}</StatusBadge>
          <StatusBadge tone={configTone(config.status)}>{config.status}</StatusBadge>
          <Link href="/admin/system" className="button-secondary">
            Kembali
          </Link>
        </div>
      </section>

      <SystemConfigEditor config={config} />
    </>
  );
}
