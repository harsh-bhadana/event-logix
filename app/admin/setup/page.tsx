import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Input, Select, Checkbox } from "@/components/ui/Input";

export default function EventSetupPage() {
  const currentFocus = {
    title: "Grand Victorian Wedding",
    progress: 65,
    tasksLabel: "65% Tasks Completed"
  };

  return (
    <DashboardLayout currentFocus={currentFocus}>
      <div className="max-w-[1000px] mx-auto">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex mb-4 text-sm text-slate-500">
          <ol className="flex items-center space-x-2">
            <li><a className="hover:text-primary" href="#">Events</a></li>
            <li><Icon name="chevron_right" className="text-sm" /></li>
            <li className="text-slate-900 dark:text-slate-100 font-medium">Create New Event</li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Setup New Event</h1>
            <p className="text-slate-500 text-base">Configure the core details and initial checklist for your upcoming production.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Save Draft</Button>
            <Button>Publish Event</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="info" />
                  <CardTitle>Basic Information</CardTitle>
                </div>
              </CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input label="Event Name" placeholder="e.g., Grand Victorian Wedding" defaultValue="Grand Victorian Wedding" />
                </div>
                <Input label="Event Date" type="date" />
                <Input label="Expected Guests" placeholder="0" type="number" />
                <div className="md:col-span-2">
                  <Select label="Venue Selection" defaultValue="The Crystal Palace Ballroom">
                    <option>Select a venue...</option>
                    <option>The Crystal Palace Ballroom</option>
                    <option>Grand Heritage Gardens</option>
                    <option>Riverside Manor</option>
                    <option>Skyline Rooftop</option>
                  </Select>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="map" />
                  <CardTitle>Venue Map Preview</CardTitle>
                </div>
              </CardHeader>
              <div className="aspect-video w-full rounded-lg bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-slate-200/50 dark:to-slate-800/50 z-0"></div>
                <div className="z-10 text-center">
                  <Icon name="location_on" className="text-5xl text-primary mb-2" />
                  <p className="font-bold text-slate-900 dark:text-slate-100">The Crystal Palace Ballroom</p>
                  <p className="text-sm text-slate-500">123 Victorian Lane, London, UK</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Tools / Checklist */}
          <div className="flex flex-col gap-6">
            <Card className="h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="checklist" />
                  <CardTitle className="text-lg">Setup Tasks</CardTitle>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">High Level</span>
              </div>
              <div className="flex flex-col gap-4">
                <Checkbox 
                  label="Venue Booking Confirmed" 
                  description="Deposit paid and contract signed" 
                  defaultChecked 
                />
                <Checkbox 
                  label="Catering Menu Finalized" 
                  description="Tasting complete, dietary needs noted" 
                  defaultChecked 
                />
                <Checkbox 
                  label="Invitation Design & Print" 
                  description="Awaiting final proof from designer" 
                />
                <Checkbox 
                  label="Floral Arrangements" 
                  description="Selection of Victorian-style roses" 
                />
                <Checkbox 
                  label="Audio/Visual Setup" 
                  description="Microphones and ambient soundscape" 
                />
                
                <button className="mt-2 w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:border-primary hover:text-primary transition-all text-sm font-medium">
                  <Icon name="add" className="text-sm" /> Add Custom Task
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Days Left</p>
                    <p className="text-xl font-black text-primary">124</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Vendors</p>
                    <p className="text-xl font-black text-primary">8</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
