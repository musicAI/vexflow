/**
 * VexFlow Test Support Library
 * Copyright Mohit Muthanna 2010 <mohit@muthanna.com>
 */

Vex.Flow.Test = {}

// Test Options:
Vex.Flow.Test.RUN_CANVAS_TESTS = true;
Vex.Flow.Test.RUN_SVG_TESTS = true;
Vex.Flow.Test.RUN_RAPHAEL_TESTS = false;

Vex.Flow.Test.Font = {size: 10}

Vex.Flow.Test.genID = function() {
  return Vex.Flow.Test.genID.ID++;
}
Vex.Flow.Test.genID.ID = 0;

Vex.Flow.setupCanvasArray = function () { return ""; }

Vex.Flow.Test.createTestCanvas = function(canvas_sel_name, test_name) {
  var sel = Vex.Flow.Test.createTestCanvas.sel;
  var test_div = $('<div></div>').addClass("testcanvas");
  test_div.append($('<div></div>').addClass("name").text(test_name));
  test_div.append($('<canvas></canvas>').addClass("vex-tabdiv").
      attr("id", canvas_sel_name).
      addClass("name").text(name));
  $(sel).append(test_div);
}
Vex.Flow.Test.createTestCanvas.sel = "#vexflow_testoutput";

Vex.Flow.Test.createTestSVGorRaphael = function(canvas_sel_name, test_name) {
  var sel = Vex.Flow.Test.createTestCanvas.sel;
  var test_div = $('<div></div>').addClass("testcanvas");
  test_div.append($('<div></div>').addClass("name").text(test_name));
  test_div.append($('<div></div>').addClass("vex-tabdiv").
      attr("id", canvas_sel_name));
  $(sel).append(test_div);
}

Vex.Flow.Test.resizeCanvas = function(sel, width, height) {
  $("#" + sel).width(width);
  $("#" + sel).attr("width", width);
  $("#" + sel).attr("height", height);
}

Vex.Flow.Test.runTests = function(name, func, params) {
  if(Vex.Flow.Test.RUN_CANVAS_TESTS) {
    Vex.Flow.Test.runCanvasTest(name, func, params);
  }
  if(Vex.Flow.Test.RUN_SVG_TESTS) {
    Vex.Flow.Test.runSVGTest(name, func, params);
  }
  if(Vex.Flow.Test.RUN_RAPHAEL_TESTS) {
    Vex.Flow.Test.runRaphaelTest(name, func, params);
  }
}

Vex.Flow.Test.runCanvasTest = function(name, func, params) {
  QUnit.test(name, function(assert) {
      var test_canvas_sel = "canvas_" + Vex.Flow.Test.genID();
      var test_canvas = Vex.Flow.Test.createTestCanvas(test_canvas_sel, name + " (Canvas)");
      func({
        canvas_sel: test_canvas_sel,
        params: params,
        assert: assert },
        Vex.Flow.Renderer.getCanvasContext);
    });
}

Vex.Flow.Test.runRaphaelTest = function(name, func, params) {
  QUnit.test(name, function(assert) {
      var test_canvas_sel = "canvas_" + Vex.Flow.Test.genID();
      var test_canvas = Vex.Flow.Test.createTestSVGorRaphael(test_canvas_sel, name + " (Raphael)");
      func({
        canvas_sel: test_canvas_sel,
        params: params,
        assert: assert },
        Vex.Flow.Renderer.getRaphaelContext);
    });
}

Vex.Flow.Test.runSVGTest = function(name, func, params) {
  QUnit.test(name, function(assert) {
      var test_canvas_sel = "canvas_" + Vex.Flow.Test.genID();
      var test_canvas = Vex.Flow.Test.createTestSVGorRaphael(test_canvas_sel, name + " (SVG)");
      func({
        canvas_sel: test_canvas_sel,
        params: params,
        assert: assert },
        Vex.Flow.Renderer.getSVGContext);
    });
}

Vex.Flow.Test.plotNoteWidth = Vex.Flow.Note.plotMetrics;

Vex.Flow.Test.plotLegendForNoteWidth = function(ctx, x, y) {
  ctx.save();
  ctx.setFont("Arial", 8, "");

  var spacing = 12;
  var lastY = y;

  function legend(color, text) {
    ctx.beginPath();
    ctx.setStrokeStyle(color)
    ctx.setFillStyle(color)
    ctx.setLineWidth(10);
    ctx.moveTo(x, lastY - 4);
    ctx.lineTo(x + 10, lastY - 4);
    ctx.stroke();

    ctx.setFillStyle("black");
    ctx.fillText(text, x + 15, lastY);
    lastY += spacing;
  }

  legend("green", "Note + Flag")
  legend("red", "Modifiers")
  legend("#999", "Displaced Head")
  legend("#DDD", "Formatter Shift")

  ctx.restore();
}