import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  rows: number;
  cols: number;
  id: string;
  text: string;
  color: string;
}

@Component({
  selector: "app-add-widget-form",
  templateUrl: "./add-widget-form.component.html",
  styleUrls: ["./add-widget-form.component.css"]
})
export class AddWidgetFormComponent {
  constructor(
    public dialogRef: MatDialogRef<AddWidgetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
