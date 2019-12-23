import { Component, OnInit, ViewChild, AfterContentInit } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { MatDialog, MatGridList } from "@angular/material";
import { AddWidgetFormComponent } from "./../add-widget-form/add-widget-form.component";
import { Subject } from "rxjs";

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
export class GridComponent implements OnInit, AfterContentInit {
  // grid = new Map([["xs", 1], ["sm", 2], ["md", 4], ["lg", 6], ["xl", 8]]);

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 4,
    sm: 2,
    xs: 1
  };

  @ViewChild("grid", { static: true }) grid: MatGridList;
  cols: Subject<any> = new Subject();

  start: number;
  watcher: Subscription;
  breakpoint: number;
  tiles: Tile[] = [
    {
      text: "Line",
      cols: 1,
      rows: 1,
      color: "lightblue",
      id: "LineComponent"
    },
    {
      text: "Guage",
      cols: 1,
      rows: 1,
      color: "lightgreen",
      id: "GuageComponent"
    },
    {
      text: "Text",
      cols: 1,
      rows: 1,
      color: "lightpink",
      id: "TextWidgetComponent"
    },
    {
      text: "Bar",
      cols: 1,
      rows: 1,
      color: "#DDBDF1",
      id: "TextWidgetComponent1"
    }
  ];

  constructor(private mediaObserver: MediaObserver, public dialog: MatDialog) {}

  ngOnInit() {
    this.getCol();
    this.readFromLocalStorage();
  }

  getCol() {
    // this.grid.forEach((cols, mqAlias) => {
    //   if (this.mediaObserver.isActive(mqAlias)) {
    //     this.start = cols;
    //   }
    // });
    // this.cols = this.observableMedia
    //   .asObservable()
    //   .map(change => {
    //     console.log(change);
    //     console.log(this.grid.get(change.mqAlias));
    //     return this.grid.get(change.mqAlias);
    //   })
    //   .startWith(this.start);
    // this.watcher = this.mediaObserver.media$.subscribe(
    //   (change: MediaChange) => {
    //     console.log("change.mqAlias", change.mqAlias);
    //     this.cols = change ? this.grid.get(change.mqAlias) : 4;
    //     if (change.mqAlias == "xs") {
    //     }
    //   }
    // );
  }

  ngAfterContentInit() {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.cols.next(this.gridByBreakpoint[change.mqAlias]);
    });
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

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 3;
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddWidgetFormComponent, {
      width: "250px",
      data: {
        rows: 2,
        cols: 2,
        id: "GuageComponent",
        text: "GuageComponent",
        color: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      this.tiles.push(result);
    });
  }

  identify(index, item) {
    return item.id;
  }
}
