"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  useGetMeQuery,
  useLogoutMutation,
} from "@/lib/store/slices/authApi";

export default function Navbar() {
  const router = useRouter();
  const { data, isLoading: isUserLoading } = useGetMeQuery();
  const [logout, { isLoading: isLogoutLoading }] =
    useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white/80 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10">
          <Image
            src="/next.svg"
            alt="Logo"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </div>

        <span className="text-xl font-semibold tracking-tight">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-4">
        {isUserLoading ? (
          <Skeleton className="h-6 w-32 rounded" />
        ) : (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {data?.user?.avatar ? (
                <Image
                  src={data.user.avatar}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <AvatarFallback>
                  {data?.user?.name?.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex flex-col leading-none">
              <span className="text-sm font-medium">
                {data?.user?.name ?? "Unknown"}
              </span>
              <span className="text-xs text-muted-foreground">
                {data?.user?.role ?? "Role"}
              </span>
            </div>
          </div>
        )}

        <Separator orientation="vertical" className="h-6" />

        <Button
          onClick={handleLogout}
          disabled={isLogoutLoading}
          variant="destructive"
          size="sm"
        >
          {isLogoutLoading ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </nav>
  );
}
