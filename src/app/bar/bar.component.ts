import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Chart } from "./../line/line-config.model";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

 isLoading: boolean = true;
  updateOptions: any;
  @Input() result1: any;
  options: any;
  chart = new Chart();
  data = [
    {
      name: "X-1",
      type: "bar",
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ];

  yAxisOptionKPI(color: string) {
    const option = this.data;
    let newValue: any;
    const b = {
      itemStyle: {
        color: color
      }
    };
    const c = Object.assign({}, option[0], b);
    return [c];
  }

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