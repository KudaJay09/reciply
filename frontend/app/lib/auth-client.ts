import { createAuthClient } from "better-auth/client";
import { ac, ADMIN, CUSTOMER, KITCHEN, MANAGER, STAFF } from "./permissions";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseUrl: import.meta.env.BACKEND_URL,
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
