Ext.define("test.comp.draw.DrawWindowController", {
    extend: "Ext.app.ViewController",
    alias: "controller.drawWindowController",

    LoadWindowDraw: function (img) {
        var window = img.up("drawWindow");
        img.setSrc(window.drawImg.data);
        var size = window.imgSize;
        img.setHeight(size.height / 4);
        img.setWidth(size.width / 4);
    },

    saveDrawing: function (btn) {
        var title = btn.up("toolbar").down("textfield").value;
        var drawingData = Ext.encode(btn.up("drawWindow").drawingData);
        var userId = localStorage.getItem("userIdKm");
        if (drawingData != '[]') {
            Ext.Ajax.request({
                url: "app/api/draw.cfc?method=addDrawing",
                method: "POST",
                params: {
                    title: title,
                    userId: userId,
                    dataObj: drawingData,
                },
                success: (response) => {
                    var data = JSON.parse(response.responseText);
                    Ext.toast(data.MESSAGE);
                    if (!data.ERROR) {
                        Ext.StoreMgr.lookup("drawListId").load();
                        this.getView().destroy();
                    }
                },
            });
        } else {
            Ext.toast("cant upload empty file");
            this.getView().destroy();
        }
    },

    closeWindow: function () {
        this.getView().destroy();
    },
});