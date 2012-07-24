define("system", ["./gui/gui"], function(gui) {
  var self = {};

  self.start = function() {
    gui.listen();
  };

  return self;
});
