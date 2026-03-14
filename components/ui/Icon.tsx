import { cn } from "@/lib/utils";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  fill?: boolean;
}

export default function Icon({ name, className, fill = false, ...props }: IconProps) {
  return (
    <span 
      className={cn("material-symbols-outlined", className)} 
      style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}` }}
      {...props}
    >
      {name}
    </span>
  );
}
