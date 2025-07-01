export interface Contract {
    id?: string,
    memberId: string,
    planName: string,
    price: number,
    startDate: Date,
    endDate: Date,
    isAutoRenew: boolean
}