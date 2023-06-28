Ext.define("test.comp.chart.AddCountryWindow", {
    extend: "Ext.window.Window",
    xtype: "countryWindow",

    requires: ["test.comp.chart.AddCountryWindowController"],

    title: "Add Country",
    layout: "vbox",
    autoShow: true,
    resizable: false,
    modal: true,
    closable: false,
    controller: "addCountryController",

    //set over create function
    graph: null,

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
                change: "onNameFilterChange" // Replace 'filterGrid' with the actual handler function name
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
        store: "countryListId",
        autoScroll: true,
        overflowY: "auto",
        maxHeight: 400,
        width: 1000,
        listeners: {
            cellclick: "recordClick",
        },
        columns: {
            defaults: {
                flex: 1
            },
            items: [{
                    text: 'ID',
                    dataIndex: 'ID',
                },
                {
                    text: 'NAME',
                    dataIndex: 'NAME',
                    flex: 2,
                }, {
                    text: 'Currencie',
                    dataIndex: 'CURRENCIES_NAME',
                    flex: 2,
                }, {
                    text: 'CCA2',
                    dataIndex: 'CCA2',
                },
                {
                    text: 'CCA3',
                    dataIndex: 'CCA3',
                },
                {
                    text: 'Symbol',
                    dataIndex: 'CURRENCIES_SYMBOL',
                },
                {
                    text: 'Import',
                    align: "center",
                    renderer: function (value, metaData, record) {
                        var importButton = '<button class="import-button" data-record-id="' + record.getId() + '"><i class="fa fa-upload"></i> Import</button>';
                        return importButton;
                    }
                },
            ],

        }
    }],
});