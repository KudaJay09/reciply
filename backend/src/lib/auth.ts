import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import crypto from "crypto";
import { admin } from "better-auth/plugins";
import { ac, ADMIN, CUSTOMER, MANAGER, STAFF, KITCHEN } from "./permissions";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  trustedOrigins: [process.env.CLIENT_URL || "http://localhost:5173"],
  database: prismaAdapter(prisma, {
    provider: "mongodb", // or "mysql", "postgresql", ...etc
  }),
  advanced: {
    database: {
      generateId: () => {
        return crypto.randomBytes(16).toString("hex");
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    admin({
      defaultRole: "CUSTOMER",
      ac: ac,
      roles: { ADMIN, CUSTOMER, MANAGER, STAFF, KITCHEN },
    }),
  ],
  user: {
    additionalFields: {
      gender: {
        type: "string",
        required: false,
      },
      age: {
        type: "number",
        required: false,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
    },
  },
});
