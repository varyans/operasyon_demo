import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerRequest } from 'app/shared/model/siparis/customer-request.model';
import { CustomerRequestService } from './customer-request.service';

@Component({
    selector: 'jhi-customer-request-delete-dialog',
    templateUrl: './customer-request-delete-dialog.component.html'
})
export class CustomerRequestDeleteDialogComponent {
    customerRequest: ICustomerRequest;

    constructor(
        private customerRequestService: CustomerRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerRequestListModification',
                content: 'Deleted an customerRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-request-delete-popup',
    template: ''
})
export class CustomerRequestDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customerRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CustomerRequestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.customerRequest = customerRequest;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
