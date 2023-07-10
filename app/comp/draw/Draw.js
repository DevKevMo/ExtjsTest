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
        text: "color picker:",
      },
      {
        xtype: "colorpicker",
        reference: "colorpicker",
        listeners: {
          select: "onColorSelect",
        },
      },
      "-",
      {
        xtype: "tbtext",
        text: "change width:",
      },
      {
        xtype: "numberfield",
        minValue: 1,
        maxValue: 100,
        reference: "numberFieldWidth",
        value: 2,
        listeners: {
          change: "onWidthChange",
        },
      },
      {
        xtype: 'slider',
        reference: "scaleFieldWidth",
        width: '200px',
        minValue: 1,
        maxValue: 100,
        value: 2,
        listeners: {
          change: "onWidthChangeScale",
        },
      },
      "-",
      {
        xtype: "tbtext",
        text: "change shape:",
      },
      {
        xtype: "button",
        iconCls: "x-fa fa-arrow-left",
        handler: "goBack",
        tooltip: "Go Back",
      }, {
        xtype: "button",
        iconCls: "x-fa fa-arrow-right",
        handler: "goForward",
        tooltip: "Go Forward",
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
      "-",
      "->",
      "-",
      {
        xtype: "button",
        text: "import",
        handler: "onImportClick",
        tooltip: "ImportDrawing",
        iconCls: "x-fa fa-upload",
      }, "-",
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
    flex: 1,
    title: "Field:",
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