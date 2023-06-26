Ext.define("test.comp.draw.Draw", {
  extend: "Ext.tab.Panel",
  xtype: "drawView",
  requires: ["test.comp.draw.DrawController", "test.comp.draw.DrawWindow", "test.comp.draw.DrawModel"],
  controller: "draw",
  viewModel: "draw",

  dockedItems: [{

    xtype: "toolbar",
    dock: "top",
    overflowX: "auto",
    items: [{
        xtype: "tbtext",
        text: "color Picker:",
      },
      {
        xtype: "colorpicker",
        reference: "colorpicker",
        fieldLabel: "Color",
        listeners: {
          select: "onColorSelect",
        },
      },
      "-",
      {
        xtype: "tbtext",
        text: "Change width:",
      },
      {
        xtype: "numberfield",
        minValue: 1,
        maxValue: 100,
        value: 2,
        listeners: {
          change: "onWidthChange",
        },
      },
      "-",
      {
        xtype: "segmentedbutton",
        items: [{
            text: "Line",
            iconCls: "x-fa fa-pencil",
            pressed: true, // initally selected
            handler: "onModeButtonClick",
            tooltip: "change mode to line",
          },
          {
            text: "Circle",
            iconCls: "x-fa fa-circle",
            handler: "onModeButtonClick",
            tooltip: "change mode to circle",
          },
        ],
      },
      "->",
      {
        xtype: "button",
        text: "import",
        handler: "onImportClick",
        tooltip: "ImportDrawing",
        iconCls: "x-fa fa-upload",
      },
      "-",
      {
        xtype: "button",
        text: "Save",
        handler: "onSaveClick",
        tooltip: "Save Drawing",
        iconCls: "x-fa fa-save",
      },
      "-",
      {
        xtype: "button",
        text: "Clear",
        handler: "onClearClick",
        tooltip: "clear drawing",
        iconCls: "x-fa fa-trash",
      },
    ],
  }],
  items: [{
    xtype: "draw",
    title: "Field:",
    flex: 1,
    reference: "drawContainer",
    sprites: [],
    listeners: {
      element: "element",
      mousedown: "onMouseDown",
      mousemove: "onMouseMove",
      mouseup: "onMouseUp",
    },
  }, ],
});