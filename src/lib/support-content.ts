export interface SupportArticle {
  id: string;
  title: string;
  category: string;
  role: "admin" | "staff" | "all";
  content: string;
  keywords: string[];
}

export const SUPPORT_CATEGORIES = [
  { id: "getting-started", label: "Getting Started", icon: "rocket_launch" },
  { id: "finances", label: "Financial Mastery", icon: "payments" },
  { id: "staffing", label: "Staffing & Roles", icon: "badge" },
  { id: "security", label: "Gate & Security", icon: "qr_code_scanner" },
  { id: "compliance", label: "Legality & Tax", icon: "gavel" },
];

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    id: "create-first-event",
    title: "Creating Your First Event",
    category: "getting-started",
    role: "admin",
    content: `
# Creating Your First Event

Welcome to the Event Logix command center. Creating an event is the first step in activating your portfolio.

## The Wizard Process
Our Event Wizard is designed to capture every detail perfectly:
1. **Basic Info**: Name, date, and a premium visual asset.
2. **Ticketing**: Define your access model (Paid or Free) and price points.
3. **Staffing**: Identify which roles are critical for your event's success.
4. **Lineup**: Add speakers, artists, or hosts to the public profile.

> [!TIP]
> Use high-resolution images (1920x1080) for the best display on user dashboards.
    `,
    keywords: ["create", "new", "event", "wizard", "start"]
  },
  {
    id: "payout-cycles",
    title: "Understanding Payout Cycles",
    category: "finances",
    role: "admin",
    content: `
# Understanding Payout Cycles

At Event Logix, we prioritize your liquidity. Here is how our settlement system works.

## Settlement Window
Standard payouts occur 48 hours after an event has been moved to the **Archive**. This ensures all refunds and dispute windows are cleanly managed.

## Settlement Tiers
- **Standard**: 48h post-archive.
- **Expedited**: Premium accounts can request same-day settlement if the event ROI exceeds 150%.

> [!IMPORTANT]
> Ensure your bank details are verified in the Finance Ledger to avoid routing delays.
    `,
    keywords: ["money", "payout", "settlement", "bank", "finance"]
  },
  {
    id: "staff-verification",
    title: "How to Verify Staff",
    category: "staffing",
    role: "admin",
    content: `
# Verifying Staff Providers

Maintaining a high standard for on-ground execution requires a strict verification process.

## Reviewing Applications
1. Navigate to the **Staff Verification** portal.
2. Review the provider's history, certifications, and previous ratings.
3. Click "Approve" to activate their account for assignments.

## Performance Ratings
After every event, you can rate assigned staff. These ratings influence their future priority in the application queue.
    `,
    keywords: ["staff", "verify", "approve", "vetting"]
  },
  {
     id: "gate-control-basics",
     title: "Gate Control Protocols",
     category: "security",
     role: "all",
     content: `
# Gate Control Protocols

The Gate Control interface is your front line for security and attendance integrity.

## Scanning Procedures
- **Standard Entry**: Scan the user's QR code from their mobile dashboard.
- **Manual Override**: Use the Attendee Roster if a device is unavailable.

## Technical Troubleshooting
If the scan fails, ensure the device brightness is at maximum. A "Sync Error" usually indicates a local network disruption; the system will auto-retry once connectivity is restored.
     `,
     keywords: ["gate", "scan", "qr", "security", "checkin"]
  }
];
