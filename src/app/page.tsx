import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Lock, Users, BarChart } from 'lucide-react';
import { AppLogo } from '@/components/icons';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo className="h-8 w-8 text-accent" />
          <span className="text-xl font-bold tracking-tight">ParkAssign PSI</span>
        </Link>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 font-headline">
            Effortless Parking Management
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            A real-time, fair, and automated parking assignment system for residents of Pangsapuri Senibong Indah.
          </p>
          <Button size="lg" asChild>
            <Link href="/login">Access Your Portal</Link>
          </Button>
        </section>

        <section className="bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="relative rounded-xl shadow-2xl overflow-hidden">
                <Image
                    src="https://placehold.co/1200x600.png"
                    alt="Apartment building with a parking lot"
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover"
                    data-ai-hint="apartment building parking"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">System Features</h2>
            <p className="text-muted-foreground mt-2">Everything you need for seamless parking management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Car className="h-8 w-8" />}
              title="Automated Assignment"
              description="Fair and random parking lot distribution using a secure algorithm."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8" />}
              title="Role-Based Access"
              description="Secure login for both admins and residents with specific privileges."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Resident Portal"
              description="Easily view your assigned parking, history, and digital permit."
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8" />}
              title="Admin Dashboard"
              description="Monitor assignments, manage lots, and access audit logs in real-time."
            />
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ParkAssign PSI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
          {icon}
        </div>
        <CardTitle className="mt-4 font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
