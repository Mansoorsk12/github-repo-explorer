import Highcharts from "highcharts";
import HighchartsReactModule from "highcharts-react-official";

const HighchartsReact =
  HighchartsReactModule?.default || HighchartsReactModule;
import {
  formatMetricValue,
  formatShortWeek,
  metricLabels,
} from "../../utils/analyticsUtils";

function ContributorChart({
  weeks,
  series,
  metric,
}) {
  const options = {
    chart: {
      type: "spline",

      backgroundColor:
        "transparent",

      height: 470,

      spacing: [
        20,
        20,
        20,
        20,
      ],
    },

    title: {
      text: undefined,
    },

    credits: {
      enabled: false,
    },

    xAxis: {
      type: "datetime",

      tickPositions: weeks,

      labels: {
        formatter() {
          return formatShortWeek(
            this.value
          );
        },

        style: {
          color: "#87928f",
        },
      },

      lineColor:
        "rgba(255,255,255,.08)",

      tickColor:
        "rgba(255,255,255,.08)",
    },

    yAxis: {
      title: {
        text: "Count",

        style: {
          color: "#87928f",
        },
      },

      min: 0,

      allowDecimals: false,

      gridLineColor:
        "rgba(255,255,255,.07)",

      labels: {
        style: {
          color: "#87928f",
        },
      },
    },

    tooltip: {
      shared: false,

      useHTML: true,

      formatter() {
        return `
          <div style="padding:4px">

            <strong>
              ${this.series.name}
            </strong>

            <br/>

            ${Highcharts.dateFormat(
              "%b %e, %Y",
              this.x
            )}

            <br/>

            ${metricLabels[metric]}:

            <strong>
              ${formatMetricValue(
                this.y
              )}
            </strong>

          </div>
        `;
      },
    },

    /*
      Highcharts automatically allows
      clicking legend items to hide/show
      individual contributor lines.
    */

    legend: {
      enabled: true,

      itemStyle: {
        color: "#c8d0ce",
        fontWeight: "600",
      },

      itemHoverStyle: {
        color: "#16d9a3",
      },

      navigation: {
        activeColor:
          "#16d9a3",

        inactiveColor:
          "#69736f",
      },
    },

    plotOptions: {
      series: {
        animation: {
          duration: 450,
        },

        marker: {
          enabled: false,

          states: {
            hover: {
              enabled: true,
              radius: 4,
            },
          },
        },
      },
    },

    series: series.map(
      (item) => ({
        name: item.name,

        data: weeks.map(
          (week, index) => [
            week,
            item.data[index] || 0,
          ]
        ),
      })
    ),
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

export default ContributorChart;