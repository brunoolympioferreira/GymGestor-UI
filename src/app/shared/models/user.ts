export interface User {
    email: string;
    password: string;
    role: Role;
}

export type Role = 'Admin' | 'User';