import type { GetRequestBody, GetResponse, GetResponseBody } from "./helpers";

// Governorates
export type GovernoratesList = GetResponseBody<"/admin/governorates/", "get">;

// Login
export type LoginRequestBody = GetRequestBody<"/auth/sign-in/email", "post">;
