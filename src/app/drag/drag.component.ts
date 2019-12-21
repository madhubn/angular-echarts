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
    "Pipe",
    "Wrench1",
    "Candlestick",
    "Dagger1",
    "Revolver1",
    "Rope1",
    "Pipe1",
    "Wrench1",
    "Revolver1",
    "Rope1",
    "Pipe1",
    "Wrench1",
    "Dagger1",
    "Revolver1",
    "Rope1",
    "Pipe1",
    "Wrench1",
    "Revolver1",
    "Rope1",
    "Pipe1",
    "Wrench2"
  ];
  regularDistribution = 100 / 3 + '%';
  constructor(private dragula: DragulaService) {}

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
