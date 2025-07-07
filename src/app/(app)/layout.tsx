"use client";

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Car, User, LogOut, Settings, Home } from "lucide-react";
import { useState, useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuSkeleton
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/icons";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<'admin' | 'resident' | null>(null);

  useEffect(() => {
    // Reading from sessionStorage is a client-side only operation.
    const role = sessionStorage.getItem('userRole') as 'admin' | 'resident';
    setUserRole(role || 'resident'); // Default to resident if no role is found.
  }, []);


  const handleLogout = () => {
    sessionStorage.removeItem('userRole');
    router.push('/login');
  }

  const navItems = userRole === 'admin' ? [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", "tooltip": "Dashboard" },
  ] : [
    { href: "/resident", icon: Car, label: "My Parking", "tooltip": "My Parking" },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <AppLogo className="w-8 h-8 text-accent" />
            <span className="text-lg font-semibold">ParkAssign PSI</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {userRole ? navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.tooltip}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )) : <SidebarMenuSkeleton showIcon />}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/'} tooltip="Home">
                    <Link href="/">
                        <Home />
                        <span>Home</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/profile'} tooltip="Profile">
                    <Link href="/profile">
                        <User />
                        <span>Profile</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/settings'} tooltip="Settings">
                    <Link href="/settings">
                        <Settings />
                        <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="ml-auto flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="person avatar" />
                      <AvatarFallback>{userRole && (userRole === 'admin' ? 'A' : 'R')}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{userRole && (userRole === 'admin' ? 'Admin' : 'Resident')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </header>
        <main className="p-4 sm:p-6 flex-1">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
