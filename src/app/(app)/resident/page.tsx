import { ParkingDetails } from "@/components/resident/parking-details";
import { AssignmentHistory } from "@/components/resident/assignment-history";
import { mockAssignments } from "@/lib/mock-data";

export default function ResidentPage() {
  // In a real app, you would fetch the specific resident's data.
  // Here, we'll use the second assignment as a mock for the logged-in user to match the profile page.
  const currentAssignment = mockAssignments[1];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Parking Portal</h1>
        <p className="text-muted-foreground">
          View your current parking assignment and history.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ParkingDetails assignment={currentAssignment} />
        </div>
        <div className="lg:col-span-2">
          <AssignmentHistory />
        </div>
      </div>
    </div>
  );
}
