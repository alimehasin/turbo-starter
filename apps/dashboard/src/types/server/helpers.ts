import type { paths } from './schema';

export type GetRequestBody<
  T extends keyof paths,
  M extends keyof paths[T],
> = paths[T][M] extends { requestBody: infer R }
  ? R extends { content: { 'application/json': infer Content } }
    ? Content
    : never
  : never;

export type GetResponse<
  T extends keyof paths,
  M extends keyof paths[T],
  S extends number = 200,
> = paths[T][M] extends { responses: infer Responses }
  ? S extends keyof Responses
    ? Responses[S]
    : never
  : never;

export type GetResponseBody<
  T extends keyof paths,
  M extends keyof paths[T],
  S extends number = 200,
> = paths[T][M] extends { responses: infer Responses }
  ? S extends keyof Responses
    ? Responses[S] extends { content: { 'application/json': infer Content } }
      ? Content
      : never
    : never
  : never;
