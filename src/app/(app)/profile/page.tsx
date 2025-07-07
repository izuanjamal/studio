'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Building, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock user data. In a real app, this would come from a session or context.
const user = {
  fullName: "Siti Nurhaliza",
  email: "siti.nurhaliza@example.com",
  unitNumber: "L05-02",
  avatarUrl: "https://placehold.co/100x100.png",
  avatarFallback: "SN",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} data-ai-hint="person portrait" />
              <AvatarFallback className="text-3xl">{user.avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <CardTitle className="text-3xl font-bold">{user.fullName}</CardTitle>
              <CardDescription className="text-base">{user.email}</CardDescription>
               <div className="pt-2">
                 <Button>Edit Profile</Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-4"/>
          <div className="space-y-4 pt-2 text-sm">
             <InfoRow icon={<User className="h-5 w-5 text-muted-foreground" />} label="Full Name" value={user.fullName} />
             <Separator />
             <InfoRow icon={<Building className="h-5 w-5 text-muted-foreground" />} label="Unit Number" value={user.unitNumber} />
             <Separator />
             <InfoRow icon={<Mail className="h-5 w-5 text-muted-foreground" />} label="Email" value={user.email} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
                {icon}
                <span className="text-muted-foreground">{label}</span>
            </div>
            <span className="font-medium">{value}</span>
        </div>
    )
}
