import { Elysia } from "elysia";
import { env } from "./env";
import { plugins } from "./plugins";
import { routes } from "./routes";

export const app = new Elysia()

  // Plugins
  .use(plugins)

  // Routes
  .use(routes)

  .get("/", {
    message: "Made with ❤️ by Ali Mehasin, for docs checkout /docs",
  })

  .listen(env.PORT);
