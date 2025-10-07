import {
  LayoutDashboard,
  ListChecks,
  UserCog,
  type LucideIcon,
} from "lucide-react";

export type SidebarLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: string[];
};

export const sidebarLinks: SidebarLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "user", "manager"],
  },
  {
    href: "/admin",
    label: "Admin Panel",
    icon: UserCog,
    roles: ["admin"],
  },

  {
    href: "/tasks",
    label: "My Tasks",
    icon: ListChecks,
    roles: ["user"],
  },
];
