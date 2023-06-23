Ext.define("test.comp.draw.DrawController", {
  extend: "Ext.app.ViewController",
  alias: "controller.draw",

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
        var prevLineSegment = this.line;
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

        if (prevLineSegment && this.getWidth() > 6) {
          this.interpolationDraw(this.getDrawingMode(), surface, lineSegment, prevLineSegment)
        }
      } else if (this.getDrawingMode() === "Circle") {
        var prevDot = this.dot; // Store the previous dot
        var dot = Ext.create("Ext.draw.sprite.Circle", {
          x: endPoint[0],
          y: endPoint[1],
          radius: this.getWidth(),
          fillStyle: this.getColor(),
        });
        surface.add(dot);
        this.dot = dot;
        if (prevDot) {
          this.interpolationDraw(this.getDrawingMode(), surface, dot, prevDot)
        }
      }
      surface.renderFrame();
    }
  },

  onMouseUp: function (event) {
    this.line = null;
    this.drawing = false;
  },

  //draw functions

  interpolationDraw: function (type, surface, item, prevItem) {
    if (type === "Line") {
      var dx = item.toX - prevItem.toX;
      var dy = item.toY - prevItem.toY;
      var distance = Math.sqrt(dx * dx + dy * dy); // Euclidean distance

      var numSegments = Math.ceil(distance / this.getWidth()); // Calculate the number of lines needed
      var xStep = dx / numSegments;
      var yStep = dy / numSegments;

      for (var i = 0; i <= numSegments; i++) {
        var fromX = prevItem.toX + (xStep * i);
        var fromY = prevItem.toY + (yStep * i);
        var toX = prevItem.toX + (xStep * (i + 1));
        var toY = prevItem.toY + (yStep * (i + 1));

        var line = Ext.create("Ext.draw.sprite.Line", {
          fromX: fromX,
          fromY: fromY,
          toX: toX,
          toY: toY,
          strokeStyle: this.getColor(),
          lineWidth: this.getWidth(),
        });
        surface.add(line);
        surface.add(lineDot);
      }
    } else if (type === "Circle") {
      var dx = item.x - prevItem.x;
      var dy = item.y - prevItem.y;
      var distance = Math.sqrt(dx * dx + dy * dy); // Euclidean distance
      var numCircles = Math.ceil(distance / this.getWidth()); // Calculate the number of circles needed
      var xStep = dx / numCircles;
      var yStep = dy / numCircles;
      for (var i = 0; i <= numCircles; i++) {
        var x = prevItem.x + (xStep * i);
        var y = prevItem.y + (yStep * i);
        var lineDot = Ext.create("Ext.draw.sprite.Circle", {
          x: x,
          y: y,
          radius: this.getWidth(),
          fillStyle: this.getColor(),
        });
        surface.add(lineDot);
      }
    }
  },


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

  onSaveClick: function () {
    var drawContainer = this.lookup("drawContainer");
    var surface = drawContainer.getSurface("main");
    var sprites = surface.getItems();
    var drawingData = [];
    Ext.each(sprites, function (sprite) {
      if (sprite.isSprite && sprite.type === "circle") {
        drawingData.push({
          type: "circle",
          x: sprite.attr.cx,
          y: sprite.attr.cy,
          radius: sprite.attr.radius,
          fillStyle: sprite.attr.fillStyle,
        });
      } else if (sprite.isSprite && sprite.type === "line") {
        drawingData.push({
          type: "line",
          fromX: sprite.attr.fromX,
          fromY: sprite.attr.fromY,
          toX: sprite.attr.toX,
          toY: sprite.attr.toY,
          strokeStyle: sprite.attr.strokeStyle,
          lineWidth: sprite.attr.lineWidth,
        });
      }
    });

    Ext.create("test.comp.draw.DrawWindow", {
      drawImg: drawContainer.getImage(),
      imgSize: drawContainer.size,
      drawingData: drawingData,
    });
  },

  onClearClick: function () {
    var drawContainer = this.lookup("drawContainer");
    var surface = drawContainer.getSurface("main");
    surface.removeAll();
    surface.renderFrame();
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