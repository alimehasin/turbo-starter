import { Elysia } from "elysia";

export const admin = new Elysia({ prefix: "/admin", tags: ["Admin"] });
