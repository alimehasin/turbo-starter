"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import { useDataTable } from "@/hooks/use-data-table";
import type { ApiQueryParams, ApiResponse } from "@/types/server";
import { ky } from "@/utils/ky";

export type PostsResponse = ApiResponse<"getPosts">;
export type PostsParams = ApiQueryParams<"getPosts">;

export function Posts() {
  const { sorting, pagination, getTableProps } = useDataTable();

  const posts = useQuery({
    queryKey: ["posts", sorting, pagination],
    queryFn: () => {
      return ky
        .get<PostsResponse>("posts", {
          searchParams: { ...sorting, ...pagination },
        })
        .json();
    },
  });

  return (
    <DataTable
      {...getTableProps({
        query: posts,
        columns: [
          {
            accessor: "title",
            title: "Title",
          },
          {
            accessor: "content",
            title: "Content",
          },
        ],
      })}
    />
  );
}
