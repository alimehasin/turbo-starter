import { Elysia } from "elysia";

export const setup = new Elysia({ name: "setup" })

  // Translation
  .derive({ as: "scoped" }, ({ headers }) => {
    const lang = headers["accept-language"]?.split(",")[0] || "en";

    return {
      t: ({ en, ar }: { en: string; ar: string }) => {
        return lang === "ar" ? ar : en;
      },
    };
  });
