import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for assignment history cleared for publishing.
const history: any[] = [];

export function AssignmentHistory() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Assignment History</CardTitle>
        <CardDescription>Your past parking lot assignments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Parking Lot</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.length > 0 ? history.map((item) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.lot}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.from}</TableCell>
                    <TableCell>{item.to}</TableCell>
                    <TableCell>
                    <Badge variant={item.status === 'Active' ? 'default' : 'secondary'} className={item.status === 'Active' ? 'bg-green-500/80 text-white' : ''}>
                        {item.status}
                    </Badge>
                    </TableCell>
                </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
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
