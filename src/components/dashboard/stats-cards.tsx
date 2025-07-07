import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, CheckCircle, XCircle, PieChart } from "lucide-react";
import type { Assignment } from "@/types";

type StatsCardsProps = {
  assignments: Assignment[];
}

export function StatsCards({ assignments }: StatsCardsProps) {
    // In a real app, this might come from a separate API endpoint for performance.
    const totalLots = 222; // Assuming this is a fixed value for the property.
    const assignedLots = assignments.length;
    const availableLots = totalLots - assignedLots;
    const occupancyRate = totalLots > 0 ? ((assignedLots / totalLots) * 100).toFixed(1) : "0.0";

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Lots</CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalLots}</div>
                    <p className="text-xs text-muted-foreground">All parking sections</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Assigned Lots</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{assignedLots}</div>
                    <p className="text-xs text-muted-foreground">Currently occupied</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Lots</CardTitle>
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{availableLots}</div>
                    <p className="text-xs text-muted-foreground">Currently empty</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{occupancyRate}%</div>
                    <p className="text-xs text-muted-foreground">Percentage of lots in use</p>
                </CardContent>
            </Card>
        </div>
    );
}
