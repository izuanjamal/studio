import type { Assignment } from '@/types';

const names = [
  "Ahmad Ibrahim", "Siti Nurhaliza", "Lim Wei", "Rajesh Kumar", "Tan Mei Ling",
  "David Chen", "Fatima Al-Jamil", "Michael Johnson", "Priya Sharma", "Wong Kim"
];

const sections = ['A', 'B', 'C', 'D'] as const;

export const mockAssignments: Assignment[] = Array.from({ length: 105 }, (_, i) => {
  const residentIndex = i % names.length;
  const level = Math.floor(i / 16) + 1;
  const unitInLevel = (i % 16) + 1;
  const unitNumber = level > 13 ? `L14-${String(unitInLevel).padStart(2, '0')}` : `L${String(level).padStart(2, '0')}-${String(unitInLevel).padStart(2, '0')}`;
  
  let section: 'A' | 'B' | 'C' | 'D';
  if (i + 1 <= 57) section = 'A';
  else if (i + 1 <= 93) section = 'B';
  else if (i + 1 <= 131) section = 'C';
  else section = 'D';

  // Use a static date to avoid hydration mismatch
  const baseDate = new Date('2024-07-01T00:00:00Z');
  baseDate.setDate(baseDate.getDate() - (i % 30));

  return {
    id: `asg-${i + 1}`,
    unitId: `unit-${i + 1}`,
    unitNumber: unitNumber,
    residentName: names[residentIndex],
    parkingLotId: `lot-R${i + 1}`,
    parkingLotNumber: `R${i + 1}`,
    section: section,
    assignedAt: baseDate,
  };
});
