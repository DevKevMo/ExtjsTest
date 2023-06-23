Ext.define("test.comp.draw.DrawWindow", {
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

    items: [{
        xtype: "toolbar",
        dock: "top",
        items: [{
                xtype: "tbtext",
                text: "Title:",
            },
            {
                xtype: "textfield",
                name: "title",
            },
            "->",
            {
                xtype: "button",
                text: "Save",
                handler: "saveDrawing",
                tooltip: "Save Drawing",
                iconCls: "x-fa fa-save",
            },
            "-",
            {
                xtype: "button",
                text: "Cancel",
                handler: "closeWindow",
                tooltip: "close Window",
                iconCls: "x-fa fa-times-circle",
            },
        ],
    }, ],
});