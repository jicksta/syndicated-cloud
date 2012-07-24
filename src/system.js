define("system", ["receiver", "./gui/gui"], function(Receiver, gui) {
  var self = {};

  self.start = function() {
    gui.listen();
    new Receiver().start();
  };

  return self;
});
