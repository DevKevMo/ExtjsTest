Ext.define("test.comp.draw.DrawModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.draw",
    stores: {
        drawList: {
            fields: [{
                    name: "id",
                    type: "number",
                    mapping: "ID",
                },
                {
                    name: "title",
                    type: "string",
                    mapping: "TITLE",
                },
                {
                    name: "link",
                    type: "string",
                    mapping: "LINK",
                },
            ],
            storeId: "drawListId",
            autoLoad: true,
            proxy: {
                type: "ajax",
                url: "http://dokuwebdev.datasec.de/azubi_kmoritz/exttraining/test/app/api/draw.cfc?method=getDraw",
                extraParams: {
                    SID: localStorage.getItem("userSessionKm"),
                },
                reader: {
                    type: "json",
                    rootProperty: "DATA",
                },
                writer: {
                    type: "json",
                },
                api: {
                    read: "http://dokuwebdev.datasec.de/azubi_kmoritz/exttraining/test/app/api/draw.cfc?method=getDraw", //calls load
                },
            },
        },
        drawJson: {
            fields: [{
                name: "data",
                type: "auto",
                mapping: "DATA",
            }, {
                name: "title",
                type: "string",
                mapping: "TITLE",
            }],
            storeId: "drawJsonId",
            autoLoad: true,
            data: []
        }
    },
});