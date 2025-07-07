import { Timestamp } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  fullName: string;
  unitNumber: string;
  avatarUrl: string;
  role: 'admin' | 'resident';
};

export type Assignment = {
  id: string; // Firestore document ID
  residentId: string; // UID of the user
  unitNumber: string;
  residentName: string;
  parkingLotId: string;
  parkingLotNumber: string;
  section: 'A' | 'B' | 'C' | 'D';
  assignedAt: Date | Timestamp;
};

export type Unit = {
  id: string;
  unitNumber: string;
  floorLevel: number | 'G';
  residentName?: string;
  residentId?: string; // UID of the user
};

export type ParkingLot = {
  id: string;
  lotNumber: string;
  section: 'A' | 'B' | 'C' | 'D';
  isAssigned: boolean;
  assignedTo?: string; // UID of the user
};
