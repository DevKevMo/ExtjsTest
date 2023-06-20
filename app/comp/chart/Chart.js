Ext.define("test.comp.chart.Chart", {
  extend: "Ext.tab.Panel",
  xtype: "chartView",

  requires: [
    "test.comp.chart.ChartController",

    "Ext.chart.series.Bar",
    "Ext.chart.series.Line",
    "Ext.chart.series.Pie",
    "Ext.chart.axis.Numeric",
    "Ext.chart.axis.Category",
    "Ext.chart.interactions.ItemHighlight",
    "Ext.chart.interactions.PanZoom",
  ],

  controller: "chart",

  items: [
    {
      xtype: "chart",
      reference: "chart",
      title: "Column",
      store: {
        type: "columnChart",
      },
      series: [
        {
          type: "bar",
          xField: "categoryField",
          yField: "valueField",
          style: {
            minGapWidth: 10,
          },
          label: {
            field: "valueField",
            display: "insideEnd",
            renderer: Ext.util.Format.numberRenderer("0"),
          },
        },
        {
          type: "line",
          xField: "categoryField",
          yField: "valueField",
          style: {
            smooth: true,
            fill: false,
          },
          marker: true,
        },
        {
          type: "pie",
          angleField: "valueField",
          label: {
            field: "categoryField",
            display: "outside",
            calloutLine: true,
          },
        },
      ],
      axes: [
        {
          type: "numeric",
          position: "left",
          title: "Value",
          fields: ["valueField"],
          grid: true,
          minimum: 0, // Specify the minimum value for the y-axis if needed
        },
        {
          type: "category",
          position: "bottom",
          title: "Category",
          fields: ["categoryField"],
        },
      ],
    },
  ],
});
