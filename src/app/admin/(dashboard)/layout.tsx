import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1">
      <AdminSidebar />
      <main className="flex flex-1 flex-col bg-secondary/30">{children}</main>
    </div>
  );
}
