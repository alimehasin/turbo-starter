import { Container } from '@mantine/core';
import { redirect } from 'next/navigation';
import { Shell } from '@/components/shell';
import { authenticate, getToken } from '@/server/actions/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();
  const admin = await authenticate(token);

  if (!admin) {
    redirect('/accounts/login');
  }

  return (
    <Shell>
      <Container size="xl">{children}</Container>
    </Shell>
  );
}
