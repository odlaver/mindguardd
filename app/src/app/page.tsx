import { redirect } from "next/navigation";

import { LoginScreen } from "@/components/auth/login-screen";
import { getRoleHomePath } from "@/lib/role-home-path";
import { getSessionOrNull } from "@/lib/server/session";

export default async function Home() {
  const session = await getSessionOrNull();

  if (session) {
    redirect(getRoleHomePath(session.user.role));
  }

  return <LoginScreen />;
}
