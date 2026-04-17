import { getMasterRoster } from "@/lib/actions/staff-actions";
import { StaffRosterClient } from "@/components/admin/StaffRosterClient";

export default async function MasterRosterPage() {
  const result = await getMasterRoster();
  const roster = result.success ? result.data : [];

  return (
    <div className="px-10 py-10 animate-in fade-in duration-700">
      <StaffRosterClient roster={roster} />
    </div>
  );
}
