import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  color: string;
}


@Component({
  selector: "app-add-line-widget-form",
  templateUrl: "./add-line-widget-form.component.html",
  styleUrls: ["./add-line-widget-form.component.css"]
})
export class AddLineWidgetFormComponent {
  constructor(
    public dialogRef: MatDialogRef<AddLineWidgetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
