export class LineDTO {
  name: string;
  bgColor: any;
  titleColor: any;
  cols: number;
  rows: number;
  id: string;
  config = new LineCongifDTO();
}

export class LineCongifDTO {
  xLabel: "time";
  xColor: "red";
}
