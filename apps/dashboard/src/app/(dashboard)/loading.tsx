import { Center, Loader } from '@mantine/core';
import { HEADER_HEIGHT } from '@/utils/constants';

export default function Loading() {
  return (
    <Center style={{ height: `calc(100vh - ${HEADER_HEIGHT}px - 2rem)` }}>
      <Loader type="bars" />
    </Center>
  );
}
