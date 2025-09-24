'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import { useDataTable } from '@/hooks/use-data-table';
import type { GovernoratesList } from '@/types/server';
import { ky } from '@/utils/ky';

export function Governorates() {
  const t = useTranslations();
  const { getTableProps, sorting, pagination } = useDataTable();

  const governorates = useQuery({
    queryKey: ['governorates', sorting, pagination],
    queryFn: () => {
      return ky
        .get<GovernoratesList>('admin/governorates', {
          searchParams: { ...sorting, ...pagination },
        })
        .json();
    },
  });

  return (
    <DataTable
      {...getTableProps({
        query: governorates,
        columns: [
          {
            accessor: 'name',
            title: t('governorates.name'),
          },
          {
            accessor: 'createdAt',
            title: t('governorates.createdAt'),
            render: ({ createdAt }) =>
              dayjs(createdAt as string).format('YYYY-MM-DD'),
          },
        ],
      })}
    />
  );
}
