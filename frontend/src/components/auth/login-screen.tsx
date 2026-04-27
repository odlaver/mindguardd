"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";
import { getRoleHomePath } from "@/lib/role-home-path";

const rolePreviews = [
  {
    email: "nabila.rahma@mindguard.id",
    title: "Masuk sebagai Siswa",
    tone: "bg-[#89C389]/18 hover:bg-[#89C389]/30",
  },
  {
    email: "maya.bk@mindguard.id",
    title: "Masuk sebagai Guru BK",
    tone: "bg-[#7EBCE1]/18 hover:bg-[#7EBCE1]/30",
  },
  {
    email: "admin@mindguard.id",
    title: "Masuk sebagai Admin",
    tone: "bg-[#EFC77A]/22 hover:bg-[#EFC77A]/40",
  },
];

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="flex min-h-screen w-full items-center justify-center p-6 lg:p-12">
      {/* Main Container mirroring the split Frame 1 & Frame 2 design */}
      <div className="flex w-full max-w-[1340px] flex-col lg:flex-row items-center justify-center gap-[33px]">
        
        {/* Frame 1: Logo */}
        <div className="flex h-auto lg:h-[584px] w-full lg:w-[500px] items-center justify-center rounded-[40px] shadow-[0px_4px_100px_rgba(0,0,0,0.15)] stagger-in" style={{
          background: 'linear-gradient(224.34deg, #F4F8FB 1.09%, #FFFFFF 49.57%, #F4F8FB 100%)'
        }}>
          <div className="relative h-[300px] w-[300px] lg:h-[479px] lg:w-[410px]">
            <Image
              src="/logo.png"
              alt="MindGuard Logo"
              fill
              className="object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>

        {/* Frame 2: Login Form */}
        <div className="flex h-auto lg:h-[584px] w-full lg:w-[839px] flex-col p-8 lg:p-14 rounded-[40px] shadow-[0px_4px_100px_rgba(0,0,0,0.15)] stagger-in" style={{
          background: 'linear-gradient(224.34deg, #F4F8FB 1.09%, #FFFFFF 49.57%, #F4F8FB 100%)',
          animationDelay: '100ms'
        }}>
          
          <div className="flex flex-col gap-10">
            {/* Header section matching Figma title blocks */}
            <div className="flex flex-col">
              <p className="font-semibold uppercase tracking-[2.42px] text-[11px] text-[#65766F] leading-[16px]">
                Autentikasi
              </p>
              <h2 className="mt-2 text-[30px] font-semibold leading-[36px] text-foreground">
                Login pengguna
              </h2>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              
              {/* Email / NIS Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="emailInput" className="text-[14px] font-semibold leading-[20px] text-foreground">
                  Email atau NIS
                </label>
                <input
                  id="emailInput"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-[58px] rounded-[22px] border border-[rgba(32,51,45,0.1)] bg-white px-[17px] text-[16px] text-[#757575] focus:outline-none focus:ring-4 focus:ring-foreground/10 transition-all"
                  placeholder="nama@sekolah.sch.id"
                  type="email"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="passwordInput" className="text-[14px] font-semibold leading-[20px] text-foreground">
                  Password
                </label>
                <input
                  id="passwordInput"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-[58px] rounded-[22px] border border-[rgba(32,51,45,0.1)] bg-white px-[17px] text-[16px] text-[#757575] focus:outline-none focus:ring-4 focus:ring-foreground/10 transition-all"
                  placeholder="********"
                />
              </div>

              {error ? (
                <p className="text-sm font-medium text-danger">{error}</p>
              ) : null}

              {/* Sign in Button */}
              <button
                type="submit"
                disabled={isPending}
                className="mt-2 flex h-[48px] w-full items-center justify-center rounded-[18px] bg-foreground text-[16px] text-white transition-transform duration-200 hover:scale-[1.01] hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Memproses..." : "Sign in"}
              </button>
            </form>

            {/* Quick Demo Options (matching Figma Options row) */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-[10px]">
              {rolePreviews.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setEmail(item.email);
                    setPassword("Mindguard123!");
                    setError(null);
                  }}
                  className={`flex h-[40px] items-center justify-center rounded-[24px] px-5 py-2 text-[15px] font-semibold text-foreground transition-all duration-200 ease-in-out hover:-translate-y-0.5 ${item.tone}`}
                >
                  {item.title}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
