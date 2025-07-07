
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, PlusCircle, Trash2 } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AssignmentChart } from "@/components/dashboard/assignment-chart";
import { AssignmentTable } from "@/components/dashboard/assignment-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Assignment } from "@/types";
import { getAllAssignments, deleteAllAssignments } from "@/lib/firestore";
import { generateAssignments } from "@/ai/flows/generate-assignments-flow";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function DashboardPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedAssignments = await getAllAssignments();
      setAssignments(fetchedAssignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      toast({
        title: "Error",
        description: "Failed to load parking assignments.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleResetAssignments = async () => {
    try {
      await deleteAllAssignments();
      setAssignments([]);
      toast({
        title: "Assignments Reset",
        description: "All parking assignments have been cleared from the database.",
      });
    } catch (error) {
      console.error("Error resetting assignments:", error);
      toast({
        title: "Error",
        description: "Could not reset assignments. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportData = () => {
    if (assignments.length === 0) {
      toast({
        title: "No Data",
        description: "There is no assignment data to export.",
      });
      return;
    }

    const headers = ['Unit Number', 'Resident Name', 'Parking Lot', 'Section', 'Date Assigned'];
    const csvRows = [
      headers.join(','),
      ...assignments.map(item => [
        `"${item.unitNumber}"`,
        `"${item.residentName}"`,
        `"${item.parkingLotNumber}"`,
        `"${item.section}"`,
        `"${format(item.assignedAt, 'yyyy-MM-dd')}"`
      ].join(','))
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `parking-assignments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateAssignments = async () => {
    setIsGenerating(true);
    try {
      const result = await generateAssignments();
      if (result.success) {
        toast({
          title: "Generation Complete",
          description: result.message,
        });
        await fetchAssignments(); // Refresh data
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error("Error generating assignments:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Could not generate new assignments.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  if (loading && assignments.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

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
          <Button variant="outline" onClick={handleExportData}>
            <FileDown className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={handleGenerateAssignments} disabled={isGenerating}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Assignments"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Reset Assignments
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  assignment data from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetAssignments}>
                  Yes, reset assignments
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <StatsCards assignments={assignments} />
      
      <div className="grid gap-8">
        <AssignmentChart assignments={assignments} />
      </div>
      
      <AssignmentTable assignments={assignments} />
    </div>
  );
}
