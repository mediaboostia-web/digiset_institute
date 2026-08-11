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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F9FB] relative">
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggle={toggleCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />
      <div className="flex flex-1 flex-col h-screen overflow-y-auto overflow-x-hidden min-w-0 transition-all duration-300">
        <AdminHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={toggleCollapse}
          onOpenMobile={() => setIsMobileOpen(true)}
        />
        <main className="flex-1 p-3 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
