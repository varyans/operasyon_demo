import { Moment } from 'moment';

export const enum CustomerRequestStatus {
    CREATED = 'CREATED',
    ONPROGRESS = 'ONPROGRESS',
    DONE = 'DONE',
    CANCELLED = 'CANCELLED'
}

export const enum CarType {
    SMALL = 'SMALL',
    MIDDLE = 'MIDDLE',
    BIG = 'BIG'
}

export interface ICustomerRequest {
    id?: number;
    userName?: string;
    beginLoc?: string;
    endLoc?: string;
    operationDate?: Moment;
    orderStatus?: CustomerRequestStatus;
    carType?: CarType;
}

export class CustomerRequest implements ICustomerRequest {
    constructor(
        public id?: number,
        public userName?: string,
        public beginLoc?: string,
        public endLoc?: string,
        public operationDate?: Moment,
        public orderStatus?: CustomerRequestStatus,
        public carType?: CarType
    ) {}
}
