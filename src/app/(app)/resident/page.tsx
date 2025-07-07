"use client";

import { useEffect, useState } from "react";
import { ParkingDetails } from "@/components/resident/parking-details";
import { AssignmentHistory } from "@/components/resident/assignment-history";
import { useAuth } from "@/hooks/use-auth";
import { getAssignmentsByUserId } from "@/lib/firestore";
import type { Assignment } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResidentPage() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchAssignments = async () => {
        try {
          const userAssignments = await getAssignmentsByUserId(user.uid);
          setAssignments(userAssignments);
        } catch (error) {
          console.error("Failed to fetch assignments:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAssignments();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <ResidentSkeleton />;
  }
  
  // Assuming the first assignment is the current one.
  const currentAssignment = assignments.length > 0 ? assignments[0] : undefined;

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
          <AssignmentHistory assignments={assignments} />
        </div>
      </div>
    </div>
  );
}


function ResidentSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Skeleton className="h-9 w-72 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  );
}
