import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function LocationsPage() {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-120px)] overflow-hidden -m-8">
        {/* Sidebar Management */}
        <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-10">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Venue Management</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Metropolitan Stadium Site Plan</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Layer Toggle */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase px-2">Map Layers</p>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                <Icon name="layers" />
                <p className="text-sm font-semibold">All Active Zones</p>
                <Icon name="check_circle" className="ml-auto text-sm" />
              </div>
              {[
                { icon: "inventory_2", label: "Equipment Depots" },
                { icon: "medical_services", label: "Medical Stations" },
                { icon: "group", label: "Staffing Density" },
              ].map((layer, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-600 dark:text-slate-400">
                  <Icon name={layer.icon} />
                  <p className="text-sm font-medium">{layer.label}</p>
                </div>
              ))}
            </div>
            {/* Selection Details */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4 px-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zone: North Gate B</h4>
                <Badge variant="success" className="text-[10px]">ACTIVE</Badge>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Assigned Staff (12/15)</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: "Marcus Chen (Lead)", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb-HeE8PzwWLZHY15gHsZjGDcxTJTrBE-lfaup7RgR74EwITjQS2Kot0Cy7fMNZMDkETaTy8h4Cpb3siIABaJ6V5bchHCOFy9rg8Pymc4I2mXYY9bHzRMlFpDr0k3RwGP8epmV0mavHjDZtAmMSm76iobwesJIBMwOBfZY14gtb3WW9LYMEoZC_ECzfPu9jV-x52LKz7-wCPxJ33DLMWl8N8OS_vgZzgrE68vvnb4vEPGWdowSIRbamteChiIxsPRHaWjaGfUB7AV5" },
                      { name: "Sarah Jenkins", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUC6Pt7EtrYESxnwmWVF5kumcfwozngNjyVwf7VFhZSb7qLX-SFAGdJTvsWFr0Xm9-96YPd1fPUadUKNUKqi_ZYq72AT9W9xq8vt55U1QJbXyOkwfsQUS-F0JysniinBGnraLKcsC-_PcZJd-FTwS9nctp4yW2srAsH8nPQGMNDKAM16K4TfifBBiqtCBngbdzeP4Vl8hJzDshqsJZFfYuKt8KIQKDhG7IA8uXyWNvyrnnVm7ySv95JVmaOoE4wfdGO8n8RXjPQpsG" },
                    ].map((staff, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={staff.name} className="size-6 rounded-full" src={staff.img}/>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{staff.name}</span>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="mt-2 h-auto py-1 text-primary">
                      <Icon name="person_add" className="text-sm" /> Manage Roster
                    </Button>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Critical Assets</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-400">Radios (Digital)</span>
                      <span className="font-bold text-slate-900 dark:text-white">18/20</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[90%]"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-600 dark:text-slate-400">First Aid Kits</span>
                      <span className="font-bold text-slate-900 dark:text-white">04/04</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
              <Button className="w-full">
                <Icon name="add_location" />
                Place New Pin
              </Button>
            </div>
          </aside>

          {/* Main Map Area */}
          <main className="flex-1 relative bg-slate-200 dark:bg-slate-950">
            {/* Interactive Map Background */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center overflow-hidden flex items-center justify-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2o6yPzwXpQnuHt92gaXBBC550Dk8mvgcNlUmGhzYdRMkKhWmXYuX-_fEM99DAs4Ux6AsCXeAy9T6He7zz8997j1itegh7X-qIGAHlc10ImiQAbfAo0TMI1Lo4byeNoHGnE53cf2Xq0Uh1gwZyf95rOhKyPeA28yu5DBhbKUQx1NvLUOCIFut6zwJjntg5CtJbm-YuMA9ck8kgsE2BiwHAPYmwVs8RcFOxqwg90PLiVTRX2sdn0KzpC2ObZ87DrduNXEBQNSLGBY68')" }}
            >
              <div className="absolute inset-0 bg-primary/5"></div>
              {/* Pins */}
              <div className="absolute top-[25%] left-[40%] group cursor-pointer">
                <div className="bg-primary text-white p-2 rounded-full shadow-xl ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 transition-transform">
                  <Icon name="stadium" />
                </div>
              </div>
              <div className="absolute top-[45%] left-[65%] group cursor-pointer">
                <div className="bg-red-500 text-white p-1.5 rounded-full shadow-xl ring-4 ring-white dark:ring-slate-900 animate-pulse">
                  <Icon name="medical_services" />
                </div>
              </div>
              <div className="absolute bottom-[30%] left-[25%] group cursor-pointer">
                <div className="bg-amber-500 text-white p-2 rounded-lg shadow-xl ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 transition-transform">
                  <Icon name="inventory_2" />
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
              <div className="flex flex-col rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 border-b border-slate-200 dark:border-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                  <Icon name="add" />
                </button>
                <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                  <Icon name="remove" />
                </button>
              </div>
              <Button size="icon" className="shadow-2xl h-12 w-12 bg-white dark:bg-slate-900 text-primary border border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white">
                <Icon name="my_location" />
              </Button>
            </div>

            {/* Floating Search Bar */}
            <div className="absolute top-6 left-6 z-10 w-72">
               <div className="bg-white dark:bg-slate-900 p-1 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800">
                 <Input icon="search" placeholder="Jump to zone..." className="border-none bg-transparent shadow-none h-10" />
               </div>
            </div>

            {/* Bottom Summary Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-2xl">
              <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Total Active Staff</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">142</span>
                  </div>
                  <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Open Incidents</span>
                    <span className="text-xl font-bold text-red-500">03</span>
                  </div>
                  <div className="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">System Status</span>
                    <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                      <span className="size-2 bg-green-500 rounded-full"></span> Online
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Event Log</Button>
                  <Button variant="danger" size="sm" className="shadow-lg shadow-red-500/20">Emergency Broadcast</Button>
                </div>
              </Card>
            </div>
          </main>
      </div>
    </DashboardLayout>
  );
}
