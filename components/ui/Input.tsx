import { cn } from "@/lib/utils";
import Icon from "./Icon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

export function Input({ label, icon, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-slate-500 flex items-center justify-center">
            <Icon name={icon} className="text-xl" />
          </div>
        )}
        <input 
          className={cn(
            "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 outline-none transition-all",
            "focus:border-primary focus:ring-1 focus:ring-primary",
            "text-slate-900 dark:text-slate-100 placeholder:text-slate-500",
            icon && "pl-11",
            className
          )} 
          {...props} 
        />
      </div>
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export function Select({ label, className, children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>}
      <select 
        className={cn(
          "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 outline-none transition-all",
          "focus:border-primary focus:ring-1 focus:ring-primary",
          "text-slate-900 dark:text-slate-100",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  description?: string;
}

export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
  return (
    <label className={cn(
      "flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group",
      className
    )}>
      <div className="relative flex items-center mt-1">
        <input 
          type="checkbox" 
          className="peer h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary focus:ring-offset-0 bg-transparent"
          {...props}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{label}</span>
        {description && <span className="text-xs text-slate-500">{description}</span>}
      </div>
    </label>
  );
}
