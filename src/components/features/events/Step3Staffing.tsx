"use client";

import { useWizard, WizardData } from "@/hooks/useEventWizard";

export function Step3Staffing() {
  const { data, updateData } = useWizard();

  const totalPersonnel = data.staffRoles.reduce((sum: number, role: WizardData["staffRoles"][0]) => sum + role.headcount, 0);

  const updateHeadcount = (id: string, delta: number) => {
    const newRoles = data.staffRoles.map((role: WizardData["staffRoles"][0]) =>
      role.id === id ? { ...role, headcount: Math.max(0, role.headcount + delta) } : role
    );
    updateData({ staffRoles: newRoles });
  };

  const removeRole = (id: string) => {
    const newRoles = data.staffRoles.filter((role: WizardData["staffRoles"][0]) => role.id !== id);
    updateData({ staffRoles: newRoles });
  };

  return (
    <div className="flex-1 p-12 max-w-5xl mx-auto w-full animate-fade-in">
      <header className="mb-12">
        <h2 className="font-headline font-extrabold text-4xl text-on-background tracking-tight mb-2">Configure Personnel</h2>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          Define the operational framework for your event by assigning roles and headcounts. High-performing events rely on precision staffing.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {data.staffRoles.map((role) => (
            <div
              key={role.id}
              className="bg-surface-container-lowest p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between group border-l-4 border-primary shadow-[0_4px_20px_rgba(41,105,91,0.04)] transition-all border border-outline-variant/10"
            >
              <div className="flex items-center gap-6 mb-4 sm:mb-0">
                <div className="bg-primary-container p-3 rounded-lg text-primary">
                  <span className="material-symbols-outlined">{role.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-on-background">{role.name}</h4>
                  <p className="text-xs text-on-surface-variant font-medium">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Required Headcount</label>
                  <div className="flex items-center bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10">
                    <button onClick={() => updateHeadcount(role.id, -1)} className="p-2 hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <input type="number" readOnly className="w-12 bg-transparent border-none text-center font-bold text-on-surface focus:ring-0 p-0" value={role.headcount} />
                    <button onClick={() => updateHeadcount(role.id, 1)} className="p-2 hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
                <button onClick={() => removeRole(role.id)} className="text-error/30 hover:text-error transition-colors p-2">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}

          <button className="border-2 border-dashed border-outline-variant/30 rounded-xl p-8 flex flex-col items-center gap-3 hover:bg-surface-container-low hover:border-primary/50 transition-all duration-300">
            <div className="bg-primary text-on-primary rounded-full p-2">
              <span className="material-symbols-outlined">add</span>
            </div>
            <span className="font-bold text-primary text-sm uppercase tracking-wide">Add Custom Staff Role</span>
          </button>
        </div>

        <div className="col-span-12 lg:col-span-4 sticky top-24">
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
            <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Staffing Summary
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                <span className="text-on-surface-variant font-medium">Total Personnel</span>
                <span className="text-2xl font-black text-primary">{totalPersonnel}</span>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Resource Distribution</label>
                <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-surface-container-high">
                  {data.staffRoles.map((role, idx) => {
                    const width = totalPersonnel > 0 ? (role.headcount / totalPersonnel) * 100 : 0;
                    const colors = ["bg-primary", "bg-secondary", "bg-tertiary"];
                    return <div key={role.id} className={colors[idx % colors.length]} style={{ width: `${width}%` }}></div>;
                  })}
                </div>
              </div>
              <div className="bg-tertiary-container/30 p-4 rounded-lg mt-4 border border-tertiary/10 text-xs text-on-tertiary-container">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                  <p>Based on your event size, your current security ratio is optimal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
