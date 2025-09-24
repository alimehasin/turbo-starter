import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Shell } from '@/components/shell';
import { authClient } from '@/utils/auth-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const session = await authClient.getSession({
    fetchOptions: { headers: headersList },
  });

  if (!session.data || session.data.user.role !== 'admin') {
    return redirect('/accounts/login');
  }

  return <Shell>{children}</Shell>;
}
