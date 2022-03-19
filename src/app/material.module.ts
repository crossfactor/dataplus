import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
    imports:[
        MatProgressBarModule,
        MatButtonModule,
        MatChipsModule,
        MatCheckboxModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatGridListModule,
        MatDividerModule,
        MatListModule,
        MatTableModule,
        MatSliderModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatSnackBarModule
        
    ],

    exports:[
        MatProgressBarModule,
        MatButtonModule,
        MatChipsModule,
        MatCheckboxModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatGridListModule,
        MatDividerModule,
        MatListModule,
        MatTableModule,
        MatSliderModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatSnackBarModule
        
    ],

})
export class MaterialModule {}
