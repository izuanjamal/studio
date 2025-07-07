import { Button } from "@/components/ui/button";
import { FileDown, PlusCircle } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AssignmentChart } from "@/components/dashboard/assignment-chart";
import { AssignmentTable } from "@/components/dashboard/assignment-table";
import { mockAssignments } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time overview of parking assignments.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Generate Assignments
          </Button>
        </div>
      </div>

      <StatsCards />
      
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AssignmentChart />
        </div>
        <div className="lg:col-span-2">
           {/* Placeholder for another chart or info panel */}
        </div>
      </div>
      
      <AssignmentTable assignments={mockAssignments} />
    </div>
  );
}
