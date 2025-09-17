import { Elysia } from "elysia";
import { betterAuth } from "@/plugins/better-auth";
import { setup } from "@/setup";

export const files = new Elysia({ prefix: "/files" })

  // Plugins
  .use(setup)
  .use(betterAuth)
  .guard({ maybeAuthed: true })

  .get("/", ({ user }) => {
    return user;
  });
