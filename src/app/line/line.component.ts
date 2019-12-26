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

  // options = {
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "cross",
  //       label: {
  //         backgroundColor: "#6a7985"
  //       }
  //     }
  //   },
  //   legend: {
  //     data: ["X-1", "X-2", "X-3", "X-4", "X-5"]
  //   },
  //   grid: {
  //     left: "3%",
  //     right: "4%",
  //     bottom: "3%",
  //     containLabel: true
  //   },
  //   xAxis: [
  //     {
  //       type: "category",
  //       boundaryGap: false,
  //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  //     }
  //   ],
  //   yAxis: [
  //     {
  //       type: "value"
  //     }
  //   ],
  //   series: [
  //     {
  //       name: "X-1",
  //       type: "line",
  //       stack: "counts",
  //       areaStyle: { normal: {} },
  //       data: [120, 132, 101, 134, 90, 230, 210]
  //     },
  //     {
  //       name: "X-2",
  //       type: "line",
  //       stack: "counts",
  //       areaStyle: { normal: {} },
  //       data: [220, 182, 191, 234, 290, 330, 310]
  //     },
  //     {
  //       name: "X-3",
  //       type: "line",
  //       stack: "counts",
  //       areaStyle: { normal: {} },
  //       data: [150, 232, 201, 154, 190, 330, 410]
  //     },
  //     {
  //       name: "X-4",
  //       type: "line",
  //       stack: "counts",
  //       areaStyle: { normal: {} },
  //       data: [320, 332, 301, 334, 390, 330, 320]
  //     },
  //     {
  //       name: "X-5",
  //       type: "line",
  //       stack: "counts",
  //       label: {
  //         normal: {
  //           show: true,
  //           position: "top"
  //         }
  //       },
  //       areaStyle: { normal: {} },
  //       data: [820, 932, 901, 934, 1290, 1330, 1320]
  //     }
  //   ]
  // };
  constructor() {}

  ngOnInit() {
    console.log("changes", this.result1);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes["result1"].currentValue);
    this.isLoading = true;
    const data = changes["result1"].currentValue;
    this.options = this.chart.getLineWidgetOptions(
      this.yAxisOptionKPI(data.config.sColor),
      data.config
    );
  }
}
