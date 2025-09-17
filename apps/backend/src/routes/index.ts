import Elysia from "elysia";
import { files } from "./files";

export const routes = new Elysia()

  // Routes
  .use(files);
