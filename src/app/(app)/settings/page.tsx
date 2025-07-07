'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePasswordReset = async () => {
    if (user?.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        toast({
          title: "Password Reset Email Sent",
          description: `An email has been sent to ${user.email} with instructions to reset your password.`,
        });
      } catch (error: any) {
        console.error("Error sending password reset email:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to send password reset email.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and notification settings.
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
                Click the button below to receive a password reset link via email.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Button onClick={handlePasswordReset}>Send Password Reset Email</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Choose how you want to be notified.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="font-normal cursor-pointer">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive emails for parking assignments and announcements.
                    </p>
                </div>
                <Switch defaultChecked id="email-notifications"/>
            </div>
             <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="push-notifications" className="font-normal cursor-pointer">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        Get real-time updates on your mobile devices.
                    </p>
                </div>
                <Switch id="push-notifications"/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
