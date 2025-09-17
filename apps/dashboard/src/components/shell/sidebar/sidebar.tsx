import { Stack, Text } from "@mantine/core";
import { IconArticle, IconHome } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { ShellLink } from "./shell-link";

export function Sidebar() {
  const t = useTranslations();

  const links = [
    {
      label: "",
      links: [
        {
          icon: IconHome,
          label: t("sidebar.home"),
          path: "/",
          activeExact: true,
        },
      ],
    },
    {
      label: t("sidebar.articles"),
      links: [
        {
          icon: IconArticle,
          label: t("sidebar.posts"),
          path: "/posts",
        },
      ],
    },
  ];

  return (
    <Stack p="md">
      {links.map((link) => (
        <div key={link.label}>
          <Text fz={12} c="gray">
            {link.label}
          </Text>

          <Stack gap={2}>
            {link.links.map((link) => (
              <ShellLink key={link.path} {...link} />
            ))}
          </Stack>
        </div>
      ))}
    </Stack>
  );
}
