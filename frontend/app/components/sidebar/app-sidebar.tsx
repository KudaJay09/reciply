import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "react-router";
import { images } from "@/constants";
import NavItem from "./NavItem";
import { authClient } from "@/lib/auth-client";
import type { roles } from "@/types";
import { data, type NavItemType } from "./nav-data";
import Theme from "@/components/Theme";
import { UserIcon } from "lucide-react";

const AppSidebar = () => {
  const { data: session } = authClient.useSession();
  const userRole = (session?.user?.role as roles) || "CUSTOMER";

  const filterNav = (items: NavItemType[]) => {
    return items.filter((item) => item.allowedRoles.includes(userRole));
  };
  const filterPosNav = filterNav(data.posNav);
  const filterAdminNav = filterNav(data.adminNav);
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="mt-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-2/4 h-20 rounded-xl  p-2">
            <img
              src={images.gericht}
              alt="Reciply Logo"
              className="bg-black w-full h-full rounded-xl object-contain px-2"
            />
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavItem items={filterAdminNav} title="Administration" />
        <NavItem items={filterPosNav} title="Point of Sale" />
      </SidebarContent>
      <SidebarFooter className="bg-primary/5 shadow-xl rounded-lg m-2 p-2 pt-2">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem className="flex justify-end">
            <Theme />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className="border rounded-lg p-2 w-full items-center"
              size="lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground overflow-hidden shadow-sm">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserIcon className="size-4" />
                  )}
                </div>

                <div className="flex flex-col items-start text-sm leading-tight">
                  <span className="font-semibold text-foreground">
                    {session?.user?.name || "Admin User"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {session?.user?.email || "admin@restaurant.com"}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
