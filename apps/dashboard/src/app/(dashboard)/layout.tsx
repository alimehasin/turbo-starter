import { redirect } from "next/navigation";
import { Shell } from "@/components/shell";
import { authClient } from "@/lib/auth-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authClient.getSession();

  if (!session) {
    return redirect("/accounts/login");
  }

  return <Shell>{children}</Shell>;
}
