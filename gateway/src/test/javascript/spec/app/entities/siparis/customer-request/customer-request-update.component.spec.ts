/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerRequestUpdateComponent } from 'app/entities/siparis/customer-request/customer-request-update.component';
import { CustomerRequestService } from 'app/entities/siparis/customer-request/customer-request.service';
import { CustomerRequest } from 'app/shared/model/siparis/customer-request.model';

describe('Component Tests', () => {
    describe('CustomerRequest Management Update Component', () => {
        let comp: CustomerRequestUpdateComponent;
        let fixture: ComponentFixture<CustomerRequestUpdateComponent>;
        let service: CustomerRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CustomerRequestUpdateComponent]
            })
                .overrideTemplate(CustomerRequestUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerRequestUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerRequestService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerRequest(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerRequest = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerRequest();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customerRequest = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
