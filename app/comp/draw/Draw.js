Ext.define("test.comp.draw.Draw", {
  extend: "Ext.tab.Panel",
  xtype: "drawView",

  requires: ["test.comp.draw.DrawController"],

  controller: "draw",

  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      items: [
        {
          xtype: "colorpicker",
          reference: "colorpicker",
          fieldLabel: "Color",
          listeners: {
            select: "onColorSelect",
          },
        },
        {
          xtype: "numberfield",
          fieldLabel: "Line Width",
          minValue: 1,
          maxValue: 10,
          value: 2,
          listeners: {
            change: "onWidthChange",
          },
        },
        {
          xtype: "segmentedbutton",
          items: [
            {
              text: "Line",
              pressed: true, // initally selected
              handler: "onModeButtonClick",
            },
            {
              text: "Circle",
              handler: "onModeButtonClick",
            },
          ],
        },
        {
          xtype: "button",
          text: "Clear",
          handler: "onClearClick",
        },
      ],
    },
  ],
  items: [
    {
      xtype: "draw",
      title: "Draw",
      flex: 1,
      reference: "drawContainer",
      sprites: [],
      listeners: {
        element: "element",
        mousedown: "onMouseDown",
        mousemove: "onMouseMove",
        mouseup: "onMouseUp",
      },
    },
  ],
});
