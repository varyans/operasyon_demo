/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerRequestDeleteDialogComponent } from 'app/entities/siparis/customer-request/customer-request-delete-dialog.component';
import { CustomerRequestService } from 'app/entities/siparis/customer-request/customer-request.service';

describe('Component Tests', () => {
    describe('CustomerRequest Management Delete Component', () => {
        let comp: CustomerRequestDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerRequestDeleteDialogComponent>;
        let service: CustomerRequestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CustomerRequestDeleteDialogComponent]
            })
                .overrideTemplate(CustomerRequestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerRequestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerRequestService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
