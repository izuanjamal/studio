"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  Auth, 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUser } from '@/lib/firestore';
import type { User as AppUser } from '@/types';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: FirebaseUser | null;
  userDetails: AppUser | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, pass: string) => Promise<UserCredential>;
  signOutUser: () => Promise<void>;
  forceReloadUserDetails: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userDetails, setUserDetails] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ['/', '/login', '/register'];

  const fetchUserDetails = useCallback(async (firebaseUser: FirebaseUser) => {
    try {
      const details = await getUser(firebaseUser.uid);
      setUserDetails(details);
      return details;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUserDetails(null);
      return null;
    }
  }, []);

  const forceReloadUserDetails = useCallback(async () => {
    if (user) {
      await fetchUserDetails(user);
    }
  }, [user, fetchUserDetails]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const details = await fetchUserDetails(firebaseUser);
        const isPublicRoute = publicRoutes.includes(pathname);
        if (isPublicRoute) {
          router.push(details?.role === 'admin' ? '/dashboard' : '/resident');
        }
      } else {
        setUser(null);
        setUserDetails(null);
        const isAppRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/resident') || pathname.startsWith('/profile') || pathname.startsWith('/settings');
        if (isAppRoute) {
            router.push('/');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname, fetchUserDetails]);

  const signInWithEmail = (email: string, pass: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = (email: string, pass: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const signOutUser = (): Promise<void> => {
    return signOut(auth);
  };

  const value = {
    user,
    userDetails,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOutUser,
    forceReloadUserDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
