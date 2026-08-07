import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-[#F8F9FB]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
