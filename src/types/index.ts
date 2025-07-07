export type Assignment = {
  id: string;
  unitId: string;
  unitNumber: string;
  residentName: string;
  parkingLotId: string;
  parkingLotNumber: string;
  section: 'A' | 'B' | 'C' | 'D';
  assignedAt: Date;
};

export type Unit = {
  id: string;
  unitNumber: string;
  floorLevel: number | 'G';
  residentName?: string;
};

export type ParkingLot = {
  id: string;
  lotNumber: string;
  section: 'A' | 'B' | 'C' | 'D';
  isAssigned: boolean;
};
