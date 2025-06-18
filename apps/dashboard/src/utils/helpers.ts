import { stringify } from 'csv-stringify/sync';
import dayjs from 'dayjs';
import saveAs from 'file-saver';
import { env } from '@/env';

export function constructImageUrl(key: string | undefined) {
  if (!key) {
    return undefined;
  }

  return `${env.NEXT_PUBLIC_STORAGE_BASE_URL}/${key}`;
}

export function groupDatesByMonth(dates: { createdAt: Date }[], count = 12) {
  const data: { [month: string]: number } = {};

  for (let i = 0; i < count; i++) {
    const month = dayjs().subtract(i, 'month').format('YYYY-MM');
    data[month] = 0;
  }

  for (const { createdAt } of dates) {
    const date = dayjs(createdAt);
    const month = date.format('YYYY-MM');

    if (data[month] !== undefined) {
      data[month]++;
    }
  }

  return Object.entries(data)
    .map(([month, count]) => ({ month, count }))
    .reverse();
}

export function downloadCsv(data: unknown[], filename = 'data.csv') {
  const csvData = stringify(data, {
    header: true,
    cast: {
      date: (value) => dayjs(value).format('YYYY-MM-DDTHH:mm:ss'),
      number: (value) => value.toLocaleString(),
    },
  });

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
}
