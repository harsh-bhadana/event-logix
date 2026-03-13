import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface MobilePortalLayoutProps {
  children: React.ReactNode;
  activeTab?: 'home' | 'schedule' | 'comms' | 'profile';
  title?: string;
}

export default function MobilePortalLayout({ children, activeTab = 'home', title }: MobilePortalLayoutProps) {
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home', href: '/portal' },
    { id: 'schedule', icon: 'calendar_month', label: 'Schedule', href: '#' },
    { id: 'comms', icon: 'chat_bubble', label: 'Comms', href: '#' },
    { id: 'profile', icon: 'person', label: 'Profile', href: '/profile' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen pb-20">
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
        {title && (
          <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-50">
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">{title}</h2>
          </div>
        )}
        
        <main className="flex-1">
          {children}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-2 flex justify-around items-center z-50">
          {tabs.map((tab) => (
            <a 
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                activeTab === tab.id ? "text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              )}
            >
              <Icon name={tab.icon} className={cn("text-2xl", activeTab === tab.id && "font-bold")} fill={activeTab === tab.id} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
