import { ReactNode } from "react";

import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block w-64 sticky top-0 h-screen border-r bg-white">
        <Sidebar />
      </div>{" "}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1  p-6">{children}</main>
      </div>
    </div>
  );
}
