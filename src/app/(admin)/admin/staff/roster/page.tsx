import { getMasterRoster } from "@/lib/actions/staff-actions";
import Image from 'next/image';

export default async function MasterRosterPage() {
  const result = await getMasterRoster();
  const roster = result.success ? result.data : [];

  return (
    <div className="px-10 py-10 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline">Master Roster</h1>
          <p className="mt-2 text-on-surface-variant font-medium font-body">{roster.length} Verified service providers in your database</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full sm:w-80 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              className="w-full bg-surface-container-highest border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/60 font-body" 
              placeholder="Search staff by name or skill..." 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-outline-variant/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/5">
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Provider</th>
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Primary Skills</th>
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Verified On</th>
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Performance</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {roster.map((staff: any) => (
              <tr key={staff._id} className="hover:bg-surface-container-lowest/50 transition-colors group">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center overflow-hidden border border-primary/10">
                      {staff.staffProfile?.profileImage ? (
                        <Image src={staff.staffProfile.profileImage} width={48} height={48} alt={staff.name} />
                      ) : (
                        <span className="material-symbols-outlined text-primary">person</span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{staff.name}</p>
                      <p className="text-xs text-on-surface-variant font-medium">{staff.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-wrap gap-1.5">
                    {staff.staffProfile?.skills?.slice(0, 3).map((skill: string) => (
                      <span key={skill} className="px-2.5 py-1 bg-surface-container-high rounded-lg text-[9px] font-black text-on-surface-variant uppercase">
                        {skill}
                      </span>
                    ))}
                    {staff.staffProfile?.skills?.length > 3 && (
                      <span className="text-[9px] font-bold text-primary px-1">+{staff.staffProfile.skills.length - 3} more</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6 text-sm font-medium text-on-surface-variant">
                  {new Date(staff.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="material-symbols-outlined text-base fill-1">star</span>
                    <span className="text-xs font-black">4.8</span>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <button className="px-4 py-2 bg-surface-container-high text-on-surface rounded-lg text-xs font-bold hover:bg-primary hover:text-on-primary transition-all">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {roster.length === 0 && (
          <div className="px-10 py-20 text-center">
            <p className="text-on-surface-variant font-medium">No verified staff found in the roster.</p>
          </div>
        )}
      </div>
    </div>
  );
}
