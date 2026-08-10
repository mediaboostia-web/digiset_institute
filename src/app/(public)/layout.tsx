import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col pb-14 lg:pb-0 relative">
      <Header />
      <main className="flex flex-1 flex-col pt-20">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}
