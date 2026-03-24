import { TopAppBar } from "@/components/ui/TopAppBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopAppBar />
      <div className="flex flex-1 pt-16">
        {children}
      </div>
    </div>
  );
}
