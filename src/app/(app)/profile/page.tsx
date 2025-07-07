'use client';

import { useState, useEffect, useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Building, Mail, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { updateUserProfile } from '@/lib/firestore';
import { uploadProfilePhoto } from '@/lib/storage';
import { Skeleton } from '@/components/ui/skeleton';

const profileSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }).optional(),
  unitNumber: z.string().min(1, { message: 'Unit number is required.' }).regex(/^L\d{2}-\d{2}$/, 'Invalid format. Use L##-## (e.g., L05-02)'),
});

export default function ProfilePage() {
  const { user, userDetails, loading, forceReloadUserDetails } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      unitNumber: '',
    },
  });

  useEffect(() => {
    if (userDetails) {
      form.reset({
        fullName: userDetails.fullName,
        email: userDetails.email,
        unitNumber: userDetails.unitNumber,
      });
    }
  }, [userDetails, form]);

  useEffect(() => {
    if (isDialogOpen && userDetails) {
      form.reset({
        fullName: userDetails.fullName,
        email: userDetails.email,
        unitNumber: userDetails.unitNumber,
      });
      setAvatarPreview(userDetails.avatarUrl);
      setAvatarFile(null);
    }
  }, [isDialogOpen, userDetails, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;

    try {
      let photoUrl = userDetails?.avatarUrl;
      if (avatarFile) {
        photoUrl = await uploadProfilePhoto(user.uid, avatarFile);
      }

      const updatedData = {
        fullName: values.fullName,
        unitNumber: values.unitNumber,
        avatarUrl: photoUrl || '',
      };

      await updateUserProfile(user.uid, updatedData);
      
      await forceReloadUserDetails();

      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading || !userDetails) {
    return <ProfileSkeleton />;
  }

  const avatarFallback = userDetails.fullName.split(' ').map(n => n[0]).join('').toUpperCase();

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
              <AvatarImage src={userDetails.avatarUrl} alt={userDetails.fullName} data-ai-hint="person portrait" />
              <AvatarFallback className="text-3xl">{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <CardTitle className="text-3xl font-bold">{userDetails.fullName}</CardTitle>
              <CardDescription className="text-base">{userDetails.email}</CardDescription>
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
                                <div className="flex justify-center pb-4">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24 cursor-pointer border" onClick={() => fileInputRef.current?.click()}>
                                            <AvatarImage src={avatarPreview || ''} alt={userDetails.fullName} />
                                            <AvatarFallback className="text-3xl">{avatarFallback}</AvatarFallback>
                                        </Avatar>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="absolute bottom-0 right-0 rounded-full"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Camera className="h-4 w-4" />
                                            <span className="sr-only">Upload Photo</span>
                                        </Button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
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
                                    name="unitNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unit Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="L05-02" {...field} />
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
                                                <Input placeholder="name@example.com" {...field} disabled />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={form.formState.isSubmitting}>
                                      {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                                    </Button>
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
             <InfoRow icon={<User className="h-5 w-5 text-muted-foreground" />} label="Full Name" value={userDetails.fullName} />
             <Separator />
             <InfoRow icon={<Building className="h-5 w-5 text-muted-foreground" />} label="Unit Number" value={userDetails.unitNumber} />
             <Separator />
             <InfoRow icon={<Mail className="h-5 w-5 text-muted-foreground" />} label="Email" value={userDetails.email} />
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

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-5 w-72" />
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="grid gap-2">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-5 w-64" />
              <div className="pt-2">
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-4"/>
          <div className="space-y-4 pt-2 text-sm">
             <Skeleton className="h-8 w-full" />
             <Separator />
             <Skeleton className="h-8 w-full" />
             <Separator />
             <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
