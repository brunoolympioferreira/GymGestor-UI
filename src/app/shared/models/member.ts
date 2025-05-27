import { Address } from "./address";

export interface Member {
    id?: string;
    fullName: string;
    dateOfBirth: string;
    gender: Gender;
    cpf: string;
    email: string;
    phone: string;
    address: Address;
    photoUrl: string;
}

export type Gender = 'male' | 'female';