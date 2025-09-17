import { cors as elysiaCors } from "@elysiajs/cors";

export const cors = elysiaCors({
  allowedHeaders: "*",
  credentials: true,
});
