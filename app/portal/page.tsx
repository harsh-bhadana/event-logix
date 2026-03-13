import MobilePortalLayout from "@/components/layout/MobilePortalLayout";
import { Card } from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

export default function StaffPortalPage() {
  return (
    <MobilePortalLayout activeTab="schedule" title="Staff Portal">
      <div className="flex flex-col gap-6 p-4 pb-20">
        {/* Profile Summary in Header style */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon name="account_circle" className="text-3xl" />
          </div>
          <div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">Welcome back, Alex</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">You have 1 active shift today</p>
          </div>
        </div>

        {/* Current Shift Section */}
        <div className="flex flex-col gap-3">
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight px-2">Current Shift</h2>
          <Card className="overflow-hidden" noPadding>
            <div 
              className="w-full h-48 bg-center bg-no-repeat bg-cover relative" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZlblKwGXONI8Or5cogjeDWEZLYGar_3jm4dhzx3jnBd1GSYvdpdFQeK7BIuIT1QR3JuBtOZAwQ8_WZzXE9cJbb2mnSoI3_n5z9ibR3tuJ5ccPWwTlPlk-zzdQrZQC4I1F4jWApBI5W4bxmsLN4mqLWr48Lf80v83xoi-YIDifwZ7rGVguX1k-V4ogrTy-PLg7QvCxX57yVZTuUG1k1tLig4V4QnchT_hHp88xcVGvRUHDk4bljuULCk0juc_EWC9-oBJS6-GMVoBv')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 rounded-md bg-primary text-white text-[10px] font-bold uppercase tracking-wider">Active Today</span>
              </div>
            </div>
            <div className="flex flex-col p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight">Morning Volunteer Shift</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-1">
                    <Icon name="location_on" className="text-sm" /> Community Center
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                    <Icon name="schedule" className="text-sm" /> 08:00 AM - 12:00 PM
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20">
                  <Icon name="login" />
                  Check-In Now
                </Button>
                <Button variant="secondary" className="w-full h-12 text-sm font-semibold">
                  <Icon name="description" className="text-[20px]" />
                  View Briefing
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Next Shifts */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">Next Shifts</h3>
            <button className="text-primary text-sm font-semibold">See all</button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { month: "Oct", day: "14", title: "Evening Distribution", desc: "Food Bank • 05:00 PM - 09:00 PM" },
              { month: "Oct", day: "16", title: "Workshop Support", desc: "Main Hall • 09:00 AM - 01:00 PM" },
            ].map((shift, i) => (
              <Card key={i} className="flex items-center gap-4 py-3">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <span className="text-[10px] font-bold uppercase">{shift.month}</span>
                  <span className="text-lg font-bold leading-none">{shift.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate">{shift.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs truncate">{shift.desc}</p>
                </div>
                <Icon name="chevron_right" className="text-slate-400" />
              </Card>
            ))}
          </div>
        </div>

        {/* Announcements / Support */}
        <div className="px-2">
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="info" className="text-primary" />
              <h4 className="text-primary font-bold">Today&apos;s Update</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              The North Gate will be closed for maintenance. Please use the main entrance for check-in.
            </p>
          </div>
        </div>
      </div>
    </MobilePortalLayout>
  );
}
