import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  writeBatch,
  Timestamp
} from 'firebase/firestore';
import type { User, Assignment } from '@/types';

// USERS
export const createUserDocument = async (uid: string, data: { email: string; fullName: string; unitNumber: string; }) => {
  const userRef = doc(db, 'users', uid);
  return setDoc(userRef, {
    uid,
    role: 'resident',
    avatarUrl: '',
    ...data,
  });
};

export const getUser = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data() as User;
  }
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<Omit<User, 'uid' | 'email' | 'role'>>) => {
    const userRef = doc(db, 'users', uid);
    return updateDoc(userRef, data);
};


// ASSIGNMENTS
export const getAllAssignments = async (): Promise<Assignment[]> => {
    const assignmentsCol = collection(db, 'assignments');
    const q = query(assignmentsCol);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            // Convert Firestore Timestamp to JS Date
            assignedAt: (data.assignedAt as Timestamp).toDate(),
        } as Assignment;
    });
};

export const getAssignmentsByUserId = async (userId: string): Promise<Assignment[]> => {
    const assignmentsCol = collection(db, 'assignments');
    const q = query(assignmentsCol, where('residentId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            assignedAt: (data.assignedAt as Timestamp).toDate(),
        } as Assignment;
    });
};

export const deleteAllAssignments = async (): Promise<void> => {
    const assignmentsCol = collection(db, 'assignments');
    const querySnapshot = await getDocs(assignmentsCol);
    const batch = writeBatch(db);
    querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
};
