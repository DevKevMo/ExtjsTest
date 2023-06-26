Ext.define("test.comp.draw.DrawImportController", {
    extend: "Ext.app.ViewController",
    alias: "controller.drawImportController",

    init: function () {
        var drawList = Ext.StoreMgr.lookup("drawListId").load();
        var drawJson = Ext.StoreMgr.lookup("drawJsonId");
        Ext.each(drawList.data.items, function (item) {
            Ext.Ajax.request({
                url: item.data.link,
                method: "GET",
                success: function (response) {
                    var jsonData = Ext.decode(response.responseText);
                    var title = item.data.title
                    var id = item.data.id
                    drawJson.add({
                        "title": title,
                        "id": id,
                        "data": jsonData
                    });
                },
                failure: function (error) {
                    Ext.toast(error.status + ": " + error.statusText)
                }
            });
        });
    },

    closeWindow: function () {
        this.getView().destroy();
    },
});