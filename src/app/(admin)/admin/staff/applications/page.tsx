import { getStaffApplications } from "@/lib/actions/staff-actions";
import { StaffApplicationsClient } from "@/components/admin/StaffApplicationsClient";

export default async function StaffApplicationsPage() {
  const result = await getStaffApplications();
  const applications = result.success ? result.data : [];

  return (
    <div className="px-10 py-10 animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline">Staff Applications</h1>
        <p className="mt-2 text-on-surface-variant font-medium font-body">Review and manage new service provider registrations</p>
      </div>

      <StaffApplicationsClient initialApplications={applications} />
    </div>
  );
}
