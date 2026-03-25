<a name="readme-top"></a>

<div align="center">
  <h1>🎟️ Event Logix</h1>
  <p><strong>The premium, role-based event orchestration ecosystem.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb" alt="MongoDB" />
  </p>
</div>

---

## 🌟 Overview

**Event Logix** is a high-performance event management platform engineered for maximum stability and seamless user experience. By leveraging **Next.js 16 Server Actions** and an adaptive **RBAC (Role-Based Access Control)** system, it provides three distinct, specialized environments for organizers, service providers, and attendees.

### 🛡️ Core Stability: The Defensive Layer
This platform implements a **Robust Defensive Architecture** that protects against data-drifting and null-reference crashes common in complex NoSQL schemas. Every data-intensive component is wrapped in defensive null-safety guards, ensuring a 99.9% uptime for critical management views like Rosters and Analytics.

---

## 🏗️ Architectural Portals

| Portal | Role | Core Functions |
|--------|------|----------------|
| **Admin Suite** | `admin` | Event Wizard, Staff Verification, Financial Analytics, Roster Management |
| **Staff Hub** | `staff` | Job Feed, Professional Onboarding, Shift Scheduling, Shift History |
| **Guest Gallery** | `public` | Event Discovery, Ticket Booking, Profile Management, Real-time Notifications |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Framework** | Next.js 16 (App Router, Server Actions, Concurrent Rendering) |
| **Frontend** | React 19, Tailwind CSS v4, Framer Motion, Recharts |
| **Security** | Custom JWT (via `jose`), Middleware Proxies, BcryptJS |
| **Database** | MongoDB (Mongoose ODM) |
| **Automation** | Vercel Cron Jobs (Scheduled Reminders) |
| **Visuals** | Lucide Icons, Experimental View Transitions API |

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── (public)/          # Guest experience (events, details, home)
│   ├── (admin)/admin/     # Organizer suite (analytics, rosters, staff)
│   ├── (staff)/staff/     # Workforce portal (jobs, schedule, profile)
│   ├── (auth)/            # Identity management (login, signup)
│   ├── api/               # Serverless endpoints & hook-based cron jobs
│   └── page.tsx           # Premium landing page
│
├── components/
│   ├── admin/             # Management components & Data Visualization
│   ├── auth/              # Secure identity forms
│   ├── landing/           # Hero, Features, and Discovery sections
│   ├── staff/             # Jobs feed & Schedule integration
│   └── ui/                # Atomic UI system (Loaders, Sidebars, Modals)
│
├── lib/
│   ├── actions/           # 100% Server Actions based data layer
│   │   ├── auth-actions.ts      # Identity lifecycle
│   │   ├── event-actions.ts     # Core event logic
│   │   ├── roster-actions.ts    # Staffing & assignment engine
│   │   └── analytics-actions.ts # Business intelligence
│   ├── auth.ts            # Session & Token primitives
│   ├── mongodb.ts         # High-availability DB connection
│   └── cn.ts              # Utility for style composition
│
├── models/                # Typed Mongoose Schemas (Event, User, Booking, Notification)
├── hooks/                 # Reusable logic (useEventWizard, useDebounce)
├── proxy.ts               # Global Middleware & Redirect Proxy (RBAC)
└── types/                 # Shared TypeScript interface definitions
```

---

## 🚀 Key Features

### 💎 Management & Operations
- **Event Orchestration Wizard**: A stateful multi-step form for publishing events with deep ticketing/staffing customization.
- **Master Roster Control**: Real-time staff tracking with automated capacity checks and assignment safety.
- **Admin Insights**: Financial and operational dashboards powered by native Recharts implementation.

### 🤝 Workforce Optimization
- **Onboarding Flow**: Specialized staff verification process to maintain service quality.
- **Opportunity Feed**: Intelligent job discovery based on staff expertise and schedule.
- **Live Schedule**: Visual calendar view for staff to manage upcoming shifts and historic records.

### 🎟️ Attendee Experience
- **Frictionless Booking**: Multi-tier ticket selection with real-time availability validation.
- **Smart Notifications**: In-app and scheduled reminders for upcoming events and status changes.
- **Premium Aesthetics**: Smooth page-level transitions and micro-animations for an "app-like" feel.

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js ≥ 18
- MongoDB Connection String (Atlas or Local)

### 2. Installation
```bash
git clone https://github.com/harsh-bhadana/event-logix.git
npm install
```

### 3. Environment Configuration
Create a `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_32_char_random_secret
```

### 4. Run Development
```bash
npm run dev
```

---

## 📜 Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Spins up the local development environment |
| `npm run build` | Compiles for production (Self-checks for type safety) |
| `npm run lint` | Runs the linter suite to ensure code health |
| `npx tsc --noEmit` | Deep type-validation across the entire tree |

---

## 📄 License
 Event Logix
