import { useSetState } from '@mantine/hooks';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@repo/utils/constants';
import type { UseTRPCQueryResult } from '@trpc/react-query/shared';
import type {
  DataTableColumn,
  DataTableProps,
  DataTableSortStatus,
} from 'mantine-datatable';
import { useTranslations } from 'next-intl';

interface Pagination {
  page: number;
  pageSize: number;
}

interface Sorting {
  column: string;
  direction: 'asc' | 'desc';
}

interface GetTablePropsParams<T extends Record<string, unknown>> {
  query: UseTRPCQueryResult<{ total: number; data: T[] }, unknown>;
  columns: DataTableColumn<T>[];
  isPagination?: boolean;
  isSorting?: boolean;
}

interface UseDataTableParams {
  pagination?: Pagination;
  sorting?: Sorting;
}

export function useDataTable({
  pagination: defaultPagination,
  sorting: defaultSorting,
}: UseDataTableParams = {}) {
  const t = useTranslations();

  const [pagination, setPagination] = useSetState<Pagination>(
    defaultPagination ?? { page: 1, pageSize: DEFAULT_PAGE_SIZE },
  );

  const [sorting, setSorting] = useSetState<Sorting>(
    defaultSorting ?? { column: 'createdAt', direction: 'desc' },
  );

  const [dtSorting, setDtSorting] = useSetState<DataTableSortStatus>({
    columnAccessor: defaultSorting?.column ?? 'createdAt',
    direction: defaultSorting?.direction ?? 'desc',
    sortKey: defaultSorting?.column ?? 'createdAt',
  });

  function handleSetDtSorting(newSorting: DataTableSortStatus) {
    setDtSorting(newSorting);
    setSorting({
      column: newSorting.sortKey || newSorting.columnAccessor,
      direction: newSorting.direction,
    });
  }

  function getTableProps<T extends Record<string, unknown>>({
    query,
    columns,
    isPagination = true,
    isSorting = true,
  }: GetTablePropsParams<T>) {
    let props: DataTableProps<T> = {
      noRecordsText: t('dataTable.noRecords'),

      borderRadius: 'md',
      withRowBorders: true,
      withTableBorder: true,
      withColumnBorders: true,
      fetching: query?.isLoading,
      minHeight: query?.data?.data?.length ? undefined : 200,
      records: query.data?.data ?? [],
      columns,
    };

    if (isPagination) {
      props = {
        ...props,
        totalRecords: query?.data?.total ?? 0,
        recordsPerPageOptions: PAGE_SIZE_OPTIONS,
        page: pagination.page,
        onPageChange: (page) => setPagination({ page }),
        recordsPerPage: pagination.pageSize,
        onRecordsPerPageChange: (pageSize) => setPagination({ pageSize }),
        recordsPerPageLabel: t('dataTable.recordsPerPageLabel'),
      };
    }

    if (isSorting) {
      props = {
        ...props,
        sortStatus: dtSorting,
        onSortStatusChange: handleSetDtSorting as (s: DataTableSortStatus<T>) => void,
      };
    }

    return props;
  }

  return { pagination, sorting, getTableProps };
}
