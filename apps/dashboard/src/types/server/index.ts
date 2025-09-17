import type { operations } from "./schema";

// Extract response type for an operation + status code
export type ApiResponse<
  T extends keyof operations,
  Status extends keyof operations[T]["responses"] = 200,
> = operations[T]["responses"][Status] extends {
  content: { "application/json": infer R };
}
  ? R
  : unknown;

// Extract request body type
export type ApiRequestBody<T extends keyof operations> =
  operations[T]["requestBody"] extends {
    content: { "application/json": infer Body };
  }
    ? Body
    : undefined;

// Extract query params type
export type ApiQueryParams<T extends keyof operations> =
  operations[T]["parameters"]["query"] extends object
    ? operations[T]["parameters"]["query"]
    : undefined;
