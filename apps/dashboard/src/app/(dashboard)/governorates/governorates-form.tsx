'use client';

import { Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import type {
  GovernoratesCreateBody,
  GovernoratesList,
  GovernoratesUpdateBody,
} from '@/types/server';
import { ky } from '@/utils/ky';

export function GovernoratesForm({
  governorate,
  onSuccess,
}: {
  governorate?: GovernoratesList['data'][number];
  onSuccess: () => void;
}) {
  const t = useTranslations();

  const form = useForm<GovernoratesCreateBody>({
    initialValues: {
      name: governorate?.name ?? '',
    },
  });

  const createGovernorateMut = useMutation({
    onSuccess,
    mutationFn: (body: GovernoratesCreateBody) => {
      return ky.post('admin/governorates', { json: body });
    },
  });

  const updateGovernorateMut = useMutation({
    onSuccess,
    mutationFn: (body: GovernoratesUpdateBody) => {
      return ky.patch(`admin/governorates/${governorate?.id}`, { json: body });
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    governorate
      ? await updateGovernorateMut.mutateAsync(values)
      : await createGovernorateMut.mutateAsync(values);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label={t('governorates.name')}
          {...form.getInputProps('name')}
        />

        <Button
          type="submit"
          loading={form.submitting}
          leftSection={<IconCheck />}
        >
          {t('_.save')}
        </Button>
      </Stack>
    </form>
  );
}
