Ext.define("test.comp.main.MainController", {
  extend: "Ext.app.ViewController",

  alias: "controller.main",

  init: function (test, value) {
    var sessionSet = localStorage.getItem("userSessionKm");
    // direct to login window if user has no Session 
    if (!sessionSet) {
      Ext.create({
        xtype: "login",
      });
    }
  },
});
