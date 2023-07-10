Ext.define("test.comp.draw.DrawController", {
  extend: "Ext.app.ViewController",
  alias: "controller.draw",

  // Mouse functions for drawing
  onMouseDown: function (event) {
    this.clearLogForBackAndForth();
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
      this.setArrayOfStripes(this.line, true)
    } else if (this.getDrawingMode() === "Circle") {
      var dot = Ext.create("Ext.draw.sprite.Circle", {
        x: startPoint[0],
        y: startPoint[1],
        radius: this.getWidth(),
        fillStyle: this.getColor(),
      });
      surface.add(dot);
      this.dot = dot;
      this.setArrayOfStripes(this.dot, true)
    }
    surface.renderFrame();
    this.drawing = true;
  },

  onMouseMove: function (event) {
    if (this.drawing) {
      var drawContainer = this.lookup("drawContainer");
      var surface = drawContainer.getSurface("main");
      var endPoint = [event.pageX, event.pageY - 220];
      var interpolation = false; // state of interpolation (active or not)

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
        this.setArrayOfStripes(lineSegment, false)
        if (prevLineSegment && this.getWidth() > 6 && interpolation) {
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
        this.setArrayOfStripes(dot, false)
        if (prevDot && interpolation) {
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
        this.setArrayOfStripes(line, false)
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
        this.setArrayOfStripes(lineDot, false)
        surface.add(lineDot);
      }
    }
  },


  // Toolbar functions

  onColorSelect: function (colorPicker, newColor) {
    this.setColor(newColor);
  },

  onWidthChange: function (numberField, newWidth) {
    if (newWidth <= 100) {
      this.setWidth(newWidth);
      this.lookup("scaleFieldWidth").setValue(newWidth)
      this.lookup("numberFieldWidth").setValue(newWidth)
    } else {
      Ext.toast("number cant be over 100");
    }
  },

  onWidthChangeScale: function (scaleField, newWidth) {
    this.onWidthChange(scaleField, newWidth)
  },

  onModeButtonClick: function (button) {
    var mode = button.getText();
    this.setDrawingMode(mode);
  },

  onImportClick: function () {
    var drawContainer = this.lookup("drawContainer");
    Ext.create("test.comp.draw.DrawImportWindow", {
      drawContainer: drawContainer,
    });
  },

  goForward: function () {
    var drawContainer = this.lookup("drawContainer");
    this.setPositionInArray(this.getPositionInArray() + 1)
    var surface = drawContainer.getSurface("main");
    var elements = this.getArrayOfStripes()[this.getArrayOfStripes().length - 1 + this.getPositionInArray()]
    if (elements) {
      elements.map(x => {
        surface.add(x);
      });
      surface.renderFrame();
    } else {
      this.setPositionInArray(this.getPositionInArray() - 1)
      Ext.toast("sorry cant go forward")
    }
  },

  goBack: function () {
    var drawContainer = this.lookup("drawContainer");
    var surface = drawContainer.getSurface("main");
    this.setPositionInArray(this.getPositionInArray() - 1)
    var elements = this.getArrayOfStripes()[this.getArrayOfStripes().length + this.getPositionInArray()]
    if (elements) {
      elements.map(x => {
        surface.remove(x);
      });
      surface.renderFrame();
    } else {
      this.setPositionInArray(this.getPositionInArray() + 1)
      Ext.toast("sorry cant go back")
    }
  },

  clearLogForBackAndForth: function () {
    var array = this.getArrayOfStripes();
    var position = this.getPositionInArray();
    if (position < 0) {
      array.splice(position)
      this.setPositionInArray(0)
    }
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
          radius: sprite.attr.lineWidth,
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
    this.arrayOfStripes = [];
    this.setPositionInArray(0);
  },

  // setter and getter

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

  setArrayOfStripes: function (element, start) {
    if (this.arrayOfStripes === undefined) {
      this.arrayOfStripes = []; // Initialize the array if it's undefined
    }
    if (start) {
      this.arrayOfStripes.push([element]); // Start a new sub-array with the current element
    } else {
      var lastEntry = this.arrayOfStripes.length - 1;
      this.arrayOfStripes[lastEntry].push(element); // Add the element to the last sub-array
    }
  },

  getArrayOfStripes: function () {
    return this.arrayOfStripes || null;
  },

  setPositionInArray: function (position) {
    this.position = position
  },

  getPositionInArray: function () {
    return this.position || null
  },
});