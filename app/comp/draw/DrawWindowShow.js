Ext.define("test.comp.draw.DrawWindowShow", {
    extend: "Ext.window.Window",
    xtype: "drawWindowShow",

    requires: ["test.comp.draw.DrawWindowShowController"],

    title: "Show Drawing",
    layout: "vbox",
    autoShow: true,
    modal: true,
    resizable: false,
    controller: "drawWindowShowController",

    //set over create function
    drawContainer: null,
    record: null,

    items: [{
        xtype: "toolbar",
        dock: "top",
        width: "100%",
        items: [{
                xtype: "tbtext",
                reference: "imageTitle",
                text: "Title: "
            },
            "->",
            {
                xtype: "button",
                text: "import",
                handler: "saveDrawing",
                tooltip: "Save Drawing",
                iconCls: "x-fa fa-save",
            },
            "-",
            {
                xtype: "button",
                text: "delete",
                handler: "deleteRecord",
                tooltip: "close Window",
                iconCls: "x-fa fa-times-circle",
            }, "-", {
                xtype: "button",
                text: "cancel",
                handler: "closeWindow",
                tooltip: "Save Drawing",
                iconCls: "x-fa fa-save",
            },
        ],
    }, {
        xtype: "container",
        padding: 10,
        layout: {
            type: "vbox",
            align: "center",
            pack: "center",
        },
        items: [{
            xtype: "image",
            listeners: {
                afterrender: "LoadWindowDraw",
            },
            style: {
                border: "1px solid black",
            },
        }, ],
    }, ],
});