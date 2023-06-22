Ext.define("test.comp.draw.DrawWindowController", {
  extend: "Ext.app.ViewController",
  alias: "controller.drawWindowController",

  LoadWindowDraw: function (img) {
    var window = img.up("drawWindow");
    img.setSrc(window.drawImg.data);
    var size = window.imgSize;
    img.setHeight(size.height / 4);
    img.setWidth(size.width / 4);
    debugger;
  },

  saveDrawing: function (btn) {},

  closeWindow: function () {
    this.getView().destroy();
  },
});
