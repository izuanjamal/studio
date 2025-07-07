import type { Assignment } from '@/types';

const names = [
  "Ahmad Ibrahim", "Siti Nurhaliza", "Lim Wei", "Rajesh Kumar", "Tan Mei Ling",
  "David Chen", "Fatima Al-Jamil", "Michael Johnson", "Priya Sharma", "Wong Kim"
];

const sections = ['A', 'B', 'C', 'D'] as const;

// Cleared mock data for publishing.
// The application will start with a clean slate.
export const mockAssignments: Assignment[] = [];
