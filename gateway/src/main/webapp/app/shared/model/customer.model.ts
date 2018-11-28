import { IUser } from 'app/core/user/user.model';

export interface ICustomer {
    id?: number;
    user?: IUser;
}

export class Customer implements ICustomer {
    constructor(public id?: number, public user?: IUser) {}
}
