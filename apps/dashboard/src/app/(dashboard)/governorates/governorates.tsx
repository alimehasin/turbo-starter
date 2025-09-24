'use client';

import { ActionIcon, Button, Group, Modal, Stack } from '@mantine/core';
import { useDisclosure, useSetState } from '@mantine/hooks';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { DownloadFileButton } from '@/components/download-file-button';
import { SearchInput } from '@/components/search-input';
import { useDataTable } from '@/hooks/use-data-table';
import { useModals } from '@/hooks/use-modals';
import { useNotifications } from '@/hooks/use-notifications';
import type { GovernoratesList } from '@/types/server';
import { ky } from '@/utils/ky';
import { GovernoratesForm } from './governorates-form';

export function Governorates({
  initialData,
}: {
  initialData: GovernoratesList;
}) {
  const modals = useModals();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();
  const { getTableProps, sorting, pagination } = useDataTable();
  const [opened, { open, close }] = useDisclosure(false, {
    onClose: () => setGovernorate(undefined),
  });

  const [governorate, setGovernorate] =
    useState<GovernoratesList['data'][number]>();

  const [filters, setFilters] = useSetState({
    search: '',
  });

  const governorates = useQuery({
    initialData,
    queryKey: ['admin/governorates', sorting, pagination, filters],
    queryFn: () => {
      return ky
        .get<GovernoratesList>('admin/governorates', {
          searchParams: { ...sorting, ...pagination, ...filters },
        })
        .json();
    },
  });

  const allGovernorates = useQuery({
    queryKey: ['admin/governorates', sorting, filters],
    queryFn: () => {
      return ky
        .get<GovernoratesList>('admin/governorates', {
          searchParams: { ...sorting, ...filters },
        })
        .json();
    },
  });

  const deleteGovernorateMut = useMutation({
    mutationFn: (id: string) => {
      return ky.delete(`admin/governorates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin/governorates'] });
      n.info(t('governorates.deletedSuccessfully'));
    },
  });

  return (
    <Stack>
      <Modal opened={opened} onClose={close}>
        <GovernoratesForm
          governorate={governorate}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['admin/governorates'] });
            n.success(t('governorates.savedSuccessfully'));
            close();
          }}
        />
      </Modal>

      <Group justify="space-between">
        <SearchInput
          value={filters.search}
          onChange={(search) => setFilters({ search })}
        />

        <Group gap="xs">
          <Button leftSection={<IconPlus />} onClick={open}>
            {t('governorates.add')}
          </Button>

          <DownloadFileButton
            fileName="governorates"
            query={allGovernorates}
            data={allGovernorates.data?.data.map((governorate) => ({
              name: governorate.name,
              createdAt: governorate.createdAt,
            }))}
          />
        </Group>
      </Group>

      <DataTable
        {...getTableProps({
          query: governorates,
          columns: [
            {
              accessor: 'name',
              title: t('governorates.name'),
              width: 'auto',
            },
            {
              accessor: 'createdAt',
              title: t('governorates.createdAt'),
              width: 400,
              render: ({ createdAt }) => {
                return dayjs(createdAt as string).format('YYYY-MM-DD');
              },
            },
            {
              accessor: 'actions',
              title: '',
              width: 106,
              render: (governorate) => {
                return (
                  <Group gap={4} justify="center">
                    <ActionIcon
                      color="gray"
                      variant="subtle"
                      onClick={() => {
                        setGovernorate(governorate);
                        open();
                      }}
                    >
                      <IconPencil size={20} />
                    </ActionIcon>

                    <ActionIcon
                      color="red"
                      variant="subtle"
                      loading={deleteGovernorateMut.isPending}
                      onClick={() => {
                        modals.confirmDelete({
                          onConfirm: () => {
                            deleteGovernorateMut.mutate(governorate.id);
                          },
                        });
                      }}
                    >
                      <IconTrash size={20} />
                    </ActionIcon>
                  </Group>
                );
              },
            },
          ],
        })}
      />
    </Stack>
  );
}
