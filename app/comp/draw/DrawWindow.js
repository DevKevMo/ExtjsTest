Ext.define("test.comp.draw.DrawWindow", {
  extend: "Ext.window.Window",
  xtype: "drawWindow",

  requires: ["test.comp.draw.DrawWindowController"],

  title: "Save Drawing",
  layout: "vbox",
  closable: false,
  autoShow: true,
  modal: true,
  resizable: false,
  controller: "drawWindowController",

  //set over create function
  drawImg: null,
  imgSize: null,
  drawingData: null,

  items: [{
      xtype: "toolbar",
      dock: "top",
      items: [{
          xtype: "tbtext",
          text: "Title:",
        },
        {
          xtype: "textfield",
          reference: "imageTitle",
          name: "title",
          listeners: {
            specialkey: "onTextFieldSpecialKey",
          },
        },
        "->",
        {
          xtype: "button",
          text: "Save",
          handler: "saveDrawing",
          tooltip: "Save Drawing",
          iconCls: "x-fa fa-save",
        },
        "-",
        {
          xtype: "button",
          text: "Cancel",
          handler: "closeWindow",
          tooltip: "close Window",
          iconCls: "x-fa fa-times-circle",
        },
      ],
    },
    {
      xtype: "container",
      width: "100%",
      padding: 10,
      layout: {
        type: "vbox",
        align: "center",
        pack: "center",
      },
      items: [{
        xtype: "image",
        reference: "drawingImage",
        maxWidth: 300,
        maxHeight: 200,
        listeners: {
          afterrender: "LoadWindowDraw",
        },
        style: {
          border: "1px solid black",
        },
      }, ],
    },
  ],
});