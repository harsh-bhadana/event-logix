export default function ClientPortalPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Header Section */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 py-3 bg-white dark:bg-slate-900 lg:px-20 sticky top-0 z-50">
            <div className="flex items-center gap-4 text-primary">
              <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary">celebration</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">EventFlow Portal</h2>
            </div>
            <div className="flex flex-1 justify-end gap-4 items-center">
              <div className="flex gap-2">
                <button className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-200">
                  <span className="material-symbols-outlined text-[20px]">notifications</span>
                </button>
                <button className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-200">
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                </button>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-300 overflow-hidden border-2 border-primary/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC15qRRlVcIIvlx7lHofXIyunolClhmQTDmzcWd49FXbTjTupD9DSCBkhBUOy6UqV30hrlaINOZwhq6iM3KA-Nt7Wga-inEVN4hXsjHjp5PC2qYCPBWaZWc17BWp1T0xqPaoeNTj8_FN625CIs4Z9n5Gm4WFNbw3c6Ze6-VK3CklcrftWjK07bbQy2mtu8ERzurrsAkzZNBf4J2iccYMMwan3L2zOqkgXF8xUvK_uoiV35zs7FdG7Af5cPd-b6wrLv_2ED-zLzV95N3" />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col lg:flex-row lg:px-20 py-8 gap-8">
            {/* Sidebar Navigation */}
            <aside className="flex flex-col w-full lg:w-64 shrink-0 gap-6 px-4 lg:px-0">
              <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="The Smiths" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjr8nqrdjq9JVDVWO7DybIb_WOzRZv5NtOYTdY5ql0_ae1Jks9ILIqn1_pQYrcSi0iA7spa9H8votsthj9XqjxtkUgmbglsF1KjAZT02G_b_fYF-cq1uzCksKwwRAXT6Xwr-piWh_aIXFYpEzfJ3ApCqdDlFMfgblJGu1L5D7yVs0f5B8j-Sj-VU4D1S8N8-Cq16HS0Cwh5sbd4XX-gm4J6drnzmGEk1vAJ8Jjytd2nU_r9TEC7sG6Z9mtrQJPrq9geGVCtuMt6Ul8" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-slate-900 dark:text-white text-base font-bold">The Smiths</h1>
                    <p className="text-slate-500 text-xs">Wedding: Oct 12, 2024</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white shadow-md shadow-primary/20" href="#">
                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                    <span className="text-sm font-medium">Dashboard</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    <span className="text-sm font-medium">Messages</span>
                    <span className="ml-auto bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">description</span>
                    <span className="text-sm font-medium">Documents</span>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                    <span className="text-sm font-medium">Payments</span>
                  </a>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/10">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Overall Progress</p>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-2xl font-black text-primary">68%</span>
                  <span className="text-xs text-slate-500 mb-1">Final Stretch</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '68%' }}></div>
                </div>
              </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 flex flex-col gap-8 px-4 lg:px-0">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 overflow-x-auto">
                <a className="flex flex-col items-center border-b-2 border-primary text-primary pb-3 transition-colors" href="#">
                  <span className="text-sm font-bold">Overview</span>
                </a>
                <a className="flex flex-col items-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-3 transition-colors" href="#">
                  <span className="text-sm font-bold">Mood Board</span>
                </a>
                <a className="flex flex-col items-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-3 transition-colors" href="#">
                  <span className="text-sm font-bold">Budget</span>
                </a>
                <a className="flex flex-col items-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-3 transition-colors" href="#">
                  <span className="text-sm font-bold">Guest List</span>
                </a>
              </div>
              {/* Hero Section */}
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Planning Status Update</h2>
                <p className="text-slate-500 dark:text-slate-400">Everything is on track for your October wedding. Take a look at the latest updates below.</p>
              </div>
              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mood Board Preview */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">Design & Mood Board</h3>
                    <button className="text-primary text-sm font-semibold">View All</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square rounded-lg bg-slate-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Floral wedding centerpiece with white roses" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoUarNdyOovaNSAbM6PJ-dc1Eo-5VrG6ZEkmZEwlcPobTBxcIehdZqpHagAf5eN2jBgf7olPA6_C2TUSCJeW8mootiADNCZVVRlBcGo_zGKSKzAhPVbsCnMrcrA5tlIZimo1YBqfpiTASGw9Miwe0OUtL4rGLXC6P-ByAatySsfKda6Q_TPkWWR8JQC11Sn-PynbYmVOaS6oBerpKa8munmKg5r3OectzmIjYlMLb9yDZk1CARu8F2ymprSUnOPZlFZr9ui-P6xdAI" />
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                      <div className="rounded-lg bg-slate-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="Elegant table setting with gold cutlery" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMAYqVh9lLoZH6qSJVg-E-vtcBbkqw2Qt-Ux4Qas_ktE47724SsKXaPnlZzwALV5gk-AWtmD87EWoKzbcwlLQqruxOmdfNHkiciEzwvhszVjdPse4gmVZEeY67GlGlrRH36EbPIBwl8ciMcDuN_3S-_B3hW9asitJXfXfMQeq4RV9PcMs7naC02IRJBrKdVjYVxTh2B6zGWMMV8ewl70VxJBivqT8naRV8PFdz2MC0NRJffUeoGaceu0xn-yz8063e11p9XRddrMrn" />
                      </div>
                      <div className="rounded-lg bg-slate-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="Silk bridesmaid dresses in blush pink" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM_0ltC7Y6FVh5EM5tjRwHXttGh_keD5ZlSfyoqjNSwgBmfznCn_H_5WrD3NgWVgTGm6CfeKKvztFIXSbZN_NEhx79gJdB4m9nSbCi4-sZ5O1nkiHlLDmrguvxQoT7QuaW4c817RpIP6qvOy6YXPZefGaZ1WkNyZcvrubNEpyXT0gNVwzbK_wZCsjv4VRYijB6zMRpM6I_3cst-OibS_2DWlF6q3zQFJijbjgG2GW10CkmSqdymplfKdTgs_h0ST1aFxcRU19W9sII" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">Theme: Modern Romanticism • Palette: Sage, Cream, & Antique Gold</p>
                </div>
                {/* Budget Summary */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">Budget Overview</h3>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold rounded uppercase">Under Budget</span>
                  </div>
                  <div className="space-y-4 py-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Total Spent</span>
                        <span className="font-bold text-slate-900 dark:text-white">$24,500 / $45,000</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '54%' }}></div>
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
                </div>
                {/* Guest List Status */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">Guest List & RSVPs</h3>
                    <button className="text-primary text-sm font-semibold">Manage List</button>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="relative size-24 shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle className="stroke-slate-100 dark:stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                        <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="35" strokeLinecap="round" strokeWidth="3"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-slate-900 dark:text-white">65%</span>
                        <span className="text-[8px] uppercase font-bold text-slate-400">RSVPs</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-primary"></div>
                          <span className="text-slate-600 dark:text-slate-400">Confirmed</span>
                        </div>
                        <span className="font-bold">98</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-slate-300"></div>
                          <span className="text-slate-600 dark:text-slate-400">Pending</span>
                        </div>
                        <span className="font-bold">42</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-red-400"></div>
                          <span className="text-slate-600 dark:text-slate-400">Declined</span>
                        </div>
                        <span className="font-bold">10</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Messaging Preview */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">Recent Messages</h3>
                    <button className="text-primary text-sm font-semibold">Open Chat</button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                      <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-sm">person</span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Sarah (Manager)</span>
                          <span className="text-[10px] text-slate-400">2h ago</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">I&apos;ve updated the floral arrangements gallery with the new sage samples.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-2 rounded-lg">
                      <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-slate-500 text-sm">support_agent</span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Catering Dept.</span>
                          <span className="text-[10px] text-slate-400">Yesterday</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate">The tasting session is confirmed for next Tuesday at 4 PM.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-2">
                    <div className="relative">
                      <input className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Quick reply..." type="text" />
                      <button className="absolute right-2 top-1.5 text-primary">
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Calendar / Upcoming Deadlines */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
                <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                  <span className="bg-primary px-2 py-1 rounded text-[10px] font-bold uppercase">Up Next</span>
                  <h4 className="text-xl font-bold">Venue Walkthrough</h4>
                  <p className="text-slate-400 text-sm">Friday, August 15th • 2:30 PM at The Grand Estate</p>
                </div>
                <div className="h-12 w-px bg-slate-800 hidden md:block"></div>
                <div className="flex -space-x-2">
                  <div className="size-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkkmbs8THh7Tm6PEzbi3Gsp1CaL7hltOEkcxHCxRnpfeNaplgVtjKV_RxHG0BFCO6gvkQ-9njCl64jV54YdnAtc260XDeqXn3RbtaACwZxnDwmb-Bx5-BFVpnOjQDxKNX7O4JXRkBchDsJtuu142c_frEp4kN1QEINGViNsSGXAYRw3tMzx79_-mHe5QJeB1-JMWKxJryzo5seeO92JzNklR0qu7adk8I69nIy6QkOdfiy9DUZpl_SEWOqdLuwl6QfvF9Oy-I3HQTg" />
                  </div>
                  <div className="size-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnFatAY55dYp1Snoz_Q3x5oNk_2EtA10mFIQ3X-g49uUaLP4JURpJ2AFxVQN3XKVqC_BlONdUR9AEYzICWhwpzTJS8-OHN5j6_Dwx4tgYKB8to_5nxrmyZfn2v-ubOcfdCtTla8KKHu66GipH7rQD7K6I61Edr6NWME49XQoSFrIa_pY8KB9aS7oLXLWTAeM3qAk2bRvt2tXHAziOeNK_7pci5sFa2_1YO7LIlh-GwgJYy7GIKwLXFU3RzqcAVo7cu_ozhBuq6ZQ-4" />
                  </div>
                  <div className="size-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoXsBILWp4ugZ9Y5i6uX_QZHfMaVkSVV217hVJlgoOMcs0o2FHS2mtOm-Y1hyWAfQb2qLWNIZTxJVjoxfcAK2Hmm5w8w4rxUiVzrIlZLXTOO_VEE1CvZRua_aPZoUIhnt_NqEfINxQMpzre2hJu2rRnem7s8FOlzc-gSGQe_KlDzyHoveBWM7Ff6HCcJdS9ANjYJGYf9mz9J1cQIKsRi7YYWhseQ6P0pxjdcOqOic3HkIgbFkl3LXWs6K-9PDsRMG0QSIJGp_S1WD7" />
                  </div>
                </div>
                <button className="md:ml-auto w-full md:w-auto bg-white text-slate-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">
                  View Calendar
                </button>
              </div>
            </main>
          </div>
          {/* Footer */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-6 lg:px-20 mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-xs">© 2024 EventFlow Collaboration Portal. All rights reserved.</p>
              <div className="flex gap-6">
                <a className="text-slate-400 hover:text-primary transition-colors text-xs font-medium" href="#">Privacy Policy</a>
                <a className="text-slate-400 hover:text-primary transition-colors text-xs font-medium" href="#">Terms of Service</a>
                <a className="text-slate-400 hover:text-primary transition-colors text-xs font-medium" href="#">Help Center</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
