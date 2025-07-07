import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Assignment } from "@/types";
import { format } from "date-fns";

type AssignmentHistoryProps = {
  assignments: Assignment[];
}

export function AssignmentHistory({ assignments }: AssignmentHistoryProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Assignment History</CardTitle>
        <CardDescription>Your past and current parking lot assignments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Parking Lot</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Date Assigned</TableHead>
                <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assignments.length > 0 ? assignments.map((item, index) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.parkingLotNumber}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{format(item.assignedAt, "PPP")}</TableCell>
                    <TableCell>
                      {/* We only show the "Active" badge for the most recent assignment */}
                      {index === 0 ? (
                         <Badge className={'bg-green-500/80 text-white'}>
                            Active
                         </Badge>
                      ) : (
                         <Badge variant="secondary">
                            Previous
                         </Badge>
                      )}
                    </TableCell>
                </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No assignment history found.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
