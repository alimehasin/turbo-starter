import dayjs from 'dayjs';
import parse from 'libphonenumber-js';

export function formatPhoneNumber(pn: string): string {
  const phoneNumber = parse(pn, 'IQ');

  if (!phoneNumber || !phoneNumber.isValid()) {
    return pn;
  }

  return phoneNumber.formatInternational();
}

export function formatPhoneNumberWA(pn: string): string {
  const phoneNumber = parse(pn, 'IQ');

  if (!phoneNumber || !phoneNumber.isValid()) {
    return '';
  }

  return phoneNumber.format('E.164').slice(1);
}

export function formatDate(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function formatTime(date: Date): string {
  return dayjs(date).format('hh:mm a');
}

export function formatDateTime(date: Date): string {
  return dayjs(date).format('YYYY-MM-DD hh:mm A');
}

export function parsePaginationProps(p?: { page: number; pageSize: number }): {
  skip: number | undefined;
  take: number | undefined;
} {
  if (!p) {
    return {
      skip: undefined,
      take: undefined,
    };
  }

  return {
    skip: (p.page - 1) * p.pageSize,
    take: p.pageSize,
  };
}

export function parseSortingProps(sorting?: {
  column: string;
  direction: unknown;
}) {
  if (!sorting) {
    return undefined;
  }

  const children = sorting.column.split('.');
  const lastChild = children.pop();

  if (!lastChild) {
    return { [sorting.column]: sorting.direction };
  }

  return {
    orderBy: children.reduceRight((acc, key) => ({ [key]: acc }), {
      [lastChild]: sorting.direction,
    }),
  };
}
