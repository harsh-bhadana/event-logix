import Header from "./Header";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  sidebarItems?: any[];
  currentFocus?: any;
}

const defaultSidebarItems = [
  { icon: "dashboard", label: "Dashboard", href: "#" },
  { icon: "calendar_today", label: "Events", href: "#", active: true },
  { icon: "location_on", label: "Venues", href: "#" },
  { icon: "group", label: "Vendors", href: "#" },
  { icon: "analytics", label: "Reports", href: "#" },
];

export default function DashboardLayout({ 
  children, 
  title = "EventPro Dashboard",
  sidebarItems = defaultSidebarItems,
  currentFocus
}: DashboardLayoutProps) {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Header title={title} />
          <div className="flex flex-1">
            <Sidebar items={sidebarItems} currentFocus={currentFocus} />
            <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 md:p-10">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
