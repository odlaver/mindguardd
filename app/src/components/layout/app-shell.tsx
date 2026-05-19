"use client";

import { startTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/cn";
import { JakartaLiveClock } from "@/components/ui/jakarta-live-clock";

export type NavItem = {
  href: string;
  label: string;
};

type AppShellProps = {
  accentClass: string;
  currentTimeIso: string;
  description?: string;
  navItems: NavItem[];
  roleLabel: string;
  title: string;
  children: React.ReactNode;
};

function isActive(pathname: string, href: string) {
  if (href === "/student" || href === "/counselor" || href === "/admin") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function AppShell({
  accentClass,
  currentTimeIso,
  description,
  navItems,
  roleLabel,
  title,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 lg:gap-6 px-4 py-4 lg:min-h-screen lg:flex-row lg:px-6">
      <aside className="sidebar-scroll surface-card-strong stagger-in flex w-full shrink-0 flex-col gap-4 lg:gap-6 overflow-hidden p-5 lg:p-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:w-[286px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="soft-label">MindGuard</p>
            <h1 className="mt-3 text-[2.05rem] font-semibold leading-[1.02] tracking-[-0.04em]">
              {title}
            </h1>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
              accentClass,
            )}
          >
            {roleLabel}
          </span>
        </div>

        {description ? (
          <p className="max-w-xs text-sm leading-7 text-ink-soft">
            {description}
          </p>
        ) : null}

        <JakartaLiveClock initialIso={currentTimeIso} />

        <nav className="flex flex-row lg:flex-col gap-2.5 overflow-x-auto pb-2 lg:pb-0 sidebar-scroll">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                data-active={active}
                className={cn(
                  "nav-link group shrink-0 whitespace-nowrap",
                  active
                    ? "border-foreground bg-foreground shadow-[0_14px_30px_rgba(56,63,69,0.14)]"
                    : "border-transparent bg-transparent hover:border-primary/40 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:shadow-[0_8px_24px_rgba(137,195,137,0.15)] hover:-translate-y-[2px]",
                )}
                style={
                  active
                    ? {
                        WebkitTextFillColor: "#ffffff",
                        color: "#ffffff",
                      }
                    : undefined
                }
              >
                <span
                  className={cn(
                    "relative z-10 transition duration-300",
                    active ? "text-white" : "text-[#383f45] group-hover:text-[#2c5234]",
                  )}
                  style={
                    active
                      ? {
                          WebkitTextFillColor: "#ffffff",
                          color: "#ffffff",
                        }
                      : undefined
                  }
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-2 lg:mt-auto">
          <button
            type="button"
            onClick={async () => {
              await authClient.signOut();
              startTransition(() => {
                router.replace("/");
                router.refresh();
              });
            }}
            className="w-full rounded-[22px] border border-stroke bg-transparent px-4 py-3 text-sm font-semibold text-foreground transition duration-200 hover:bg-danger/10 hover:text-danger hover:border-danger"
          >
            Keluar
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col gap-6">{children}</main>
    </div>
  );
}
