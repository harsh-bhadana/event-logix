'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "dashboard" },
    { label: "Events", href: "/admin/manage-events", icon: "calendar_today" },
    { label: "Venues", href: "#", icon: "location_on" },
    { label: "Attendees", href: "#", icon: "group" },
    { label: "Staff", href: "#", icon: "badge" },
    { label: "Finances", href: "#", icon: "payments" },
  ];

  const bottomItems = [
    { label: "Support", href: "#", icon: "headset_mic" },
    { label: "Archive", href: "#", icon: "inventory_2" },
  ];

  return (
    <aside className="hidden md:flex flex-col gap-2 py-6 px-4 h-screen w-64 fixed left-0 top-0 bg-surface-container-low z-40 transition-all font-body text-sm font-medium">
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold">
            EL
          </div>
          <div>
            <h2 className="text-lg font-black text-primary leading-none font-headline">Event Suite</h2>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Senior Portal</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== "#";
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 group ${
                isActive
                  ? "bg-surface-container-lowest text-primary shadow-[0_20px_40px_rgba(41,105,91,0.06)] rounded-r-full mr-4 scale-95 active:scale-100"
                  : "text-on-surface-variant hover:bg-[#ffffff40] hover:translate-x-1"
              }`}
            >
              <span 
                className={`material-symbols-outlined text-xl ${isActive ? "fill-1" : ""}`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className={isActive ? "font-semibold" : ""}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-[#ffffff40] transition-transform duration-200 hover:translate-x-1"
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
