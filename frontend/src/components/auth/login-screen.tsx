"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { getRoleHomePath } from "@/lib/role-home-path";

const rolePreviews = [
  {
    email: "nabila.rahma@mindguard.id",
    title: "Masuk sebagai Siswa",
    description: "Akun demo siswa untuk Daily Mood Tracker.",
    tone: "bg-primary/18",
  },
  {
    email: "maya.bk@mindguard.id",
    title: "Masuk sebagai Guru BK",
    description: "Akun demo Guru BK untuk review kasus.",
    tone: "bg-secondary/18",
  },
  {
    email: "admin@mindguard.id",
    title: "Masuk sebagai Admin",
    description: "Akun demo admin untuk operasional dan konfigurasi sistem.",
    tone: "bg-warning/22",
  },
];

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState(rolePreviews[0].email);
  const [password, setPassword] = useState("Mindguard123!");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const result = await authClient.signIn.email({
      email: email.trim(),
      password,
      rememberMe: true,
    });

    if (result.error) {
      setError("Email atau password tidak cocok.");
      setIsPending(false);
      return;
    }

    await fetch("/api/session/track", {
      method: "POST",
    });

    const sessionResult = await authClient.getSession();
    const role = sessionResult.data?.user.role;

    startTransition(() => {
      router.replace(getRoleHomePath(role));
      router.refresh();
    });
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1180px] items-center px-4 py-6 lg:px-6">
      <div className="grid w-full gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="page-hero stagger-in flex flex-col justify-between gap-8 overflow-hidden p-8">
          <div>
            <p className="soft-label">MindGuard</p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.06em]">
              Masuk ke ruang kerja.
            </h1>
          </div>

          <div className="grid gap-3">
            {rolePreviews.map((item) => (
              <button
                key={item.email}
                type="button"
                onClick={() => {
                  setEmail(item.email);
                  setError(null);
                }}
                className={`${item.tone} panel-hover rounded-[24px] p-4`}
              >
                <p className="text-base font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-foreground/75">
                  {item.description}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
                  {item.email}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="surface-card panel-hover stagger-in p-8">
          <div className="mx-auto max-w-xl">
            <div className="space-y-2">
              <p className="soft-label">Autentikasi</p>
              <h2 className="text-3xl font-semibold">Login pengguna</h2>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="block space-y-2">
                <span className="text-sm font-semibold">Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="field-control bg-white px-4"
                  placeholder="nama@sekolah.sch.id"
                  type="email"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="field-control bg-white px-4"
                  placeholder="********"
                />
              </label>
              {error ? (
                <p className="text-sm font-medium text-danger">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={isPending}
                className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Memproses..." : "Sign in"}
              </button>
              <p className="text-sm leading-6 text-ink-soft">
                Password demo untuk semua akun: <span className="font-semibold">Mindguard123!</span>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
