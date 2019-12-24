import { Component, OnInit, ViewChild, AfterContentInit } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { AddWidgetFormComponent } from "./../add-widget-form/add-widget-form.component";
import { AddLineWidgetFormComponent } from "./../add-line-widget-form/add-line-widget-form.component";
import { LineDTO } from "./../add-line-widget-form/line.model";

export interface Tile {
  cols: number;
  rows: number;
  id: string;
  name: string;
  bgColor: any;
  titleColor: any;
  bgHeaderColor: any;
}

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit, AfterContentInit {
  grid = new Map([["xs", 2], ["sm", 4], ["md", 4], ["lg", 8], ["xl", 8]]);
  result: any;

  // @ViewChild("grid", { static: true }) grid: MatGridList;
  // cols: Subject<any> = new Subject();
  cols = 4;
  start: number;
  watcher: Subscription;
  breakpoint: number;
  tiles: Tile[] = [
    {
      name: "Line",
      cols: 2,
      rows: 2,
      bgColor: "lightblue",
      titleColor: "black",
      bgHeaderColor: "lightblue",
      id: "LineComponent"
    },
    {
      name: "Guage",
      cols: 1,
      rows: 1,
      bgColor: "lightgreen",
      titleColor: "black",
      bgHeaderColor: "lightgreen",
      id: "GuageComponent"
    },
    {
      name: "Text",
      cols: 1,
      rows: 1,
      bgColor: "lightpink",
      bgHeaderColor: "lightpink",
      titleColor: "black",
      id: "TextWidgetComponent"
    },
    {
      name: "Bar",
      cols: 2,
      rows: 2,
      bgColor: "#DDBDF1",
      titleColor: "black",
      bgHeaderColor: "#DDBDF1",
      id: "TextWidgetComponent1"
    }
  ];

  constructor(private mediaObserver: MediaObserver, public dialog: MatDialog) {}

  ngOnInit() {
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

  ngAfterContentInit() {
    this.getCol();
  }

  onEdit(data: any) {
    console.log("onEdit", data);

    const dialogRef = this.dialog.open(AddLineWidgetFormComponent, {
      width: "300px",
      height: "100%",
      disableClose: true,
      position: { top: "0", right: "0", bottom: "0" },
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("onEdit result", result);
      this.result = result;
    });
  }

  onDelete(data: any) {
    console.log("onDelete", data);
  }
}
