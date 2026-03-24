import { TopAppBar } from "@/components/ui/TopAppBar";
import { AdminSidebar } from "@/components/ui/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <TopAppBar title="Event Suite" />
        <main className="flex-1 pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
