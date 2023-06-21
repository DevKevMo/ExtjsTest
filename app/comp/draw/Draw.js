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
            select: function (picker, color) {
              var drawController = picker.up("drawView").getController();
              drawController.setColor(color);
            },
          },
        },
        // Add more toolbar items if needed
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
