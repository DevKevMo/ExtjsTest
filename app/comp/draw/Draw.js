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
          fieldLabel: "Color",
          listeners: {
            select: function (picker, color) {
              // Handle color selection
              var selectedColor = color;
              // Your logic here
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
