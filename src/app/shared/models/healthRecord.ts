export interface HealthRecord {
    id?: string;
    memberId: string;
    condition: string;
    notes: string;
    recordDate: Date;
}