Ext.define("test.comp.draw.DrawImportWindow", {
    extend: "Ext.window.Window",
    xtype: "drawWindow",

    requires: ["test.comp.draw.DrawImportController"],

    title: "Save Drawing",
    layout: "vbox",
    closable: false,
    autoShow: true,
    modal: true,
    resizable: false,
    controller: "drawImportController",

    //set over create function
    drawContainer: null,

    items: [],
});