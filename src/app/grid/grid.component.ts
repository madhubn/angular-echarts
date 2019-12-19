import { Component, OnInit } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit {
  tiles: Tile[] = [
    { text: "Line", cols: 2, rows: 3, color: "lightblue" },
    { text: "Guage", cols: 1, rows: 3, color: "lightgreen" },
    { text: "Text", cols: 1, rows: 3, color: "lightpink" },
    { text: "Bar", cols: 2, rows: 3, color: "#DDBDF1" }
  ];

  constructor() {}

  ngOnInit() {
    this.readFromLocalStorage();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log("event", event);
      moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
      localStorage.setItem("items", JSON.stringify(this.tiles));
    }
  }

  readFromLocalStorage() {
    const tiles = JSON.parse(localStorage.getItem("items"));
    if (tiles !== null) {
      this.tiles = tiles;
    } 
  }
}
