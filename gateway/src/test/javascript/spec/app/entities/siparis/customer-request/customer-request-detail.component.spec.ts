/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerRequestDetailComponent } from 'app/entities/siparis/customer-request/customer-request-detail.component';
import { CustomerRequest } from 'app/shared/model/siparis/customer-request.model';

describe('Component Tests', () => {
    describe('CustomerRequest Management Detail Component', () => {
        let comp: CustomerRequestDetailComponent;
        let fixture: ComponentFixture<CustomerRequestDetailComponent>;
        const route = ({ data: of({ customerRequest: new CustomerRequest(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CustomerRequestDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerRequestDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerRequestDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customerRequest).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
