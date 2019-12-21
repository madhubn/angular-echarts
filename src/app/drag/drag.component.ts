import { Component, OnInit } from "@angular/core";

import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-drag",
  templateUrl: "./drag.component.html",
  styleUrls: ["./drag.component.css"]
})
export class DragComponent implements OnInit {
  msg = "";
  BAG = "DRAGULA_EVENTS";
  items = ["Candlestick", "Dagger", "Revolver", "Rope"];
  vampires = ["Candlestick", "Dagger", "Revolver", "Rope"];

  tiles = [
    {
      text: "Line",
      cols: 2,
      rows: 3,
      color: "lightblue",
      id: "LineComponent"
    },
    {
      text: "Guage",
      cols: 1,
      rows: 3,
      color: "lightgreen",
      id: "GuageComponent"
    },
    {
      text: "Text",
      cols: 1,
      rows: 2,
      color: "lightpink",
      id: "TextWidgetComponent"
    },
    {
      text: "Bar",
      cols: 2,
      rows: 3,
      color: "#DDBDF1",
      id: "TextWidgetComponent1"
    }
  ];

  regularDistribution = 100 / 3 + "%";


  constructor() {
   
  }

  ngOnInit() {
   
  }

   drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
  }
}
