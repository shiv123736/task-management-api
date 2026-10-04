


export type Roles = "user" | "admin" | string;

// define user interface
export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: Roles;
    createdAt: Date;
    updatedAt: Date;
}