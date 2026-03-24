import { getSession } from "@/lib/auth";

interface TopAppBarProps {
  title?: string;
}

export async function TopAppBar({ title = "Event Logix" }: TopAppBarProps) {
  const session = await getSession();
  const user = session?.user;

  // Build initials from name or fallback
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "EL";

  return (
    <header className="bg-[#fbf9f7] dark:bg-neutral-900 flex justify-between items-center px-8 h-16 w-full fixed top-0 z-50 border-b border-outline-variant/10">
      <div className="flex items-center gap-4">
        <span className="font-headline font-bold text-primary dark:text-primary-fixed tracking-tighter text-xl cursor-default">
          Event Logix
        </span>
        <div className="bg-surface-variant dark:bg-neutral-800 h-6 w-[1px] mx-2" />
        <span className="font-headline font-semibold text-lg tracking-tight text-primary dark:text-primary-fixed cursor-default">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          title="Help"
          className="hover:bg-surface-container-low dark:hover:bg-neutral-800 transition-colors p-2 rounded-full active:opacity-80"
        >
          <span className="material-symbols-outlined text-on-surface-variant">help</span>
        </button>
        <button
          title="Notifications"
          className="hover:bg-surface-container-low dark:hover:bg-neutral-800 transition-colors p-2 rounded-full relative active:opacity-80"
        >
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        </button>
        {/* User avatar: initials if no profile image, or could be extended to accept avatarUrl */}
        <div
          className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 bg-primary text-on-primary flex items-center justify-center font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity"
          title={user?.name ?? "User"}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
