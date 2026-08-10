"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("digiset_sidebar_collapsed");
    if (saved === "true") {
      setIsCollapsed(true);
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("digiset_sidebar_collapsed", String(next));
      return next;
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F8F9FB]">
      <AdminSidebar isCollapsed={isCollapsed} onToggle={toggleCollapse} />
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0 transition-all duration-300">
        <AdminHeader isCollapsed={isCollapsed} onToggleSidebar={toggleCollapse} />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
