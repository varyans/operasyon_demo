import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerRequest } from 'app/shared/model/siparis/customer-request.model';

type EntityResponseType = HttpResponse<ICustomerRequest>;
type EntityArrayResponseType = HttpResponse<ICustomerRequest[]>;

@Injectable({ providedIn: 'root' })
export class CustomerRequestService {
    public resourceUrl = SERVER_API_URL + 'siparis/api/customer-requests';

    constructor(private http: HttpClient) {}

    create(customerRequest: ICustomerRequest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerRequest);
        return this.http
            .post<ICustomerRequest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(customerRequest: ICustomerRequest): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(customerRequest);
        return this.http
            .put<ICustomerRequest>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICustomerRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICustomerRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(customerRequest: ICustomerRequest): ICustomerRequest {
        const copy: ICustomerRequest = Object.assign({}, customerRequest, {
            operationDate:
                customerRequest.operationDate != null && customerRequest.operationDate.isValid()
                    ? customerRequest.operationDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.operationDate = res.body.operationDate != null ? moment(res.body.operationDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((customerRequest: ICustomerRequest) => {
                customerRequest.operationDate = customerRequest.operationDate != null ? moment(customerRequest.operationDate) : null;
            });
        }
        return res;
    }
}
