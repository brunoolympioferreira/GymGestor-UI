import { Address } from "../models/address";
import { Contract } from "../models/contract";
import { HealthRecord } from "../models/healthRecord";
import { Gender, Member } from "../models/member";

export interface MemberDetailViewModel {
    id?: string;
    fullName: string;
    dateOfBirth: string;
    gender: Gender;
    cpf: string;
    email: string;
    phone: string;
    address: Address;
    photoUrl: string;
    healthRecord: HealthRecord[];
    contract: Contract[];
}