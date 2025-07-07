"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Car, User, LogOut, Settings, Home } from "lucide-react";
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
import { useAuth } from "@/hooks/use-auth";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, userDetails, loading, signOutUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOutUser();
    router.push('/');
  }

  const userRole = userDetails?.role;
  const homePath = userRole === 'admin' ? '/dashboard' : '/resident';

  const navItems = userRole === 'admin' ? [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", "tooltip": "Dashboard" },
  ] : [
    { href: "/resident", icon: Car, label: "My Parking", "tooltip": "My Parking" },
  ];

  const renderAvatar = () => {
    if (loading || !userDetails) {
      return <Skeleton className="h-10 w-10 rounded-full" />;
    }
    const fallback = userDetails.fullName ? userDetails.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : (userRole === 'admin' ? 'A' : 'R');
    return (
      <Avatar>
        <AvatarImage src={userDetails.avatarUrl} alt="User Avatar" data-ai-hint="person avatar" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    );
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <AppLogo className="w-8 h-8" />
            <span className="text-lg font-semibold">ParkAssign PSI</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {loading ? <SidebarMenuSkeleton showIcon /> : navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={router.pathname === item.href} tooltip={item.tooltip}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={router.pathname === homePath} tooltip="Home">
                    <Link href={homePath}>
                        <Home />
                        <span>Home</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={router.pathname === '/profile'} tooltip="Profile">
                    <Link href="/profile">
                        <User />
                        <span>Profile</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={router.pathname === '/settings'} tooltip="Settings">
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
                    disabled={loading}
                  >
                    {renderAvatar()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{userRole && (userRole === 'admin' ? 'Admin' : 'Resident')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={homePath}>Home</Link>
                  </DropdownMenuItem>
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
