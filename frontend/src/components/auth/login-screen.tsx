import Link from "next/link";

const rolePreviews = [
  {
    href: "/student",
    title: "Masuk sebagai Siswa",
    description: "Masuk ke Daily Mood Tracker sebagai halaman pertama.",
    tone: "bg-primary/18",
  },
  {
    href: "/counselor",
    title: "Masuk sebagai Guru BK",
    description: "Masuk ke Dashboard Monitoring untuk review kasus.",
    tone: "bg-secondary/18",
  },
  {
    href: "/admin",
    title: "Masuk sebagai Admin",
    description: "Masuk ke overview operasional dan konfigurasi sistem.",
    tone: "bg-warning/22",
  },
];

export function LoginScreen() {
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
              <Link
                key={item.href}
                href={item.href}
                className={`${item.tone} panel-hover rounded-[24px] p-4`}
              >
                <p className="text-base font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-foreground/75">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="surface-card panel-hover stagger-in p-8">
          <div className="mx-auto max-w-xl">
            <div className="space-y-2">
              <p className="soft-label">Autentikasi</p>
              <h2 className="text-3xl font-semibold">Login pengguna</h2>
            </div>

            <form className="mt-8 space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-semibold">Email atau NIS</span>
                <input
                  className="w-full rounded-[22px] border border-stroke bg-white px-4 py-4 outline-none transition focus:border-foreground/25"
                  placeholder="nama@sekolah.sch.id"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold">Password</span>
                <input
                  type="password"
                  className="w-full rounded-[22px] border border-stroke bg-white px-4 py-4 outline-none transition focus:border-foreground/25"
                  placeholder="********"
                />
              </label>
              <button type="button" className="button-primary w-full">
                Sign in
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
