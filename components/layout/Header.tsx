import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
}

export default function Header({ title, showSearch = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
            <Icon name="event_available" className="text-primary" />
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h2>
        </div>
        
        {showSearch && (
          <div className="hidden md:block min-w-40 max-w-64">
            <Input 
              icon="search" 
              placeholder="Search..." 
              className="bg-slate-100 dark:bg-slate-800 border-none h-10 py-0"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 justify-end gap-4 items-center">
        <div className="flex gap-2">
          <Button variant="secondary" size="icon">
            <Icon name="notifications" />
          </Button>
          <Button variant="secondary" size="icon">
            <Icon name="settings" />
          </Button>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
          <Icon name="person" className="text-primary" />
        </div>
      </div>
    </header>
  );
}
