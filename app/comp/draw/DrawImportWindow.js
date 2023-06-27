Ext.define("test.comp.draw.DrawImportWindow", {
    extend: "Ext.window.Window",
    xtype: "drawWindow",

    requires: ["test.comp.draw.DrawImportController", "test.comp.draw.DrawWindowShow", "test.util.Utility"],

    title: "Save Drawing",
    layout: "vbox",
    autoShow: true,
    resizable: false,
    modal: true,
    closable: false,
    controller: "drawImportController",

    //set over create function
    drawContainer: null,

    items: [{
        xtype: "toolbar",
        overflowX: "auto",
        width: "100%",
        dock: "top",
        items: [{
            xtype: "textfield",
            emptyText: "Enter search keyword",
            enableKeyEvents: true,
            listeners: {
                change: "onTitleFilterChange" // Replace 'filterGrid' with the actual handler function name
            }
        }, "->", {
            xtype: "button",
            text: "Cancel",
            handler: "closeWindow",
            tooltip: "close Window",
            iconCls: "x-fa fa-times-circle",
        }],
    }, {
        xtype: 'gridpanel',
        store: "drawJsonId",
        autoScroll: true,
        overflowY: "auto",
        maxHeight: 400,
        width: 600,
        listeners: {
            cellclick: "recordClick",
        },
        columns: {

            defaults: {
                flex: 1
            },
            items: [{
                    text: 'ID',
                    dataIndex: 'id',
                },
                {
                    text: 'Title',
                    dataIndex: 'title',
                    flex: 2,
                },
                {
                    text: 'Import',
                    align: "center",
                    renderer: function (value, metaData, record) {
                        var importButton = '<button class="import-button" data-record-id="' + record.getId() + '"><i class="fa fa-upload"></i> Import</button>';
                        return importButton;
                    }
                },
                {
                    text: 'Delete',
                    align: "center",
                    renderer: function (value, metaData, record) {
                        var deleteButton = '<button class="delete-button" data-record-id="' + record.getId() + '"><i class="fa fa-trash"></i> Delete</button>';
                        return deleteButton;
                    }
                }
            ],

        }
    }],
});