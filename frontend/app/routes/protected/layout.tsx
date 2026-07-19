import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";
import LoadingScreen from "@/components/Loader";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { roles } from "@/types";
import { useEffect } from "react";
import { data, getRouteConfig } from "@/components/sidebar/nav-data";

const DashboardLayout = () => {
  const sessionState = authClient.useSession();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = sessionState;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const userRole = (session?.user.role as roles) || "CUSTOMER";

  useEffect(() => {
    if (isPending) return;

    const allNavItems = [...data.adminNav, ...data.posNav];
    const currentRouteConfig = getRouteConfig(pathname, allNavItems);

    if (currentRouteConfig) {
      const hasAccess = currentRouteConfig.allowedRoles.includes(userRole);

      if (!hasAccess) {
        toast.error("Unauthorized Access");
        // Redirect to a safe page based on role, or just dashboard
        navigate("/", { replace: true });
      }
    }
  }, [userRole, pathname, isPending, navigate]);

  if (isPending) {
    return <LoadingScreen title="Loading user session" />;
  }

  if (error) {
    toast.error("Error fetching session. Please try again.");
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "19rem" } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset className="bg-card/50">
        <main className="my-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
