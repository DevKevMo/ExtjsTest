Ext.define("test.comp.main.MainController", {
  extend: "Ext.app.ViewController",

  alias: "controller.main",

  init: function (test, value) {
    var sessionSet;
    sessionSet = localStorage.getItem("userSessionKm");
    Ext.create({
      xtype: sessionSet ? "" : "login",
    });
  },
});
