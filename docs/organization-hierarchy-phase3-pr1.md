# Organization Hierarchy - Phase 3 PR1 (Role Split + Backend Auth)

Date: 2026-03-05

## Delivered
- Added explicit org roles: `ORG_OWNER`, `ORG_ADMIN`.
- Kept legacy `ADMIN` for backward compatibility.
- Updated backend role checks/decorators to treat org-super roles as admin-equivalent for now.
- Updated Users permission logic:
  - `ORG_OWNER` can manage org-level + client-level roles.
  - `ORG_ADMIN` can manage client operational roles.
  - `SERVICE_MANAGER` remains client-scoped with narrower role assignment.
- Updated seed default admin to `ORG_OWNER`.
- Updated web RBAC constants and route/action checks to recognize org-super roles.

## Compatibility
- Existing `ADMIN` users continue to work as org-owner-equivalent during transition.
- Next PR introduces dedicated Organization management UI and org-super user workflows.
