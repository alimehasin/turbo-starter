import { env } from "@/env";

export function constructImageUrl(key: string | undefined) {
  if (!key) {
    return undefined;
  }

  return `${env.NEXT_PUBLIC_STORAGE_BASE_URL}/${key}`;
}
