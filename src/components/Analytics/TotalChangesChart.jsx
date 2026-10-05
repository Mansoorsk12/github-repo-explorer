import Highcharts from "highcharts";
import HighchartsReactModule from "highcharts-react-official";

const HighchartsReact =
  HighchartsReactModule?.default || HighchartsReactModule;
import {
  formatMetricValue,
  formatShortWeek,
  metricLabels,
} from "../../utils/analyticsUtils";

function TotalChangesChart({
  weeks,
  totals,
  metric,
}) {
  const options = {
    chart: {
      type: "spline",
      backgroundColor: "transparent",
      height: 360,
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

    legend: {
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
      useHTML: true,

      formatter() {
        return `
          <div style="padding:4px">
            <strong>
              ${Highcharts.dateFormat(
                "%b %e, %Y",
                this.x
              )}
            </strong>
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

    series: [
      {
        name:
          metricLabels[metric],

        data: weeks.map(
          (week, index) => [
            week,
            totals[index] || 0,
          ]
        ),
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

export default TotalChangesChart;