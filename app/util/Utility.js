Ext.define('test.util.Utility', {
    singleton: true,

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

    deleteDrawing: function (record, store) {
        Ext.Ajax.request({
            url: "app/api/draw.cfc?method=deleteDraw",
            method: "POST",
            params: {
                record: JSON.stringify(record.data),
                userSession: localStorage.getItem("userSessionKm"),
            },
            success: (response) => {
                Ext.toast("image Deleted")
            },
        });
        store.remove(record);
    }

});