import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface SidebarItem {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  currentFocus?: {
    title: string;
    progress: number;
    tasksLabel: string;
  };
}

export default function Sidebar({ items, currentFocus }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">Main Menu</p>
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <a 
              key={item.label}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                item.active 
                  ? "bg-primary/10 text-primary" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )} 
              href={item.href}
            >
              <Icon name={item.icon} className={item.active ? "text-primary font-bold" : ""} />
              <span className={cn("text-sm", item.active ? "font-semibold" : "font-medium")}>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {currentFocus && (
        <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-xs font-bold text-primary uppercase mb-1">Current Focus</p>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{currentFocus.title}</p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full transition-all duration-500" style={{ width: `${currentFocus.progress}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">{currentFocus.tasksLabel}</p>
        </div>
      )}
    </aside>
  );
}
