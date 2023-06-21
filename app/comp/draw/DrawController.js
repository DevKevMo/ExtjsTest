Ext.define("test.comp.draw.DrawController", {
  extend: "Ext.app.ViewController",
  alias: "controller.draw",

  onMouseDown: function (event) {
    this.drawing = true;
    this.lineWidth = 3;
    drawContainer = this.lookup("drawContainer");
    var surface = drawContainer.getSurface("main");
    var startPoint = [event.pageX, event.pageY - 220];
    var line = Ext.create("Ext.draw.sprite.Line", {
      fromX: startPoint[0],
      fromY: startPoint[1],
      toX: startPoint[0],
      toY: startPoint[1],
      strokeStyle: this.getColor(),
      lineWidth: this.lineWidth,
    });
    surface.add(line);
    surface.renderFrame();
    this.line = line;
    this.drawing = true;
  },
  onMouseMove: function (event) {
    if (this.drawing) {
      var drawContainer = this.lookup("drawContainer");
      var surface = drawContainer.getSurface("main");
      var endPoint = [event.pageX, event.pageY - 220];
      var lineSegment = Ext.create("Ext.draw.sprite.Line", {
        fromX: this.line.toX,
        fromY: this.line.toY,
        toX: endPoint[0],
        toY: endPoint[1],
        strokeStyle: this.getColor(),
        lineWidth: this.lineWidth,
      });
      surface.add(lineSegment);
      surface.renderFrame();
      this.line = lineSegment;
    }
  },
  onMouseUp: function (event) {
    this.line = null;
    this.drawing = false;
  },

  setColor: function (color) {
    this.color = `#${color}`;
  },

  getColor: function () {
    return this.color || "black";
  },
});
