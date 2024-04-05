export function salesSummaryOptions(arr) {
  const salesSummaryOptionsData = {
    chart: {
      type: "column", // Use 'column' type for a vertical bar graph
      borderRadius: "10px",
    },

    title: {
      text: "Daily Sales Update",
    },
    xAxis: {
      categories: arr.date,
      title: {
        text:
          arr.date[0] == "January" ? "Month of this year" : "Days of this week",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Sales",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    series: [
      {
        name: "Sales",
        data: arr.sales,
      },
    ],

    plotOptions: {
      column: {
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
      },

      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    credits: {
      enabled: false,
    },
  };

  return salesSummaryOptionsData;
}

export function bestSellerSummaryOptions(arr) {
  const chartOptions = {
    chart: {
      type: "area",
    },
    title: {
      text: "Best Selling Products",
    },
    xAxis: {
      categories: arr.map((item) => item.name),
    },
    yAxis: {
      title: {
        text: "Stocks Sold",
      },
    },
    series: [
      {
        data: arr.map((item) => item.stocksSold),
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#2a5298"], // Dark Blue
            [0.5, "#5b8def"], // Medium Blue
            [1, "#c8d9eb"], // Light Blue
          ],
        },
      },
    ],
    plotOptions: {
      area: {
        stacking: "normal", // This makes series stacked on top of each other
        lineColor: "#ffffff",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#ffffff",
        },
        fillOpacity: 1, // Adjust for desired transparency
      },
    },
    credits: {
      enabled: false,
    },
  };

  return chartOptions;
}

export function customerEngagementChart(arr) {
  const chartOptions = {
    chart: {
      type: "area",
    },
    title: {
      text: "Customer Engagement Summary",
    },
    xAxis: {
      categories: arr.map((item) => item.month),
    },
    yAxis: {
      title: {
        text: "Stocks Sold",
      },
    },
    series: [
      {
        data: arr.map((item) => item.engagements.length),
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "#1e90ff"], // Start with a bright blue
            [1, "rgba(30,144,255,0)"], // Fade to transparent blue
          ],
        },
      },
    ],
    plotOptions: {
      area: {
        stacking: "normal", // This makes series stacked on top of each other
        lineColor: "#ffffff",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#000",
        },
        fillOpacity: 1, // Adjust for desired transparency
      },
    },
    credits: {
      enabled: false,
    },
  };

  return chartOptions;
}

export function orderSummary(arr) {
  const chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Order Status",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: ["#1e90ff", "#00bfff", "#87cefa"], // Shades of blue
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Orders",
        colorByPoint: true,
        data: arr.map((order) => ({
          name: order.status,
          y: order.count,
        })),
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return chartOptions;
}
