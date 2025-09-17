import { openapi as elysiaOpenapi } from "@elysiajs/openapi";
import { fromTypes } from "@elysiajs/openapi/gen";
import { env } from "@/env";
import { auth } from "@/utils/auth";

const { components, paths } = await auth.api.generateOpenAPISchema();

const transformedPaths: Record<string, Record<string, unknown>> = {};
for (const path of Object.keys(paths)) {
  const pathData = paths[path];
  if (!pathData) continue;

  const key = `/auth${path}`;
  transformedPaths[key] = pathData as Record<string, unknown>;

  for (const method of Object.keys(pathData)) {
    const operation = transformedPaths[key]?.[method];
    if (operation && typeof operation === "object" && operation !== null) {
      (operation as { tags?: string[] }).tags = ["Authentication"];
    }
  }
}

export const openapi = elysiaOpenapi({
  path: "/docs",
  enabled: env.NODE_ENV === "development",
  references: fromTypes("src/main.ts"),

  documentation: {
    tags: [],
    paths: transformedPaths,
    components: {
      ...components,
      securitySchemes: {
        "Bearer Auth": {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});
