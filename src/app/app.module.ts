import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { CdkTableModule } from "@angular/cdk/table";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import { GridComponent } from "./grid/grid.component";
import { TextWidgetComponent } from "./text-widget/text-widget.component";
import { GuageComponent } from "./guage/guage.component";
import { NgxEchartsModule } from "ngx-echarts";
import { LineComponent } from "./line/line.component";
import { DragulaModule, DragulaService } from "ng2-dragula";
import { DragComponent } from "./drag/drag.component";
import { AddWidgetFormComponent } from "./add-widget-form/add-widget-form.component";
import { ColorPickerModule } from "ngx-color-picker";
import { AddLineWidgetFormComponent } from "./add-line-widget-form/add-line-widget-form.component";
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { BarComponent } from './bar/bar.component';
// import { GaugeModule } from "angular-gauge";
const modules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  DragDropModule,
  FlexLayoutModule,
  ColorPickerModule
];

@NgModule({
  imports: [
    modules,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxEchartsModule,
    DragulaModule.forRoot()
    // GaugeModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    GridComponent,
    TextWidgetComponent,
    GuageComponent,
    LineComponent,
    DragComponent,
    AddWidgetFormComponent,
    AddLineWidgetFormComponent,
    ColorPickerComponent,
    BarComponent
  ],
  providers: [DragulaService],
  exports:[LineComponent],
  entryComponents: [AddWidgetFormComponent, AddLineWidgetFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
