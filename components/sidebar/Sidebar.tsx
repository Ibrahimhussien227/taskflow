"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useGetMeQuery } from "@/lib/store/slices/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "./SidebarLinks";

export default function Sidebar() {
  const { data, isLoading: isUserLoading } = useGetMeQuery();
  const pathname = usePathname();

  const currentRole = data?.user?.role;

  return (
    <aside className="w-64 border-r bg-white min-h-screen flex flex-col p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight">Menu</h2>
      </div>

      <ul className="space-y-1">
        {isUserLoading ? (
          <>
            <li>
              <Skeleton className="h-8 w-40 rounded" />
            </li>
            <li>
              <Skeleton className="h-8 w-36 rounded" />
            </li>
          </>
        ) : (
          sidebarLinks
            .filter((link) => link.roles.includes(currentRole ?? ""))
            .map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })
        )}
      </ul>
    </aside>
  );
}
