"use client";

import { useState } from "react";

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
  const [value, setValue] = useState(config.value);
  const [status, setStatus] = useState<"Aktif" | "Tertunda">(config.status);
  const [summary, setSummary] = useState(config.summary);
  const [impact, setImpact] = useState(config.impact);
  const [saved, setSaved] = useState(false);

  return (
    <section className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
      <SectionCard className="min-h-[520px] overflow-hidden xl:max-h-[calc(100vh-9rem)]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-[1.7rem] font-semibold tracking-[-0.045em]">Konfigurasi</h2>
            <StatusBadge tone={configTone(status)}>{status}</StatusBadge>
          </div>

          <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto pr-1">
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
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "border-foreground bg-foreground text-white"
                          : "border-stroke bg-[#f7f8f4] text-foreground hover:border-foreground/16"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="soft-label" htmlFor="config-value">
                Nilai
              </label>
              <input
                id="config-value"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="mt-3 w-full rounded-[24px] border border-stroke bg-[#f7f8f4] px-5 py-4 text-[15px] leading-7 outline-none transition focus:border-foreground/25"
              />
            </div>

            <div>
              <label className="soft-label" htmlFor="config-summary">
                Aturan
              </label>
              <textarea
                id="config-summary"
                rows={4}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                className="mt-3 w-full resize-none rounded-[24px] border border-stroke bg-[#f7f8f4] px-5 py-4 text-[15px] leading-7 outline-none transition focus:border-foreground/25"
              />
            </div>

            <div>
              <label className="soft-label" htmlFor="config-impact">
                Dampak
              </label>
              <textarea
                id="config-impact"
                rows={4}
                value={impact}
                onChange={(event) => setImpact(event.target.value)}
                className="mt-3 w-full resize-none rounded-[24px] border border-stroke bg-[#f7f8f4] px-5 py-4 text-[15px] leading-7 outline-none transition focus:border-foreground/25"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-ink-soft">
                {saved
                  ? "Perubahan disimpan di mock state halaman ini."
                  : "Ubah konfigurasi lalu simpan."}
              </span>
              <button
                type="button"
                onClick={() => setSaved(true)}
                className="button-primary min-w-[160px]"
              >
                Simpan perubahan
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="min-h-[520px] overflow-hidden xl:max-h-[calc(100vh-9rem)]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-[1.7rem] font-semibold tracking-[-0.045em]">Pratinjau</h2>
            <StatusBadge tone="monitor">{config.group}</StatusBadge>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
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
        </div>
      </SectionCard>
    </section>
  );
}
