import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function ClientPortalPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:px-10 py-4 gap-8">
        {/* Hero Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Planning Status Update</h2>
          <p className="text-slate-500 dark:text-slate-400">Everything is on track for your October wedding. Take a look at the latest updates below.</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mood Board Preview */}
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Design & Mood Board</h3>
              <Button variant="ghost" size="sm" className="text-primary">View All</Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Floral wedding centerpiece with white roses" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoUarNdyOovaNSAbM6PJ-dc1Eo-5VrG6ZEkmZEwlcPobTBxcIehdZqpHagAf5eN2jBgf7olPA6_C2TUSCJeW8mootiADNCZVVRlBcGo_zGKSKzAhPVbsCnMrcrA5tlIZimo1YBqfpiTASGw9Miwe0OUtL4rGLXC6P-ByAatySsfKda6Q_TPkWWR8JQC11Sn-PynbYmVOaS6oBerpKa8munmKg5r3OectzmIjYlMLb9yDZk1CARu8F2ymprSUnOPZlFZr9ui-P6xdAI" />
              </div>
              <div className="grid grid-rows-2 gap-2">
                <div className="rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Elegant table setting with gold cutlery" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMAYqVh9lLoZH6qSJVg-E-vtcBbkqw2Qt-Ux4Qas_ktE47724SsKXaPnlZzwALV5gk-AWtmD87EWoKzbcwlLQqruxOmdfNHkiciEzwvhszVjdPse4gmVZEeY67GlGlrRH36EbPIBwl8ciMcDuN_3S-_B3hW9asitJXfXfMQeq4RV9PcMs7naC02IRJBrKdVjYVxTh2B6zGWMMV8ewl70VxJBivqT8naRV8PFdz2MC0NRJffUeoGaceu0xn-yz8063e11p9XRddrMrn" />
                </div>
                <div className="rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Silk bridesmaid dresses in blush pink" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM_0ltC7Y6FVh5EM5tjRwHXttGh_keD5ZlSfyoqjNSwgBmfznCn_H_5WrD3NgWVgTGm6CfeKKvztFIXSbZN_NEhx79gJdB4m9nSbCi4-sZ5O1nkiHlLDmrguvxQoT7QuaW4c817RpIP6qvOy6YXPZefGaZ1WkNyZcvrubNEpyXT0gNVwzbK_wZCsjv4VRYijB6zMRpM6I_3cst-OibS_2DWlF6q3zQFJijbjgG2GW10CkmSqdymplfKdTgs_h0ST1aFxcRU19W9sII" />
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500">Theme: Modern Romanticism • Palette: Sage, Cream, & Antique Gold</p>
          </Card>

          {/* Budget Summary */}
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Budget Overview</h3>
              <Badge variant="success" className="uppercase text-[10px]">Under Budget</Badge>
            </div>
            <div className="space-y-4 py-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Total Spent</span>
                  <span className="font-bold text-slate-900 dark:text-white">$24,500 / $45,000</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: '54%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500">Upcoming Payment</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">$4,200</p>
                  <p className="text-[10px] text-slate-400">Due in 5 days</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500">Vendors Paid</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">8 / 12</p>
                  <p className="text-[10px] text-slate-400">4 pending final</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Guest List Status */}
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Guest List & RSVPs</h3>
              <Button variant="ghost" size="sm" className="text-primary">Manage List</Button>
            </div>
            <div className="flex gap-4 items-center">
              <div className="relative size-24 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle className="stroke-slate-100 dark:stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                  <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="35" strokeLinecap="round" strokeWidth="3"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-900 dark:text-white">65%</span>
                  <span className="text-[8px] uppercase font-bold text-slate-400">RSVPs</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {[
                  { label: "Confirmed", val: 98, color: "bg-primary" },
                  { label: "Pending", val: 42, color: "bg-slate-300 dark:bg-slate-600" },
                  { label: "Declined", val: 10, color: "bg-red-400" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${item.color}`}></div>
                      <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Messaging Preview */}
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Recent Messages</h3>
              <Button variant="ghost" size="sm" className="text-primary">Open Chat</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Sarah (Manager)", time: "2h ago", msg: "I've updated the floral arrangements gallery with the new sage samples.", icon: "person", isSupport: false },
                { name: "Catering Dept.", time: "Yesterday", msg: "The tasting session is confirmed for next Tuesday at 4 PM.", icon: "support_agent", isSupport: true },
              ].map((chat, i) => (
                <div key={i} className={`flex gap-3 items-start p-2 rounded-lg ${!chat.isSupport ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}>
                  <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${!chat.isSupport ? 'bg-primary/20 text-primary' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                    <Icon name={chat.icon} className="text-sm" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{chat.name}</span>
                      <span className="text-[10px] text-slate-400">{chat.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{chat.msg}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-2">
              <div className="relative">
                <Input placeholder="Quick reply..." className="h-9 text-xs pr-10" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                  <Icon name="send" className="text-[18px]" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Calendar / Upcoming Deadlines */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <Badge variant="primary" className="w-fit uppercase text-[10px]">Up Next</Badge>
            <h4 className="text-xl font-bold">Venue Walkthrough</h4>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Icon name="event" className="text-sm" />
              Friday, August 15th • 2:30 PM at The Grand Estate
            </div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden md:block"></div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="size-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden">
                 <Icon name="person" className="text-white/50" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="md:ml-auto w-full md:w-auto bg-white/5 border-white/10 hover:bg-white/10 text-white">
            View Calendar
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
