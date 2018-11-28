import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomerRequest } from 'app/shared/model/siparis/customer-request.model';
import { CustomerRequestService } from './customer-request.service';
import { CustomerRequestComponent } from './customer-request.component';
import { CustomerRequestDetailComponent } from './customer-request-detail.component';
import { CustomerRequestUpdateComponent } from './customer-request-update.component';
import { CustomerRequestDeletePopupComponent } from './customer-request-delete-dialog.component';
import { ICustomerRequest } from 'app/shared/model/siparis/customer-request.model';

@Injectable({ providedIn: 'root' })
export class CustomerRequestResolve implements Resolve<ICustomerRequest> {
    constructor(private service: CustomerRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerRequest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CustomerRequest>) => response.ok),
                map((customerRequest: HttpResponse<CustomerRequest>) => customerRequest.body)
            );
        }
        return of(new CustomerRequest());
    }
}

export const customerRequestRoute: Routes = [
    {
        path: 'customer-request',
        component: CustomerRequestComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gatewayApp.siparisCustomerRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-request/:id/view',
        component: CustomerRequestDetailComponent,
        resolve: {
            customerRequest: CustomerRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.siparisCustomerRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-request/new',
        component: CustomerRequestUpdateComponent,
        resolve: {
            customerRequest: CustomerRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.siparisCustomerRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-request/:id/edit',
        component: CustomerRequestUpdateComponent,
        resolve: {
            customerRequest: CustomerRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.siparisCustomerRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerRequestPopupRoute: Routes = [
    {
        path: 'customer-request/:id/delete',
        component: CustomerRequestDeletePopupComponent,
        resolve: {
            customerRequest: CustomerRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.siparisCustomerRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
