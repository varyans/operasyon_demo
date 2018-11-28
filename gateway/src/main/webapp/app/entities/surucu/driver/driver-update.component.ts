import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDriver } from 'app/shared/model/surucu/driver.model';
import { DriverService } from './driver.service';

@Component({
    selector: 'jhi-driver-update',
    templateUrl: './driver-update.component.html'
})
export class DriverUpdateComponent implements OnInit {
    driver: IDriver;
    isSaving: boolean;

    constructor(private driverService: DriverService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ driver }) => {
            this.driver = driver;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.driver.id !== undefined) {
            this.subscribeToSaveResponse(this.driverService.update(this.driver));
        } else {
            this.subscribeToSaveResponse(this.driverService.create(this.driver));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDriver>>) {
        result.subscribe((res: HttpResponse<IDriver>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
