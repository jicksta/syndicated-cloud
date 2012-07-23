var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname
});

requirejs(['system'], function(system) {
    system.start();
});
