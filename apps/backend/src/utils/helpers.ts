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
  sortingColumn: string;
  sortingDirection: unknown;
}) {
  if (!sorting) {
    return undefined;
  }

  const children = sorting.sortingColumn.split('.');
  const lastChild = children.pop();

  if (!lastChild) {
    return { [sorting.sortingColumn]: sorting.sortingDirection };
  }

  return {
    orderBy: children.reduceRight((acc, key) => ({ [key]: acc }), {
      [lastChild]: sorting.sortingDirection,
    }),
  };
}
