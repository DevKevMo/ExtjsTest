Ext.define("test.comp.chart.ChartStore", {
  extend: "Ext.data.Store",
  alias: "store.columnChart",

  fields: ["categoryField", "valueField"],
  data: [
    { categoryField: "Category 1", valueField: 10 },
    { categoryField: "Category 2", valueField: 20 },
    { categoryField: "Category 3", valueField: 15 },
  ],
});
