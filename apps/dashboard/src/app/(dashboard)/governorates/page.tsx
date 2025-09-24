import { Stack } from '@mantine/core';
import { headers } from 'next/headers';
import type { GovernoratesList } from '@/types/server';
import { ky } from '@/utils/ky';
import { Governorates } from './governorates';
import { Metrics } from './metrics';

export default async function GovernoratesPage() {
  const headersList = await headers();

  const initialData = await ky
    .get<GovernoratesList>('admin/governorates', {
      headers: headersList,
    })
    .json();

  return (
    <Stack>
      <Metrics />
      <Governorates initialData={initialData} />
    </Stack>
  );
}
