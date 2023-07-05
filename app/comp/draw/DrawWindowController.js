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

    saveDrawing: function () {
        var title = this.lookup("imageTitle").value;
        var drawingData = Ext.encode(this.view.drawingData);
        if (drawingData != '[]' && title != "") {
            var userSession = localStorage.getItem("userSessionKm");
            Ext.Ajax.request({
                url: "app/api/draw.cfc?method=addDrawing",
                method: "POST",
                params: {
                    title: title,
                    SID: userSession,
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

    onTextFieldSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.saveDrawing();
        }
    },

    closeWindow: function () {
        this.getView().destroy();
    },
});