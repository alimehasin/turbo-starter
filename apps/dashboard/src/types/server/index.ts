import type { GetRequestBody, GetResponseBody } from './helpers';

// Governorates
export type GovernoratesList = GetResponseBody<'/admin/governorates/', 'get'>;

// Login
export type LoginRequestBody = GetRequestBody<'/auth/sign-in/email', 'post'>;

export type LoginResponseBody401 = GetResponseBody<
  '/auth/sign-in/email',
  'post',
  401
>;
