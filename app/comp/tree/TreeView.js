Ext.define("test.comp.tree.TreeView", {
    extend: "Ext.tab.Panel",
    xtype: "treeView",
    requires: ["test.comp.tree.TreeController", "test.comp.tree.TreeModel", "test.util.Utility"],
    controller: "tree",
    viewModel: "tree",
  
    dockedItems: [{
  
      xtype: "toolbar",
      dock: "top",
      overflowX: "auto",
      items: [{
          xtype: "tbtext",
          text: "Mouse Color:",
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
        "->",
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
    items: [
        /* Add Tree Panel  */
    ],
  });