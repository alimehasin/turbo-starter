import Elysia from "elysia";
import { posts } from "./posts";

export const routes = new Elysia()

  // Routes
  .use(posts);
