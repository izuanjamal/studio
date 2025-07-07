"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { QrCode, Building, Calendar, User, Car } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ParkingDetails() {
  // Mock data for a single resident
  const residentData = {
    name: "Siti Nurhaliza",
    unitNumber: "L05-02",
    parkingLotNumber: "R78",
    section: "B",
    assignedAt: "2023-10-26"
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Current Assignment</CardTitle>
        <CardDescription>Your designated parking lot.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <div className="bg-primary/10 text-primary p-6 rounded-full">
            <div className="bg-primary/20 p-8 rounded-full">
                <p className="text-5xl font-extrabold">{residentData.parkingLotNumber}</p>
            </div>
        </div>
        <p className="mt-4 text-xl font-semibold">Section {residentData.section}</p>
        <p className="text-muted-foreground">Assigned on {new Date(residentData.assignedAt).toLocaleDateString()}</p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              View Digital Permit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">Digital Parking Permit</DialogTitle>
              <DialogDescription>
                Present this permit when requested. Valid for the current assignment period.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="p-4 bg-white rounded-lg border">
                <Image
                  src="https://placehold.co/200x200.png"
                  alt="QR Code"
                  width={200}
                  height={200}
                  data-ai-hint="qr code"
                />
              </div>
              <div className="w-full space-y-3 text-sm">
                <InfoRow icon={<User className="h-4 w-4 text-muted-foreground" />} label="Resident" value={residentData.name} />
                <Separator />
                <InfoRow icon={<Building className="h-4 w-4 text-muted-foreground" />} label="Unit No." value={residentData.unitNumber} />
                 <Separator />
                <InfoRow icon={<Car className="h-4 w-4 text-muted-foreground" />} label="Parking Lot" value={`${residentData.parkingLotNumber} (Section ${residentData.section})`} />
                 <Separator />
                <InfoRow icon={<Calendar className="h-4 w-4 text-muted-foreground" />} label="Date Issued" value={new Date(residentData.assignedAt).toLocaleDateString()} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-muted-foreground">{label}</span>
            </div>
            <span className="font-medium">{value}</span>
        </div>
    )
}
