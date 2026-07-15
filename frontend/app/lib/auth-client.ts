import { createAuthClient } from "better-auth/react";
import { ac, ADMIN, CUSTOMER, KITCHEN, MANAGER, STAFF } from "./permissions";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000",
  plugins: [
    adminClient({
      ac: ac,
      roles: {
        ADMIN,
        MANAGER,
        STAFF,
        KITCHEN,
        CUSTOMER,
      },
    }),
  ],
});
