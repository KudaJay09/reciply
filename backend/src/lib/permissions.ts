import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
  userAc,
} from "better-auth/plugins/admin/access";

export const allPermissions = [
  "read",
  "create",
  "delete",
  "ban",
  "view",
  "cancel",
  "update",
  "get",
  "list",
  "set-role",
  "generate",
] as const;

const statements = {
  ...defaultStatements,
  order: ["create", "read", "update", "delete", "cancel"],
  category: ["create", "read", "update", "delete"],
  menu: ["create", "read", "update", "delete"],
  table: ["create", "read", "update", "delete"],
  kds: ["view", "update_status"],
  report: ["view"],
} as const;

export const ac = createAccessControl(statements);

export const ADMIN = ac.newRole({
  ...adminAc.statements,
  order: ["create", "read", "update", "delete", "cancel"],
  category: ["create", "read", "update", "delete"],
  menu: ["create", "read", "update", "delete"],
  table: ["create", "read", "update", "delete"],
  kds: ["view", "update_status"],
  report: ["view"],
  user: ["create", "ban", "delete", "get", "list", "set-role"],
  session: [],
});

export const MANAGER = ac.newRole({
  ...userAc.statements,
  order: ["create", "read", "update", "delete", "cancel"],
  category: ["create", "read", "update", "delete"],
  menu: ["create", "read", "update", "delete"],
  table: ["create", "read", "update", "delete"],
  kds: ["view", "update_status"],
  report: ["view"],
  user: ["create", "ban", "delete", "get", "list", "set-role", "update"],
  session: [],
});

export const STAFF = ac.newRole({
  ...userAc.statements,
  order: ["read", "update", "create"],
  category: ["read"],
  menu: ["read"],
  table: ["read", "update"],
  kds: ["view"],
  report: [],
  user: [],
  session: [],
});

export const KITCHEN = ac.newRole({
  ...userAc.statements,
  order: ["read"],
  category: ["read"],
  menu: ["read"],
  table: [],
  kds: ["view", "update_status"],
  report: [],
  user: [],
  session: [],
});

export const CUSTOMER = ac.newRole({
  ...userAc.statements,
  order: ["read", "create", "cancel"],
  category: ["read"],
  menu: ["read"],
  table: ["read"],
  kds: [],
  report: [],
  user: [],
  session: [],
});
