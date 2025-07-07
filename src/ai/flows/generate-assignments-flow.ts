'use server';
/**
 * @fileOverview A flow to automatically generate parking assignments.
 *
 * - generateAssignments - A function that handles the assignment generation process.
 * - GenerateAssignmentsOutput - The return type for the generateAssignments function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, doc, writeBatch, Timestamp, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User, Assignment, ParkingLot } from '@/types';

export const GenerateAssignmentsOutputSchema = z.object({
  success: z.boolean(),
  assignmentsCreated: z.number(),
  message: z.string(),
});
export type GenerateAssignmentsOutput = z.infer<typeof GenerateAssignmentsOutputSchema>;

// Helper to generate all possible parking lots
const generateAllParkingLots = (): ParkingLot[] => {
  const lots: ParkingLot[] = [];
  const sections: { name: 'A' | 'B' | 'C' | 'D', count: number }[] = [
    { name: 'A', count: 56 },
    { name: 'B', count: 56 },
    { name: 'C', count: 56 },
    { name: 'D', count: 54 }, // Total 222
  ];

  sections.forEach(section => {
    for (let i = 1; i <= section.count; i++) {
      const lotNumber = `${section.name}${String(i).padStart(2, '0')}`;
      lots.push({
        id: lotNumber,
        lotNumber: lotNumber,
        section: section.name,
        isAssigned: false,
      });
    }
  });
  return lots;
};


const generateAssignmentsFlow = ai.defineFlow(
  {
    name: 'generateAssignmentsFlow',
    inputSchema: z.void(),
    outputSchema: GenerateAssignmentsOutputSchema,
  },
  async () => {
    try {
        const usersCol = collection(db, 'users');
        const userQuery = query(usersCol, where('role', '==', 'resident'));
        const userSnapshot = await getDocs(userQuery);
        const allUsers = userSnapshot.docs.map(doc => doc.data() as User);

        const assignmentsCol = collection(db, 'assignments');
        const assignmentSnapshot = await getDocs(assignmentsCol);
        const allAssignments = assignmentSnapshot.docs.map(doc => {
            const data = doc.data();
            return { ...data, id: doc.id, assignedAt: (data.assignedAt as Timestamp).toDate() } as Assignment;
        });

        const assignedUserIds = new Set(allAssignments.map(a => a.residentId));
        const unassignedUsers = allUsers.filter(u => !assignedUserIds.has(u.uid));

        if (unassignedUsers.length === 0) {
            return { success: true, assignmentsCreated: 0, message: "All residents already have an assignment." };
        }

        const allParkingLots = generateAllParkingLots();
        const assignedLotNumbers = new Set(allAssignments.map(a => a.parkingLotNumber));
        const availableLots = allParkingLots.filter(l => !assignedLotNumbers.has(l.lotNumber));

        if (availableLots.length < unassignedUsers.length) {
            return { success: false, assignmentsCreated: 0, message: `Not enough available lots. ${unassignedUsers.length} needed, but only ${availableLots.length} available.` };
        }
        
        const batch = writeBatch(db);
        let assignmentsCreated = 0;

        for (const user of unassignedUsers) {
            if(assignmentsCreated >= availableLots.length) break;

            const lot = availableLots[assignmentsCreated];
            const newAssignmentRef = doc(collection(db, 'assignments'));
            
            const newAssignmentData = {
                residentId: user.uid,
                residentName: user.fullName,
                unitNumber: user.unitNumber,
                parkingLotId: lot.id,
                parkingLotNumber: lot.lotNumber,
                section: lot.section,
                assignedAt: Timestamp.now(),
            };

            batch.set(newAssignmentRef, newAssignmentData);
            assignmentsCreated++;
        }
        
        await batch.commit();

        return {
            success: true,
            assignmentsCreated,
            message: `Successfully created ${assignmentsCreated} new parking assignments.`
        };

    } catch (error) {
        console.error("Error generating assignments:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, assignmentsCreated: 0, message: `Failed to generate assignments: ${errorMessage}` };
    }
  }
);


export async function generateAssignments(): Promise<GenerateAssignmentsOutput> {
    return generateAssignmentsFlow();
}
