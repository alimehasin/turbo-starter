import { Elysia } from "elysia";
import { betterAuth } from "@/plugins/better-auth";

export const files = new Elysia({ prefix: "/files" })

  .use(betterAuth)
  .guard({ mustAuthed: true })

  .get("/", ({ user }) => {
    return user;
  })

  .post("/", {});
