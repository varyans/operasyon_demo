import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayCustomerModule } from './customer/customer.module';
import { GatewayCustomerRequestModule as SiparisCustomerRequestModule } from './siparis/customer-request/customer-request.module';
import { GatewayDriverModule as SurucuDriverModule } from './surucu/driver/driver.module';
import { GatewayOperationModule as OperasyonOperationModule } from './operasyon/operation/operation.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GatewayCustomerModule,
        SiparisCustomerRequestModule,
        SurucuDriverModule,
        OperasyonOperationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
