import { Component, OnInit } from "@angular/core";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "app-drag",
  templateUrl: "./drag.component.html",
  styleUrls: ["./drag.component.css"],
  providers: [DragulaService]
})
export class DragComponent implements OnInit {
  msg = "";
  BAG = "DRAGULA_EVENTS";
  items = [
    "Candlestick",
    "Dagger",
    "Revolver",
    "Rope",
    
  ];

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
  constructor(private dragula: DragulaService) {
    this.dragula.createGroup(this.BAG, {
      moves: (el, container, handle) => {
        return handle.className === 'handle';
      }
    });
  }

  ngOnInit() {
    // this.dragula.drop()(value => {
    //   this.msg = `Dragging the ${value[1].innerText}!`;
    // });

    this.dragula.drop(this.BAG).subscribe(({ el }) => {
      console.log("hjjjjjjjjjjjj", el);
    });

    this.dragula.drag(this.BAG).subscribe(({ el }) => {
      console.log("hjjjjjjjjjjjj", el);
    });

    // this.dragula.drop.subscribe(value => {
    //   this.msg = `Dropped the ${value[1].innerText}!`;

    //   setTimeout(() => {
    //     this.msg = "";
    //   }, 1000);
    // });
  }
}
