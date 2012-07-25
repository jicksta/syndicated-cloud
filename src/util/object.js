define(function() {
  return function(parent) {
    var F = new Function;
    F.prototype = parent;
    var instance = new F;

    // Extend all other arguments into the new instance for syntactically pleasant construction.
    for(var i = 1, len = arguments.length; i < len; i++) {
      if(arguments[i] != null) {
        for(var key in arguments[i]) {
          if(arguments[i].hasOwnProperty(key)) {
            instance[key] = arguments[i][key];
          }
        }
      }
    }

    instance._super = parent;

    if(instance.init) {
      instance.init();
    }

    return instance;
  }
});
