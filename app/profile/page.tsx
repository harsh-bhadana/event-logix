import MobilePortalLayout from "@/components/layout/MobilePortalLayout";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

export default function ProfilePage() {
  return (
    <MobilePortalLayout activeTab="profile" title="Member Profile">
      <div className="max-w-4xl mx-auto flex flex-col gap-6 p-4">
        {/* Header Profile Card */}
        <Card className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 border-4 border-slate-50 dark:border-slate-800 shadow-sm" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnR19T7hXk9SLuuN9kqqzg1GsPqSJTBUunxFPjzM2vlkR5cCSlYMygMYXS5GPJoxdYWSNgJVJL9C9AtkSw4RH4ovfi0I4A_1JjEU_YL-2KhuyTVs6ZwDQfvTPtx5ctB0BT3-zYezhNh_WJexZytmzKfFByLHoQYcQ6_HfJ_huim5lhShGeKOeZNJbheR1Zrsx6LZNOiT5W4RPHZjr1k9HBVdSAKErQlOuIZFPZ3cf3FaX7hHEqsKnZ-Pa6O4PCbBe6XeHtVzBEbVaO")' }}
            ></div>
            <Button size="icon" className="absolute bottom-0 right-0 rounded-full shadow-lg">
              <Icon name="photo_camera" className="text-sm" />
            </Button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Alex Johnson</h1>
            <p className="text-primary font-medium">Senior Event Volunteer</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-slate-500 dark:text-slate-400 text-sm">
              <span className="flex items-center gap-1"><Icon name="location_on" className="text-base" /> Seattle, WA</span>
              <span className="flex items-center gap-1"><Icon name="calendar_today" className="text-base" /> Joined Jan 2023</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="font-bold shadow-sm">
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Tabs Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          <nav className="flex gap-8 px-2">
            <a className="border-b-2 border-primary text-primary pb-4 px-1 text-sm font-bold" href="#">Personal Info</a>
            <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-4 px-1 text-sm font-medium" href="#">Certifications</a>
            <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-4 px-1 text-sm font-medium" href="#">Schedule</a>
            <a className="border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-primary pb-4 px-1 text-sm font-medium" href="#">History</a>
          </nav>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
          {/* Upcoming Schedule */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Upcoming Schedule</h3>
              <a className="text-primary text-sm font-medium hover:underline" href="#">View Calendar</a>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-lg min-w-[60px] h-[60px] border border-slate-200 dark:border-slate-700 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase">Oct</span>
                  <span className="text-xl font-bold text-primary leading-tight">12</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-900 dark:text-white">Annual Tech Summit</h4>
                  <p className="text-sm text-slate-500">Lead Coordinator • 08:00 AM - 04:00 PM</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Icon name="map" className="text-[14px]" /> Seattle Convention Center</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-lg min-w-[60px] h-[60px] border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-400 uppercase">Oct</span>
                  <span className="text-xl font-bold text-slate-400 dark:text-slate-500 leading-tight">24</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-900 dark:text-white">Charity Gala Run</h4>
                  <p className="text-sm text-slate-500">Registration Desk • 07:00 AM - 12:00 PM</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Icon name="map" className="text-[14px]" /> Waterfront Park</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Certifications */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Certifications</h3>
              <Badge variant="primary" className="cursor-pointer hover:bg-primary/20">+ Add New</Badge>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Icon name="verified_user" className="text-2xl" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">First Aid & CPR Certified</p>
                  <p className="text-xs text-slate-500">Issued by Red Cross • Valid until Dec 2025</p>
                </div>
                <Icon name="more_vert" className="text-slate-400 cursor-pointer" />
              </div>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon name="event_seat" className="text-2xl" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">Crowd Management Professional</p>
                  <p className="text-xs text-slate-500">Issued by FEMA • Lifetime Validity</p>
                </div>
                <Icon name="more_vert" className="text-slate-400 cursor-pointer" />
              </div>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Icon name="warning" className="text-2xl" />
                </div>
                <div className="flex-1 text-slate-400">
                  <p className="font-bold text-sm">Food Safety Handler (Level 1)</p>
                  <p className="text-xs">Expired Mar 2024 • Needs Renewal</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] font-bold uppercase tracking-wider">Renew</Button>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <p className="text-slate-900 dark:text-white font-medium border-b border-slate-100 dark:border-slate-800 pb-2">Alex Johnson</p>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <p className="text-slate-900 dark:text-white font-medium border-b border-slate-100 dark:border-slate-800 pb-2">alex.j@volunteerhub.org</p>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <p className="text-slate-900 dark:text-white font-medium border-b border-slate-100 dark:border-slate-800 pb-2">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Roles</label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Badge variant="neutral">Lead Coordinator</Badge>
                    <Badge variant="neutral">Tech Support</Badge>
                    <Badge variant="neutral">Logistics</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Emergency Contact</label>
                  <p className="text-slate-900 dark:text-white font-medium">Sarah Johnson (Spouse)</p>
                  <p className="text-sm text-slate-500">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MobilePortalLayout>
  );
}
