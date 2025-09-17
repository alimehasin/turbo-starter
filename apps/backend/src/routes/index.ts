import Elysia from "elysia";
import { admin } from "./admin";
import { user } from "./user";

export const routes = new Elysia()

  // Routes
  .use(admin)
  .use(user);
