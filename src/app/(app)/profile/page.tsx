'use client';

import { useState, useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Building, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { mockAssignments } from '@/lib/mock-data';

// Mock user data derived from mockAssignments to ensure consistency.
const mockUser = {
  fullName: mockAssignments[1].residentName,
  email: "siti.nurhaliza@example.com", // Keeping a static email for now
  unitNumber: mockAssignments[1].unitNumber,
  avatarUrl: "https://placehold.co/100x100.png",
  avatarFallback: mockAssignments[1].residentName.split(' ').map(n => n[0]).join('').toUpperCase(),
};

const profileSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
  });

  // This will reset the form with the latest user data when the dialog is opened.
  useEffect(() => {
    if (isDialogOpen) {
      form.reset({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [isDialogOpen, user, form]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    // Simulate updating user data
    setUser(prevUser => ({
        ...prevUser,
        ...values,
        // Regenerate fallback if name changes
        avatarFallback: values.fullName.split(' ').map(n => n[0]).join('').toUpperCase(),
    }));
    toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
    });
    setIsDialogOpen(false); // Close the dialog
  };

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
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Siti Nurhaliza" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                 </Dialog>
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
