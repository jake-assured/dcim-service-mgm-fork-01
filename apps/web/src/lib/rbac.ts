import { getCurrentUser } from "./auth";

export const ROLES = {
  ORG_OWNER: "ORG_OWNER",
  ORG_ADMIN: "ORG_ADMIN",
  ADMIN: "ADMIN",
  SERVICE_MANAGER: "SERVICE_MANAGER",
  SERVICE_DESK_ANALYST: "SERVICE_DESK_ANALYST",
  ENGINEER: "ENGINEER",
  CLIENT_VIEWER: "CLIENT_VIEWER"
} as const;

export const ORG_SUPER_ROLES = [ROLES.ORG_OWNER, ROLES.ORG_ADMIN, ROLES.ADMIN] as const;

export function hasAnyRole(roles: string[]) {
  const role = getCurrentUser()?.role;
  if (!role) return false;
  return roles.includes(role);
}
