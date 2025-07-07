import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for assignment history
const history = [
  { id: 1, lot: "R78", section: "B", from: "2023-11-01", to: "Present", status: "Active" },
  { id: 2, lot: "R15", section: "A", from: "2023-05-01", to: "2023-10-31", status: "Expired" },
  { id: 3, lot: "R192", section: "D", from: "2022-11-01", to: "2023-04-30", status: "Expired" },
  { id: 4, lot: "R44", section: "A", from: "2022-05-01", to: "2022-10-31", status: "Expired" },
];

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
                {history.map((item) => (
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
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
