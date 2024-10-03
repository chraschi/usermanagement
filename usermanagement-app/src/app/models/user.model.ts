export interface User {
    id: number;
    email: string;
    password: string;
    securityGroups: number[]; // Array of Security Group IDs
    thumbnail?: string; // Optional thumbnail URL
}