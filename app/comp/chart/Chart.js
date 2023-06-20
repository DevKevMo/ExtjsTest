Ext.define("test.comp.chart.Chart", {
  extend: "Ext.tab.Panel",
  xtype: "chartView",

  requires: ["test.comp.chart.ChartController", "test.comp.chart.ChartModel"],
  controller: "chart",
  viewModel: "chart",

  items: [],
});
