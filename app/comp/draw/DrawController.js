Ext.define("test.comp.draw.DrawController", {
  extend: "Ext.app.ViewController",
  alias: "controller.draw",

  // Toolbar functions

  onColorSelect: function (colorPicker, newColor) {
    this.setColor(newColor);
  },

  onWidthChange: function (numberField, newWidth) {
    this.setWidth(newWidth);
  },

  onModeButtonClick: function (button) {
    var mode = button.getText();
    this.setDrawingMode(mode);
  },

  onClearClick: function () {
    var drawContainer = this.lookup("drawContainer");
    var surface = drawContainer.getSurface("main");
    surface.removeAll();
    surface.renderFrame();
  },

  // Mouse clicks for drawing

  onMouseDown: function (event) {
    this.drawing = true;
    var drawContainer = this.lookup("drawContainer");
    var surface = drawContainer.getSurface("main");
    var startPoint = [event.pageX, event.pageY - 220];
    if (this.getDrawingMode() === "Line") {
      var line = Ext.create("Ext.draw.sprite.Line", {
        fromX: startPoint[0],
        fromY: startPoint[1],
        toX: startPoint[0],
        toY: startPoint[1],
        strokeStyle: this.getColor(),
        lineWidth: this.getWidth(),
      });
      surface.add(line);
      this.line = line;
    } else if (this.getDrawingMode() === "Circle") {
      var dot = Ext.create("Ext.draw.sprite.Circle", {
        x: startPoint[0],
        y: startPoint[1],
        radius: this.getWidth(),
        fillStyle: this.getColor(),
      });
      surface.add(dot);
      this.dot = dot;
    }
    surface.renderFrame();
    this.drawing = true;
  },
  onMouseMove: function (event) {
    if (this.drawing) {
      var drawContainer = this.lookup("drawContainer");
      var surface = drawContainer.getSurface("main");
      var endPoint = [event.pageX, event.pageY - 220];

      if (this.getDrawingMode() === "Line") {
        var lineSegment = Ext.create("Ext.draw.sprite.Line", {
          fromX: this.line.toX,
          fromY: this.line.toY,
          toX: endPoint[0],
          toY: endPoint[1],
          strokeStyle: this.getColor(),
          lineWidth: this.getWidth(),
        });
        surface.add(lineSegment);
        this.line = lineSegment;
      } else if (this.getDrawingMode() === "Circle") {
        var dot = Ext.create("Ext.draw.sprite.Circle", {
          x: endPoint[0],
          y: endPoint[1],
          radius: this.getWidth(),
          fillStyle: this.getColor(),
        });
        surface.add(dot);
        this.dot = dot;
      }
      surface.renderFrame();
    }
  },
  onMouseUp: function (event) {
    this.line = null;
    this.drawing = false;
  },

  // Styling (setter and getter)

  setColor: function (color) {
    this.color = `#${color}`;
  },

  getColor: function () {
    return this.color || "black";
  },

  setWidth: function (width) {
    this.width = width;
  },

  getWidth: function () {
    return this.width || 2;
  },

  setDrawingMode: function (mode) {
    this.drawingMode = mode;
  },

  getDrawingMode: function () {
    return this.drawingMode || "Line";
  },
});
