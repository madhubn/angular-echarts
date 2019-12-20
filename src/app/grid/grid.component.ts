import { Component, OnInit } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  id: string;
}

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit {
  grid = new Map([["xs", 1], ["sm", 2], ["md", 2], ["lg", 3], ["xl", 3]]);
  cols = 3;
  start: number;
  watcher: Subscription;
  tiles: Tile[] = [
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

  constructor(private mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.getCol();
    this.readFromLocalStorage();
  }

  getCol() {
    this.grid.forEach((cols, mqAlias) => {
      if (this.mediaObserver.isActive(mqAlias)) {
        this.start = cols;
      }
    });
    // this.cols = this.observableMedia
    //   .asObservable()
    //   .map(change => {
    //     console.log(change);
    //     console.log(this.grid.get(change.mqAlias));
    //     return this.grid.get(change.mqAlias);
    //   })
    //   .startWith(this.start);

    this.watcher = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log("change.mqAlias", change.mqAlias);
        this.cols = change ? this.grid.get(change.mqAlias) : 4;
        if (change.mqAlias == "xs") {
        }
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log("event", event);
      moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
      localStorage.setItem("items", JSON.stringify(this.tiles));
    }
  }

  readFromLocalStorage() {
    // const tiles = JSON.parse(localStorage.getItem("items"));
    // if (tiles !== null) {
    //   this.tiles = tiles;
    // }
  }
}
