import React from "react";
import { PublicHeader } from "@/components/ui/PublicHeader";
import { PublicFooter } from "@/components/ui/PublicFooter";
import { getSession } from "@/lib/auth";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary-container selection:text-on-primary-container">
      <PublicHeader user={session?.user} />
      <main className="flex-grow">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
