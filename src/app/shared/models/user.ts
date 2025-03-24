export interface User {
    email: string;
    password: string;
    role: Role;
}

export interface UpdateUser {
    password: string;
}

export type Role = 'Admin' | 'User' | '';