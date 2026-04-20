"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { AdminSystemConfig } from "@/lib/mock-data";

import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

type SystemConfigEditorProps = {
  config: AdminSystemConfig;
};

function configTone(status: "Aktif" | "Tertunda") {
  return status === "Aktif" ? "aman" : "warning";
}

export function SystemConfigEditor({ config }: SystemConfigEditorProps) {
  const router = useRouter();
  const [value, setValue] = useState(config.value);
  const [status, setStatus] = useState<"Aktif" | "Tertunda">(config.status);
  const [summary, setSummary] = useState(config.summary);
  const [impact, setImpact] = useState(config.impact);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
      <SectionCard className="p-5 sm:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[1.7rem] font-semibold tracking-[-0.045em]">Konfigurasi</h2>
            <StatusBadge tone={configTone(status)}>{status}</StatusBadge>
          </div>

          <div>
            <p className="soft-label">Status</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["Aktif", "Tertunda"] as const).map((item) => {
                const active = status === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStatus(item)}
                    className={`choice-chip ${
                      active
                        ? "choice-chip-active"
                        : "border-stroke bg-white text-foreground hover:border-foreground/16"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-stroke bg-white p-5">
              <label className="soft-label" htmlFor="config-value">
                Nilai
              </label>
              <input
                id="config-value"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="field-control mt-3"
              />
            </div>

            <div className="rounded-[24px] border border-stroke bg-white p-5">
              <label className="soft-label" htmlFor="config-summary">
                Aturan
              </label>
              <textarea
                id="config-summary"
                rows={4}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                className="field-control mt-3 resize-none"
              />
            </div>

            <div className="rounded-[24px] border border-stroke bg-white p-5">
              <label className="soft-label" htmlFor="config-impact">
                Dampak
              </label>
              <textarea
                id="config-impact"
                rows={4}
                value={impact}
                onChange={(event) => setImpact(event.target.value)}
                className="field-control mt-3 resize-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-stroke bg-[#f7f8f4] px-4 py-4">
            <div className="text-sm text-ink-soft">
              <span>{saved ? "Perubahan tersimpan." : "Simpan perubahan."}</span>
              {error ? <p className="mt-1 font-medium text-danger">{error}</p> : null}
            </div>
            <button
              type="button"
              onClick={async () => {
                setSaving(true);
                setError(null);

                const response = await fetch(`/api/admin/system-configs/${config.id}`, {
                  body: JSON.stringify({
                    impact,
                    status,
                    summary,
                    value,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "PATCH",
                });
                const payload = (await response.json().catch(() => null)) as
                  | { error?: string }
                  | null;

                if (!response.ok) {
                  setError(payload?.error ?? "Perubahan belum bisa disimpan.");
                  setSaving(false);
                  return;
                }

                setSaved(true);
                setSaving(false);
                router.refresh();
              }}
              className="button-primary min-w-[160px] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving}
            >
              {saving ? "Menyimpan..." : "Simpan perubahan"}
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[1.7rem] font-semibold tracking-[-0.045em]">Pratinjau</h2>
            <StatusBadge tone="monitor">{config.group}</StatusBadge>
          </div>

          <div className="rounded-[24px] border border-stroke bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="soft-label">{config.group}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  {config.name}
                </h2>
              </div>
              <StatusBadge tone={configTone(status)}>{status}</StatusBadge>
            </div>
          </div>

          <div className="rounded-[24px] border border-stroke bg-white p-5">
            <p className="soft-label">Nilai aktif</p>
            <p className="mt-3 text-lg font-semibold">{value}</p>
          </div>

          <div className="rounded-[24px] border border-stroke bg-white p-5">
            <p className="soft-label">Aturan</p>
            <p className="mt-3 text-base leading-8 text-ink-soft">{summary}</p>
          </div>

          <div className="rounded-[24px] border border-stroke bg-white p-5">
            <p className="soft-label">Dampak</p>
            <p className="mt-3 text-base leading-8 text-ink-soft">{impact}</p>
          </div>
        </div>
      </SectionCard>
    </section>
  );
}
