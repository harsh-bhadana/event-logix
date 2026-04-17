export interface NavItem {
  label: string;
  href: string;
  icon: string;
  exact?: boolean;
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard", exact: true },
  { label: "Insights", href: "/admin/insights", icon: "monitoring", exact: false },
  { label: "Events", href: "/admin/events", icon: "calendar_today", exact: false },
  { label: "Staff Verification", href: "/admin/staff", icon: "verified_user", exact: false },
  { label: "Gate Control", href: "/admin/gate", icon: "qr_code_scanner", exact: false },
  { label: "Finances", href: "/admin/finances", icon: "payments", exact: false },
];

export const ADMIN_BOTTOM_ITEMS: NavItem[] = [
  { label: "Support", href: "/admin/support", icon: "headset_mic" },
  { label: "Archive", href: "/admin/archive", icon: "inventory_2" },
];
