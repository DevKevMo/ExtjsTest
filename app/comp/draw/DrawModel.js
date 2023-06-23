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
                    name: "link",
                    type: "string",
                    mapping: "LINK",
                },
                {
                    name: "title",
                    type: "string",
                    mapping: "TITLE",
                }
            ],
            autoLoad: true,
            storeId: "drawListId",
            proxy: {
                type: "ajax",
                url: "../../api/draw.cfc?method=getDraw",
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
                    read: "../../api/draw.cfc?method=getDraw", //calls load
                    update: "../../api/draw.cfc?method=updateDraw", //sync
                    destroy: "../../api/draw.cfc?method=deleteDraw", //sync 
                },
            },
        },
    },
});