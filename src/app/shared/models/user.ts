export interface User {
    email: string;
    password: string;
    role: Role;
}

export interface UpdateUser {
    password: string;
}

export interface UserDetail {
    id: string;
    email: string;
    password: string;
    role: Role;
}

export type Role = 'Admin' | 'User' | '';