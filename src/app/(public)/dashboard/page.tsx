import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getUserBookings } from "@/lib/actions/booking-actions";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const { bookings } = await getUserBookings();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <DashboardClient bookings={bookings} user={session.user} />
    </div>
  );
}
