import { HEADER_HEIGHT } from '@/utils/constants';
import { Center, Loader } from '@mantine/core';

export default function Loading() {
  return (
    <Center style={{ height: `calc(100vh - ${HEADER_HEIGHT}px - 2rem)` }}>
      <Loader type="bars" />
    </Center>
  );
}
