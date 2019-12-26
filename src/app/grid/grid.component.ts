import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterContentInit
} from "@angular/core";
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
import { LineDTO, LineCongifDTO } from "./../add-line-widget-form/line.model";

import * as _ from "lodash";
export interface Tile {
  cols: number;
  rows: number;
  id: string;
  name: string;
  bgColor: any;
  titleColor: any;
  bgHeaderColor: any;
  config: LineCongifDTO;
  pkey: number;
}

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent implements OnInit, AfterContentInit {
  grid = new Map([["xs", 2], ["sm", 4], ["md", 4], ["lg", 8], ["xl", 8]]);
  result1: any;

  // @ViewChild("grid", { static: true }) grid: MatGridList;
  // cols: Subject<any> = new Subject();
  cols = 4;
  start: number;
  watcher: Subscription;
  breakpoint: number;
  tiles: Tile[] = [
    {
      pkey: 1,
      name: "Line",
      cols: 3,
      rows: 2,
      bgColor: "lightblue",
      titleColor: "black",
      bgHeaderColor: "lightblue",
      id: "LineComponent",
      config: {
        xLabel: "Time",
        xColor: "red",
        sColor: "black",
        yLabel: "value",
        yColor: "red",
        dataZoom: false,
        yAxis: "Single",
        yLabel1: "Value",
        yColor1: "red"
      }
    },
    {
      pkey: 2,
      name: "Guage",
      cols: 1,
      rows: 1,
      bgColor: "lightgreen",
      titleColor: "black",
      bgHeaderColor: "lightgreen",
      id: "GuageComponent",
      config: {
        xLabel: "Time",
        xColor: "red",
        sColor: "black",
        yLabel: "value",
        yColor: "red",
        dataZoom: false,
        yAxis: "Single",
        yLabel1: "Value",
        yColor1: "red"
      }
    },
    {
      pkey: 3,
      name: "Text",
      cols: 1,
      rows: 1,
      bgColor: "lightpink",
      bgHeaderColor: "lightpink",
      titleColor: "black",
      id: "TextWidgetComponent",
      config: {
        xLabel: "Time",
        xColor: "red",
        sColor: "black",
        yLabel: "value",
        yColor: "red",
        dataZoom: false,
        yAxis: "Single",
        yLabel1: "Value",
        yColor1: "red"
      }
    },
    {
      pkey: 4,
      name: "Bar",
      cols: 3,
      rows: 2,
      bgColor: "#DDBDF1",
      titleColor: "black",
      bgHeaderColor: "#DDBDF1",
      id: "BarComponent",
      config: {
        xLabel: "Time",
        xColor: "red",
        sColor: "black",
        yLabel: "value",
        yColor: "red",
        dataZoom: false,
        yAxis: "Single",
        yLabel1: "Value",
        yColor1: "red"
      }
    }
  ];

  constructor(
    private mediaObserver: MediaObserver,
    public dialog: MatDialog,
    public cd: ChangeDetectorRef
  ) {}

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
        pkey: 5,
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

  onEdit(data: any, index: number) {
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
      this.tiles[index] = result;
      this.tiles = _.cloneDeep(this.tiles);
      this.cd.detectChanges();
    });
  }

  onDelete(data: any) {
    console.log("onDelete", data);
  }

  personIdentity(index, item) {
    // console.log("TrackBy:", item.item, "at index", index);
    return item.pkey;
  }
}
