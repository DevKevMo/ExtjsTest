Ext.define("test.comp.main.Main", {
  extend: "Ext.tab.Panel",
  xtype: "main",

  requires: [
    "test.comp.main.MainController",
    "test.comp.chart.Chart",
    "test.comp.draw.Draw",
  ],
  controller: "main",

  items: [
    {
      xtype: "drawView",
      title: "Draw",
    },
    {
      xtype: "chartView",
      title: "Chart",
    },
    {
      title: "tree",
    },
  ],
});
