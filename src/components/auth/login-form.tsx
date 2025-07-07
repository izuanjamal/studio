"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AppLogo } from '@/components/icons';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    // Simulate API call and role-based redirect
    setTimeout(() => {
      if (values.email === 'admin@example.com' && values.password === 'password') {
        toast({
          title: 'Login Successful',
          description: 'Welcome, Admin! Redirecting to your dashboard.',
        });
        router.push('/dashboard');
      } else {
        // For any other credentials, assume it's a resident
        toast({
          title: 'Login Successful',
          description: `Welcome! Redirecting to your portal.`,
        });
        router.push('/resident');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto h-12 w-12 text-accent">
            <AppLogo />
        </div>
        <CardTitle className="text-2xl font-headline">ParkAssign PSI</CardTitle>
        <CardDescription>Enter your credentials to access your portal.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="underline">
            Register
          </Link>
        </div>
      </CardContent>
       <CardFooter>
        <p className="text-center w-full text-xs text-muted-foreground">
          <strong>Admin:</strong> admin@example.com / password
        </p>
      </CardFooter>
    </Card>
  );
}
