Ext.define('test.util.Utility', {
    singleton: true,

    // for all components 
    //TODO: replace the existing ajax requests with the utility one 

    makeAjaxRequest: function (url, method, jsonData, successCallback) {
        Ext.Ajax.request({
          url: url,
          method: method,
          jsonData: jsonData,
          reader: {
            type: "json",
          },
          success: successCallback,
        });
      },


    // for draw components 

    createSurface: function (record, container) {
        var surface = container.getSurface("main");
        var data = record.data.data
        surface.removeAll();
        Ext.each(data, function (e) {
            if (e.type === "line") {
                var line = Ext.create("Ext.draw.sprite.Line", {
                    fromX: e.fromX,
                    fromY: e.fromY,
                    toX: e.toX,
                    toY: e.toY,
                    strokeStyle: e.strokeStyle,
                    lineWidth: e.lineWidth,
                });
                surface.add(line);

            } else if (e.type === "circle") {
                var dot = Ext.create("Ext.draw.sprite.Circle", {
                    x: e.x,
                    y: e.y,
                    radius: e.radius,
                    fillStyle: e.fillStyle,
                });
                surface.add(dot);
            }
        }, surface);
        surface.renderFrame()
    },

    deleteDrawing: function (record, store, linkstore) {
        Ext.Ajax.request({
            url: "app/api/draw.cfc?method=deleteDraw",
            method: "POST",
            params: {
                record: JSON.stringify(record.data),
                userSession: localStorage.getItem("userSessionKm"),
            },
            success: (response) => {},
        });
        store.remove(record);
        linkstore.remove(linkstore.getById(record.data.id));
        Ext.toast("deleted Image: " + record.data.title)
    },

});