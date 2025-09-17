import { Elysia } from "elysia";
import { alwaysAuthedPlugin } from "@/plugins";

export const files = new Elysia({ prefix: "/files" })

  // BetterAuth Guard
  .use(alwaysAuthedPlugin)

  .get("/", ({ user }) => {
    return user;
  })

  .post("/", {});
