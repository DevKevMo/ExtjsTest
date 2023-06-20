Ext.define("test.comp.chart.ChartModel", {
  extend: "Ext.app.ViewModel",
  alias: "viewmodel.chart",
  stores: {
    chartStore: {
      fields: ["categoryField", "valueField"], // Replace with your actual field names

      data: [
        { categoryField: "Category 1", valueField: 10 },
        { categoryField: "Category 2", valueField: 20 },
        { categoryField: "Category 3", valueField: 15 },
        // Add more data as needed
      ],
    },
  },
});
