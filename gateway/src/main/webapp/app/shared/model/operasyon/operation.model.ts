export const enum OperationStatus {
    WAITING = 'WAITING',
    ASSIGN = 'ASSIGN',
    DONE = 'DONE'
}

export interface IOperation {
    id?: number;
    order?: string;
    driver?: string;
    operationStatus?: OperationStatus;
}

export class Operation implements IOperation {
    constructor(public id?: number, public order?: string, public driver?: string, public operationStatus?: OperationStatus) {}
}
