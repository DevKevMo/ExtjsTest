Ext.define("test.comp.main.Main", {
  extend: "Ext.tab.Panel",
  xtype: "main",

  requires: ["test.comp.main.MainController", "test.comp.chart.Chart"],
  controller: "main",

  items: [
    {
      title: "Chart",
      xtype: "chartView",
    },
    {
      title: "tree",
    },
  ],
});
