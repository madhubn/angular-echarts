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
        nameLocation: "middle",
        nameTextStyle: {
          color: labelColor,
          fontSize: 13
        },
        axisLine: {
          lineStyle: {
            color: labelColor
          }
        }
      }
    ];
  }

  private yAxisOption(
    yAxisName: string,
    paddingValue: number,
    nameGapValue: number,
    fontSizeValue: number,
    labelColor: string,
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
        axisLine: {
          lineStyle: {
            color: labelColor
          }
        },
        splitNumber: 5,
        nameTextStyle: {
          color: labelColor,
          fontSize: fontSizeValue,
          padding: paddingValue
        },
        nameGap: nameGapValue
      }
    ];
  }
  private dualYAxisOption(config: any, unit?: string) {
    return [
      {
        type: "value",
        name: config.yLabel,
        position: "right",
        axisLine: {
          lineStyle: {
            color: config.yColor
          }
        },
        nameLocation: "middle",
        nameTextStyle: {
          color: config.yColor,
          fontSize: 14,
          padding: 10
        },
        nameGap: 20
      },

      {
        type: "value",
        name: config.yLabel1,
        position: "left",
        axisLine: {
          lineStyle: {
            color: config.yColor1
          }
        },
        nameLocation: "middle",
        nameTextStyle: {
          color: config.yColor1,
          fontSize: 14,
          padding: 10
        },
        nameGap: 20
      }
    ];
  }
  private dataZoom(show: boolean) {
    return [
      {
        show: show
      }
    ];
  }

  /**************************************
   * LINE WIDGET  Option For Dashboard
   ***************************************/

  getLineWidgetOptions(data: any, config: any) {
    return {
      tooltip: TOOLTIP,
      dataZoom: this.dataZoom(config.dataZoom),
      legend: this.legendOptions(),
      xAxis: this.xAxisForTime(config.xLabel, config.xColor),
      yAxis:
        config.yAxis === "Single"
          ? this.yAxisOption(config.yLabel, 10, 20, 14, config.yColor)
          : this.dualYAxisOption(config),
      series: data
    };
  }
}
