export type Role =
  | "ADMIN"
  | "SERVICE_MANAGER"
  | "SERVICE_DESK_ANALYST"
  | "ENGINEER"
  | "CLIENT_VIEWER"
  | "PUBLIC_USER";

export type JwtUser = {
  userId: string;
  email: string;
  role: Role;
  clientId: string | null;
};

export type ApiError = { message: string; statusCode: number };
