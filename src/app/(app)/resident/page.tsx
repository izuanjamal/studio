import { ParkingDetails } from "@/components/resident/parking-details";
import { AssignmentHistory } from "@/components/resident/assignment-history";

export default function ResidentPage() {
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
          <ParkingDetails />
        </div>
        <div className="lg:col-span-2">
          <AssignmentHistory />
        </div>
      </div>
    </div>
  );
}
