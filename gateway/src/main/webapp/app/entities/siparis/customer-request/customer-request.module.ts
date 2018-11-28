import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    CustomerRequestComponent,
    CustomerRequestDetailComponent,
    CustomerRequestUpdateComponent,
    CustomerRequestDeletePopupComponent,
    CustomerRequestDeleteDialogComponent,
    customerRequestRoute,
    customerRequestPopupRoute
} from './';

const ENTITY_STATES = [...customerRequestRoute, ...customerRequestPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CustomerRequestComponent,
        CustomerRequestDetailComponent,
        CustomerRequestUpdateComponent,
        CustomerRequestDeleteDialogComponent,
        CustomerRequestDeletePopupComponent
    ],
    entryComponents: [
        CustomerRequestComponent,
        CustomerRequestUpdateComponent,
        CustomerRequestDeleteDialogComponent,
        CustomerRequestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCustomerRequestModule {}
