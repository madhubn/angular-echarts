const DATETIME_FORMAT = "DD-MM-YYYY HH:mm:ss";
const TIME_FORMAT = "HH:mm:ss";
const FORMATTER_NAME = "formatter";
const LABEL_FORMATTER_NAME = "labelFormatter";
const COLOR = ["#008000", "#ffa101", "#f6092d"];

/**** tooltip time series */
const TOOLTIP = {
  trigger: "axis",

  axisPointer: {
    animation: false
  }
};

const DATAZOOM = {
  show: true
};

export class Chart {
  private legendOptions(themeColor?: string, themeLabelColor?: string) {
    return [
      {
        show: true,
        padding: [
          25, // up
          0, // right
          0, // down
          0 // left
        ]
      }
    ];
  }
  /**** X-axis time series */
  private xAxisForTime(label: string, labelColor: string) {
    return [
      {
        type: "time",
        name: label,
        splitLine: {
          show: true
        },
        nameTextStyle: {
          color: labelColor,
          fontSize: 13
        }
      }
    ];
  }

  private yAxisOption(
    yAxisName: string,
    paddingValue: number,
    nameGapValue: number,
    fontSizeValue: number,
    unit?: string
  ) {
    return [
      {
        type: "value",
        name: `${yAxisName} ${unit === undefined ? "" : `( ${unit} )`}`,
        nameLocation: "middle",
        splitLine: {
          show: true
        },
        splitNumber: 5,
        nameTextStyle: {
          // color: '#e08e02',
          fontSize: fontSizeValue,
          padding: paddingValue
        },
        nameGap: nameGapValue
      }
    ];
  }
  private seriesData(result: any, tagName: string) {
    return [
      {
        data: result,
        name: tagName,
        showSymbol: false,
        hoverAnimation: false,
        type: "line"
      }
    ];
  }

  /**************************************
   * LINE WIDGET  Option For Dashboard
   ***************************************/

  getLineWidgetOptions(data: any, config: any) {
    return {
      tooltip: TOOLTIP,
      dataZoom: DATAZOOM,
      legend: this.legendOptions(),
      xAxis: this.xAxisForTime(config.xLabel, config.xColor),
      yAxis: this.yAxisOption(config.xLabel, 10, 20, 14, config.xColor),
      series: data
    };
  }
}
