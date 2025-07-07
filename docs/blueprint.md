# **App Name**: ParkAssign PSI

## Core Features:

- User Authentication: Secure user authentication using Firebase Authentication, with role-based access control to differentiate between admin and resident privileges.
- Automated Parking Assignment: Random parking lot assignment for registered residents (simulating R1-R105 for 105 residents), following the Fisher-Yates shuffle, with atomic transactions to ensure data integrity. Includes a rollback mechanism and maintains an audit history of assignments.
- Admin Dashboard: An admin dashboard to view real-time parking assignments, generate bulk assignments, access audit logs, and export data in CSV/Excel/PDF formats.
- Resident Portal: Resident portal allowing residents to view their assigned parking spot, unit details, digital parking permit, and assignment history.
- Advanced Search and Filtering: Search, filtering, and sorting of parking assignments via the admin dashboard, using server-side processing with pagination to ensure speed and efficiency. 

## Style Guidelines:

- Primary color: Light Indigo (#9FA8DA) for a calm and organized feel, referencing the need for secure access.
- Background color: Very light grayish-blue (#F0F4F8). It maintains a professional and unobtrusive backdrop, while coordinating in hue to the primary color.
- Accent color: Muted violet (#9575CD) to highlight key actions and interactive elements.
- Body and headline font: 'Inter' (sans-serif) for a modern, neutral, readable style.
- Use Material Design icons from the Material-UI library, following their guidelines for clarity and consistency.
- Responsive layout adapting to various screen sizes, with a mobile-first approach, using Material-UI Grid and layout components.
- Subtle transitions and animations (e.g., when assignments are updated) to provide a smooth and engaging user experience.