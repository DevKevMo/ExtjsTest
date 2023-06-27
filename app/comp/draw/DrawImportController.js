Ext.define("test.comp.draw.DrawImportController", {
    extend: "Ext.app.ViewController",
    alias: "controller.drawImportController",

    init: function () {
        var drawList = Ext.StoreMgr.lookup("drawListId").load();
        Ext.each(drawList.data.items, function (item) { // loop over all Images
            Ext.Ajax.request({ // get Json data from Image
                url: item.data.link,
                method: "GET",
                success: function (response) {
                    var jsonData = Ext.decode(response.responseText);
                    var title = item.data.title
                    var id = item.data.id
                    Ext.StoreMgr.lookup("drawJsonId").add({ // create new record in grid store
                        "title": title,
                        "id": id,
                        "data": jsonData,
                    });
                },
                failure: function (error) {
                    Ext.toast(error.status + ": " + error.statusText)
                }
            });
        });
    },

    recordClick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var drawContainer = this.view.drawContainer;
        var target = Ext.get(e.getTarget());
        if (target.hasCls('delete-button')) {
            test.util.Utility.deleteDrawing(record);

        } else if (target.hasCls('import-button')) {
            test.util.Utility.createSurface(record, drawContainer);

        } else {
            Ext.create("test.comp.draw.DrawWindowShow", {
                drawContainer: drawContainer,
                record: record,
            });
        }
    },

    closeWindow: function () {
        this.getView().destroy();
    },
});