<a name="readme-top"></a>

<div align="center">
  <h1>🎟️ Event Logix</h1>
  <p><strong>A premium full-stack event management platform</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb" alt="MongoDB" />
  </p>
</div>

---

## Overview

**Event Logix** is a modern event management system with three distinct portals:

| Portal | Audience | Path |
|--------|----------|------|
| **Public / Guest Gallery** | Visitors & attendees | `/discover`, `/events/[id]` |
| **Staff Portal** | Verified service providers | `/staff/jobs`, `/onboarding` |
| **Admin Suite** | Organizers & managers | `/admin/manage-events`, `/admin/staff/*` |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Server Actions) |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Auth | Custom JWT via `jose`, HTTP-only cookies |
| Database | MongoDB via Mongoose |
| Validation | Zod |
| Utilities | `date-fns`, `lucide-react`, `clsx`, `tailwind-merge` |

---

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing routes (discover, event detail)
│   ├── (admin)/admin/     # Admin portal (manage-events, staff apps/roster)
│   ├── (staff)/           # Staff portal (jobs feed, onboarding)
│   ├── (auth)/            # Login & signup pages
│   └── page.tsx           # Landing page
│
├── components/
│   ├── admin/             # AdminEventsClient, EventsTable, StaffApplicationsClient
│   ├── features/
│   │   ├── events/        # Event creation wizard steps (Step1–4)
│   │   └── onboarding/    # Staff onboarding wizard steps
│   ├── landing/           # Hero, FeaturedEvents, Features, Newsletter, etc.
│   ├── staff/             # JobsFeed, JobCard, JobDetailDrawer, QuickFilterBar
│   └── ui/                # Shared: PublicHeader, PublicFooter, TopAppBar,
│                          #         AdminSidebar, WizardSidebar, BookingCard,
│                          #         CountdownTimer, Loader, EventCard
│
├── lib/
│   ├── actions/
│   │   ├── auth-actions.ts      # login, logout, signup
│   │   ├── event-actions.ts     # publishEvent, getAdminEvents, getFeaturedEvents
│   │   ├── booking-actions.ts   # bookTicket, applyForStaffRole, updateEventStatus,
│   │   │                        # toggleEventFeatured, getAdminInsights
│   │   └── staff-actions.ts     # getStaffApplications, updateStaffStatus,
│   │                            # getMasterRoster, submitOnboarding
│   ├── auth.ts            # getSession (JWT decode from cookie)
│   ├── cn.ts              # Shared cn() Tailwind class merging utility
│   └── mongodb.ts         # Mongoose connection helper
│
├── models/
│   ├── Event.ts           # IEvent schema (ticketTypes[], lineup[], staffRolesNeeded[])
│   ├── User.ts            # IUser schema with staffProfile sub-document
│   └── Booking.ts         # IBooking schema (event, user, ticketType, quantity, totalAmount)
│
└── hooks/
    ├── useEventWizard.ts  # Multi-step wizard state context
    └── useDebounce.ts     # Debounce hook for search inputs
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A MongoDB connection string (MongoDB Atlas or local)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/event-logix.git
cd event-logix

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# → Fill in MONGODB_URI and JWT_SECRET

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
# MongoDB connection string (required)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/event-logix

# JWT signing secret — use a long random string (required)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-chars
```

---

## Key Features

### 🎟️ Ticket Booking
- Multi-type ticket selection with quantity picker
- Capacity-checked via `Booking.countDocuments` before saving
- Free tickets auto-confirm; paid tickets enter `pending` payment status
- Unauthenticated users are redirected to `/login`

### ⏱️ Live Countdown Timer
- Client component ticking every second towards the event date
- Shows days/hours/minutes/seconds; switches to "Registration closed" when expired

### 🧑‍💼 Staff Application Flow
- Staff browse open roles on the Jobs Feed
- `JobDetailDrawer` shows available roles with spots remaining
- `applyForStaffRole` server action: validates staff approval status, prevents duplicate applications, prevents over-filling a role

### 🛠️ Admin Event Management
- Create events via a multi-step wizard (Basic Info → Ticketing → Staffing → Review)
- Per-row action dropdown: **Publish**, **Set to Draft**, **Mark as Featured**, **Cancel**
- Live dashboard insights: revenue, tickets sold, published/total events, verified staff count

### 👥 Staff Approvals
- Admin reviews pending applications
- One-click Approve/Reject updates `staffProfile.onboardingStatus`

---

## Data Models

### `Event`
```typescript
{
  title, description, imageUrl, category, date,
  locationName, location: { type: "Point", address, coordinates },
  accessModel: "free" | "paid",
  ticketTypes: [{ name, price, quantity }],
  lineup: [{ name, role, org?, imageUrl? }],   // performers, speakers, hosts…
  staffRolesNeeded: [{ roleName, count, assignedStaff: ObjectId[] }],
  status: "draft" | "published" | "cancelled",
  isFeatured: boolean,
  pricingStrategy, taxInclusive, showFeeBreakdown
}
```

### `User`
```typescript
{
  name, email, passwordHash,
  role: "admin" | "staff" | "attendee",
  staffProfile?: {
    bio, skills: string[], yearsOfExperience,
    onboardingStatus: "pending" | "approved" | "rejected",
    isVerified: boolean
  }
}
```

### `Booking`
```typescript
{
  event: ObjectId, user: ObjectId,
  ticketType: string, quantity: number, totalAmount: number,
  paymentStatus: "pending" | "completed" | "refunded",
  paymentId?, qrCode?
}
```

---

## Shared Utilities

| Export | Location | Purpose |
|--------|----------|---------|
| `cn()` | `src/lib/cn.ts` | Merges Tailwind classes using `clsx` + `twMerge` |
| `Spinner` | `src/components/ui/Loader.tsx` | Inline spinner (sm/md/lg) |
| `PageLoader` | same | Full-page animated overlay |
| `CardSkeleton` / `CardSkeletonGrid` | same | Skeleton for event card grids |
| `TableRowSkeleton` | same | Skeleton for admin table rows |
| `LoadingBar` | same | Top-of-page progress bar |
| `CountdownTimer` | `src/components/ui/CountdownTimer.tsx` | Live countdown to a target date |
| `BookingCard` | `src/components/ui/BookingCard.tsx` | Ticket selector + booking form |

---

## Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript type check (no output files)
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

---

## License

MIT © Event Logix
