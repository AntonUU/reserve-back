
export interface ReserveManage {
    id: number;
    reserveName: string;
    reserveSex: string;
    reservePhone: string;
    accompanyingNum: number;
    createDatetime: Date;
    startDatetime: Date;
    endDatetime: Date;
    reserveStatus: string;
    permiss: string[]
}