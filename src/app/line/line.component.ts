import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Chart } from "./line-config.model";

@Component({
  selector: "app-line",
  templateUrl: "./line.component.html",
  styleUrls: ["./line.component.css"]
})
export class LineComponent implements OnInit, OnChanges {
  isLoading: boolean = true;
  updateOptions: any;
  @Input() result1: any;
  options: any;
  chart = new Chart();
  data = [
    {
      name: "X-1",
      type: "line",
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ];

  yAxisOptionKPI(color: string) {
    const option = this.data;
    let newValue: any;
    const b = {
      lineStyle: {
        color: color
      }
    };
    const c = Object.assign({}, option[0], b);
    return [c];
  }

  yAxisOptionKPIDual(color: any) {
    return [
      {
        name: "X-1",
        type: "line",
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "X-2",
        type: "line",
        data: [320, 232, 101, 234, 100, 230, 210],
        yAxisIndex: 1
      }
    ];
  }

  constructor() {}

  ngOnInit() {
    console.log("changes", this.result1);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes["result1"].currentValue);
    this.isLoading = true;
    const data = changes["result1"].currentValue;
     console.log("SimpleChanges changes", data.config.yAxis === "'Single'");
    const series =
      data.config.yAxis === "Single"
        ? this.yAxisOptionKPI(data.config.sColor)
        : this.yAxisOptionKPIDual(data.config.sColor);
    this.options = this.chart.getLineWidgetOptions(series, data.config);
  }
}
