define(["./util/object", "./services/writer", "./gui/gui"], function(object, writer, gui) {
  return object({
    start: function() {
      gui.listen();
      writer();
    }
  });
});
