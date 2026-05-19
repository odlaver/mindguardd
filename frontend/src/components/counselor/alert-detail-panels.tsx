"use client";

import { useState } from "react";
import Link from "next/link";

import type { MoodPoint } from "@/lib/types";

import { MoodTrack, MoodTrackActiveCard } from "@/components/counselor/mood-track";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionCard } from "@/components/ui/section-card";

type AlertDetailPanelsProps = {
  history: MoodPoint[];
  recommendation: string;
  detailHref: string;
};

export function AlertDetailPanels({
  history,
  recommendation,
  detailHref,
}: AlertDetailPanelsProps) {
  const recentHistory = history.slice(-7);
  const [activeIndex, setActiveIndex] = useState(recentHistory.length - 1);

  return (
    <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
      <SectionCard title="Tren Mood" className="p-5 sm:p-6">
        {recentHistory.length ? (
          <MoodTrack
            history={recentHistory}
            title="Track mood terkait alert"
            showActiveCard={false}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />
        ) : (
          <EmptyState
            title="Belum ada tren"
            description="Riwayat mood siswa akan tampil setelah check-in harian tersedia."
          />
        )}

        <div className="mt-4 rounded-[28px] border border-stroke bg-[#f7f8f4] p-5">
          <p className="soft-label">Rekomendasi</p>
          <p className="mt-3 text-base leading-8 text-ink-soft">{recommendation}</p>
        </div>
      </SectionCard>

      <div className="grid gap-4">
        <SectionCard title="Konteks tindak lanjut" className="p-5 sm:p-6">
          {recentHistory.length ? (
            <MoodTrackActiveCard history={recentHistory} activeIndex={activeIndex} />
          ) : (
            <EmptyState
              title="Konteks belum tersedia"
              description="Buka detail siswa untuk melihat profil dan data lain yang sudah tersedia."
            />
          )}
          <div className="mt-4 grid gap-3">
            <Link
              href={detailHref}
              className="button-primary"
              style={{ WebkitTextFillColor: "#ffffff" }}
            >
              Detail siswa
            </Link>
          </div>
        </SectionCard>
      </div>
    </section>
  );
}
