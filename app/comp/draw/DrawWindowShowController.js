Ext.define("test.comp.draw.DrawWindowShowController", {
    extend: "Ext.app.ViewController",
    alias: "controller.drawWindowShowController",

    LoadWindowDraw: function (img) {
        record = this.view.record;
        drawField = this.view.drawContainer;
        titleField = this.lookup("imageTitle")
        titleField.setText(titleField.text + record.data.title);
        img.setSrc(this.createImage(record.data.data, drawField));
        size = drawField.size
        img.setHeight(size.height / 4);
        img.setWidth(size.width / 4);
    },

    createImage: function (imgData, drawContainer) {
        var surface = drawContainer.getSurface("main");
        surface.removeAll();
        Ext.each(imgData, function (e) {
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
        }, surface)
        surface.renderFrame()
        var Image = drawContainer.getImage().data;
        surface.removeAll();
        surface.renderFrame();
        return Image;
    },

    closeWindow: function () {
        this.getView().destroy();
    },
});