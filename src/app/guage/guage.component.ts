import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guage',
  templateUrl: './guage.component.html',
  styleUrls: ['./guage.component.css']
})
export class GuageComponent implements OnInit {

    gaugeType = "semi";
    gaugeValue = 28.3;
    gaugeLabel = "Speed";
    gaugeAppendText = "km/hr";

  constructor() { }

  ngOnInit() {
  }

}