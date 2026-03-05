import { Role } from "@prisma/client";

export const ORG_SUPER_ROLES: Role[] = [Role.ORG_OWNER, Role.ORG_ADMIN, Role.ADMIN];

export function isOrgSuperRole(role: Role | undefined | null) {
  return !!role && ORG_SUPER_ROLES.includes(role);
}

export function isOrgOwnerRole(role: Role | undefined | null) {
  return role === Role.ORG_OWNER || role === Role.ADMIN;
}

