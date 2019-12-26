export class LineDTO {
  name: string;
  bgColor: any;
  titleColor: any;
  cols: number;
  rows: number;
  pkey: number;
  id: string;
  config = new LineCongifDTO();
}

export class LineCongifDTO {
  xLabel: "Time";
  xColor: "red";
  sColor: "black";
  yLabel: 'Value';
  yColor: 'red';
}
