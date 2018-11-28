import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerRequest } from 'app/shared/model/siparis/customer-request.model';

@Component({
    selector: 'jhi-customer-request-detail',
    templateUrl: './customer-request-detail.component.html'
})
export class CustomerRequestDetailComponent implements OnInit {
    customerRequest: ICustomerRequest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerRequest }) => {
            this.customerRequest = customerRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}
