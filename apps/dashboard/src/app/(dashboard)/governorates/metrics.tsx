'use client';

import { SimpleGrid } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';
import { MetricCard } from '@/components/metric-card';

export function Metrics() {
  return (
    <SimpleGrid cols={{ md: 3 }}>
      <MetricCard
        color="blue"
        icon={<IconBuilding />}
        title="بغداد"
        value={0}
      />

      <MetricCard
        color="blue"
        icon={<IconBuilding />}
        title="بغداد"
        value={0}
      />

      <MetricCard
        color="blue"
        icon={<IconBuilding />}
        title="بغداد"
        value={0}
      />
    </SimpleGrid>
  );
}
