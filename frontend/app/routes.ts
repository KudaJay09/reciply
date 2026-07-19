import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/Sign-in.tsx"),
    route("register", "routes/auth/Sign-up.tsx"),
  ]),

  layout("routes/protected/layout.tsx", [
    route("/admin/dashboard", "routes/protected/admin/Dashboard.tsx"),
  ]),
] satisfies RouteConfig;
