import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Input";

export default function SchedulerPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full -m-8">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Main Event Timeline</h1>
            <p className="text-slate-500 text-sm">Saturday, July 20th, 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <Button variant="ghost" size="sm" className="bg-white dark:bg-slate-700 shadow-sm text-xs px-3">Day</Button>
              <Button variant="ghost" size="sm" className="text-slate-500 text-xs px-3">Week</Button>
              <Button variant="ghost" size="sm" className="text-slate-500 text-xs px-3">Month</Button>
            </div>
            <Button className="shadow-lg shadow-primary/20">
              <Icon name="publish" className="text-[18px]" />
              Publish Schedule
            </Button>
          </div>
        </div>

        {/* Scheduler Controls */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          <Button variant="outline" size="sm" className="bg-white dark:bg-slate-800">
            <Icon name="filter_list" className="text-[18px]" />
            Filters
          </Button>
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
          <div className="flex gap-2">
            <Badge variant="primary" className="gap-1 flex items-center bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <span className="size-2 rounded-full bg-blue-500"></span> Security
            </Badge>
            <Badge variant="danger" className="gap-1 flex items-center bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
              <span className="size-2 rounded-full bg-red-500"></span> Medical
            </Badge>
            <Badge variant="success" className="gap-1 flex items-center bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-500"></span> General
            </Badge>
          </div>
        </div>

        {/* Gantt Chart Container */}
        <div className="flex-1 overflow-auto bg-white dark:bg-slate-900">
          <div className="min-w-[1200px]">
            {/* Time Header */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <div className="w-48 p-4 font-bold text-sm text-slate-400 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">Locations</div>
              <div className="flex flex-1">
                {["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM", "10:00 PM"].map((time, i) => (
                  <div key={i} className="flex-1 p-4 text-center border-r border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400">{time}</div>
                ))}
              </div>
            </div>
            {/* Rows */}
            <div className="relative">
              {/* Grid Overlay Lines */}
              <div className="absolute inset-0 flex pointer-events-none">
                <div className="w-48 border-r border-slate-100 dark:border-slate-800"></div>
                <div className="flex-1 grid grid-cols-8 divide-x divide-slate-100 dark:divide-slate-800 h-full">
                  <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
              </div>
              {/* Row: Main Stage */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 group h-32">
                <div className="w-48 p-4 font-bold border-r border-slate-200 dark:border-slate-800 flex flex-col justify-center bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-900 dark:text-slate-100">Main Stage</span>
                  <span className="text-xs font-normal text-slate-400">6 Staff Active</span>
                </div>
                <div className="flex-1 relative p-4 flex items-center">
                  {/* Shift A */}
                  <div className="absolute left-[10%] w-[35%] h-20 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-3 cursor-move shadow-sm group/shift hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase">Security Shift A</p>
                      <Icon name="drag_indicator" className="text-blue-400 text-[16px] group-hover/shift:visible invisible" />
                    </div>
                    <p className="text-[10px] text-blue-700 dark:text-blue-300 mt-1">4 Staff: Sarah, Tom +2</p>
                    <div className="mt-2 flex -space-x-2">
                      <div className="size-5 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqt_JaErQkEd2dXP9GVVNIjcEl7PiROS5QginwXq1D8BAvxPPtK2ErLUX8v6wsaaoJvhbCqSkFdcTy7g2OOwRsnySjzbFRU7ZhjpKswQJWlJIRooEr59IYZj-ZwuM4CAaLqwRrdKe7Z3QXmN2RvlC1-ayvjZEq9PbC7XW_Cj-wnkFk_7nK-3Dnkm7WsETtrCP2M9rlYUxw42qH3GuvZDJxUQHmrFuj9aTHwvp06tmF6UxIO5A7XZtep8YsMT4dlK48fJqL-6lcBMPx')" }}></div>
                      <div className="size-5 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-ERWDBKBHJfO-jCqZOVsBqcvZiKAALoGafQ5DQ9Fm6fdneqtVMDD5U7cg6NPcxAgce6Bx_Q1NuDOhDiG_BGxolm1vMYxUMcc1y4qrkoQ1QW1YhsE-jcop_rECKEg3HbvldFG0aC05jm90K13WYFT8PGqSDQQbWFh94qzHQZNHDqQWLpjQ98ihetzBadFU03887XGNBpNJdTUnR63LWX6YqvgBr91M2CGVQreESC-rauZuUvX7HOfkifmcMiVsYJTGjNDMDD-bkx1O')" }}></div>
                    </div>
                  </div>
                  {/* Shift B */}
                  <div className="absolute left-[50%] w-[25%] h-20 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg p-3 cursor-move shadow-sm group/shift hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase">Stage Hands</p>
                      <Icon name="drag_indicator" className="text-emerald-400 text-[16px] group-hover/shift:visible invisible" />
                    </div>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-300 mt-1">2 Staff: Mike, Anna</p>
                  </div>
                </div>
              </div>
              {/* Row: Entrance */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 group h-32">
                <div className="w-48 p-4 font-bold border-r border-slate-200 dark:border-slate-800 flex flex-col justify-center bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-900 dark:text-slate-100">Entrance</span>
                  <span className="text-xs font-normal text-slate-400">12 Staff Active</span>
                </div>
                <div className="flex-1 relative p-4 flex items-center">
                  <div className="absolute left-[0%] w-[100%] h-20 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-3 cursor-move shadow-sm group/shift hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase">Ticketing & Security Full Day</p>
                      <Icon name="drag_indicator" className="text-blue-400 text-[16px] group-hover/shift:visible invisible" />
                    </div>
                    <p className="text-[10px] text-blue-700 dark:text-blue-300 mt-1">12 Staff Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Staff On Duty</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">42</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Open Positions</p>
              <p className="text-lg font-bold text-red-500">3</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Budget Used</p>
              <p className="text-lg font-bold text-emerald-500">74%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Export CSV</Button>
            <Button size="sm">Save Draft</Button>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
}
