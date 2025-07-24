import { stringify } from 'csv-stringify/sync';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';

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
