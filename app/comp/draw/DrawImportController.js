Ext.define("test.comp.draw.DrawImportController", {
    extend: "Ext.app.ViewController",
    alias: "controller.drawImportController",

    closeWindow: function () {
        this.getView().destroy();
    },
});