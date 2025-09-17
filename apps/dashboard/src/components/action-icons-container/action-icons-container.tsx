import { Group } from "@mantine/core";

export function ActionIconsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Group
      p={4}
      gap={4}
      bg="white"
      bdrs="100vw"
      bd="1px solid var(--mantine-color-gray-2)"
    >
      {children}
    </Group>
  );
}
