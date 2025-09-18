import { getLocale } from "next-intl/server";
import Login from "./login";

export default async function LoginPage() {
  const locale = await getLocale();

  return <Login locale={locale} />;
}
