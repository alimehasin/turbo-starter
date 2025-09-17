import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations();

  return <div>{t("_.hello")}</div>;
}
