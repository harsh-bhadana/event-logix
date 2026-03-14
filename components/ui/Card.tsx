import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  noPadding?: boolean;
}

export function Card({ className, children, noPadding = false, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden", 
        className
      )}
      {...props}
    >
      <div className={cn(noPadding ? "p-0" : "p-6")}>
        {children}
      </div>
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1 mb-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-slate-900 dark:text-slate-100 text-xl font-bold", className)} {...props}>
      {children}
    </h2>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-slate-500 text-sm", className)} {...props}>
      {children}
    </p>
  );
}
