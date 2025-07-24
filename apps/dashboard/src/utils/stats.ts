import dayjs from 'dayjs';

type Entry = { createdAt: Date };
type Datasets = Record<string, Entry[]>;
type MonthData = Record<string, number>;
type Result = { month: string } & MonthData;

type GroupDatesByMonthParams = {
  datasets: Datasets;
  count?: number;
  reverse?: boolean;
};

export function groupDatesByMonth({
  datasets,
  count = 12,
  reverse = true,
}: GroupDatesByMonthParams): Result[] {
  const months = Array.from({ length: count }, (_, i) =>
    dayjs().subtract(i, 'month').format('YYYY-MM'),
  );

  const data: Record<string, MonthData> = {};
  for (const month of months) {
    data[month] = {};
    for (const key of Object.keys(datasets)) {
      data[month][key] = 0;
    }
  }

  // Populate counts
  for (const [label, entries] of Object.entries(datasets)) {
    for (const { createdAt } of entries) {
      const month = dayjs(createdAt).format('YYYY-MM');
      const monthData = data[month];
      if (monthData) {
        monthData[label] = (monthData[label] || 0) + 1;
      }
    }
  }

  const result = months.map((month) => {
    const monthData = data[month];
    return { month, ...monthData } as Result;
  });

  return reverse ? result.reverse() : result;
}
