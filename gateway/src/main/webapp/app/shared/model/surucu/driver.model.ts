export const enum DriverStatus {
    AVALIABLE = 'AVALIABLE',
    ONWORK = 'ONWORK',
    CLOSE = 'CLOSE'
}

export interface IDriver {
    id?: number;
    userName?: string;
    driverStatus?: DriverStatus;
    location?: string;
}

export class Driver implements IDriver {
    constructor(public id?: number, public userName?: string, public driverStatus?: DriverStatus, public location?: string) {}
}
