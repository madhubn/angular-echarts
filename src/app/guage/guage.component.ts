import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-guage",
  templateUrl: "./guage.component.html",
  styleUrls: ["./guage.component.css"]
})
export class GuageComponent implements OnInit {
  option = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: 'hhhh',
            type: 'gauge',
            detail: {formatter:'{value}%'},
            data: [{value: 50, name: '完成率'}]
        }
    ]
};
  constructor() {}

  ngOnInit() {}
}
