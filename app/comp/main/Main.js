Ext.define("test.comp.main.Main", {
  extend: "Ext.tab.Panel",
  xtype: "main",

  requires: [
    "Ext.plugin.Viewport",
    "Ext.window.MessageBox",

    "test.comp.main.MainController",
    "test.comp.main.MainModel",
  ],
  controller: "main",
  viewModel: "main",
  plugins: "viewport",
  ui: "navigation",

  defaults: {
    bodyPadding: 20,
    tabConfig: {
      responsiveConfig: {
        "width < 1100": {
          iconAlign: "top",
          textAlign: "center",
          width: 150,
        },
        "width >= 1100": {
          iconAlign: "left",
          textAlign: "left",
          width: 200,
        },
      },
    },
  },
  items: [],
});
