import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomerRequest } from 'app/shared/model/siparis/customer-request.model';
import { CustomerRequestService } from './customer-request.service';

@Component({
    selector: 'jhi-customer-request-update',
    templateUrl: './customer-request-update.component.html'
})
export class CustomerRequestUpdateComponent implements OnInit {
    customerRequest: ICustomerRequest;
    isSaving: boolean;
    operationDate: string;

    constructor(private customerRequestService: CustomerRequestService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customerRequest }) => {
            this.customerRequest = customerRequest;
            this.operationDate =
                this.customerRequest.operationDate != null ? this.customerRequest.operationDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.customerRequest.operationDate = this.operationDate != null ? moment(this.operationDate, DATE_TIME_FORMAT) : null;
        if (this.customerRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.customerRequestService.update(this.customerRequest));
        } else {
            this.subscribeToSaveResponse(this.customerRequestService.create(this.customerRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerRequest>>) {
        result.subscribe((res: HttpResponse<ICustomerRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
