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
        var drawingData = this.extractSurface(surface);
        surface.removeAll();
        this.createSurface(imgData, surface);
        var Image = drawContainer.getImage().data;
        surface.removeAll();
        this.createSurface(drawingData, surface);
        return Image;
    },

    createSurface: function (drawingData, surface) {
        Ext.each(drawingData, function (e) {
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

    extractSurface: function (surface) {
        var sprites = surface.getItems();
        var drawingData = [];
        Ext.each(sprites, function (sprite) {
            if (sprite.isSprite && sprite.type === "circle") {
                drawingData.push({
                    type: "circle",
                    x: sprite.attr.cx,
                    y: sprite.attr.cy,
                    radius: sprite.attr.lineWidth,
                    fillStyle: sprite.attr.fillStyle,
                });
            } else if (sprite.isSprite && sprite.type === "line") {
                drawingData.push({
                    type: "line",
                    fromX: sprite.attr.fromX,
                    fromY: sprite.attr.fromY,
                    toX: sprite.attr.toX,
                    toY: sprite.attr.toY,
                    strokeStyle: sprite.attr.strokeStyle,
                    lineWidth: sprite.attr.lineWidth,
                });
            }
        });
        return drawingData
    },

    importDrawing: function () {
        record = this.view.record;
        drawField = this.view.drawContainer;
        test.util.Utility.createSurface(record, drawField);
        this.closeWindow();
    },

    deleteRecord: function () {
        test.util.Utility.deleteDrawing(this.view.record);
    },

    closeWindow: function () {
        this.getView().destroy();
    },
});