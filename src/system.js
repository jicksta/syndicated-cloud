define("system", ["gui"], function(gui) {
  var self = {};
  self.start = function() {
    gui.start(1337);
  };

  return self;
});
