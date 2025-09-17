import { Elysia, status } from "elysia";
import { env } from "./env";
import { cors, crons, helmet, logger, openapi, rateLimit } from "./plugins";
import { routes } from "./routes";
import { auth } from "./utils/auth";
import { HttpError } from "./utils/error";

export const app = new Elysia()

  // Plugins
  .use(cors)
  .use(crons)
  .use(helmet)
  .use(logger)
  .use(openapi)
  .use(rateLimit)

  // Mounts
  .mount("/auth", auth.handler)

  // Error Handler
  .error({ HttpError })
  .onError(({ code, error }) => {
    if (code === "HttpError") {
      return status(error.statusCode, { message: error.message });
    }
  })

  // Routes
  .use(routes)
  .get("/", {
    message: "Made with ❤️ by Ali Mehasin, for docs checkout /docs",
  })

  .listen(env.PORT);
