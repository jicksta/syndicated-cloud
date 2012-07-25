define(["./util/object", "events"], function(object, events) {

  return function() {
    return object(new events.EventEmitter);
  };

});
