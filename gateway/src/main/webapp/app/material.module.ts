import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
    MatCheckboxModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        LayoutModule,
        DragDropModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatInputModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatCardModule,
        MatStepperModule,
        MatRadioModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        DragDropModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatCardModule,
        MatStepperModule,
        MatRadioModule
    ],
    declarations: []
})
export class MaterialModule {}
