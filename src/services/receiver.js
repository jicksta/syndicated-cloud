define(['../util/object', '../service', 'net'], function(object, service, net) {

  function receiver(port) {
    return object(service(), base, {port: port});
  }

  var base = {
    init: function() {
      this.on("message", function(message) {
        var prettyJSON = JSON.stringify(message, null, 2);
        console.log(prettyJSON);
      });
    },

    start: function() {
      var self = this;
      self.server = net.createServer(function(socket) {
        var buffer;
        socket.on("data", function(data) {
          if(buffer) {
            buffer += data;
          } else {
            buffer = data;
          }
        });
        socket.on('end', function() {
          self.handle(buffer);
        });
        socket.on('error', function() {
          console.error("ERROR IN RECEIVER", arguments);
        });
      });

      self.server.listen(self.port);
    },

    handle: function(data) {
      var message = parseJSON(data);
      if(message) {
        this.emit("message", message);
      }
    }
  };

  return receiver;

  function parseJSON(data) {
    try {
      return JSON.parse(data);
    } catch(e) {
      return null;
    }
  }

});
