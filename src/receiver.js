define(['service', 'net', 'config'], function(Service, net, config) {

  function Receiver() {}

  Receiver.protoype = new Service;

  Receiver.prototype.start = function() {
    var self = this;
    this.server = net.createServer(function(socket) {
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
        console.log("ERROR IN RECEIVER", arguments)
      });

    });

    this.server.listen(config.ports.receiver);
  };

  Receiver.prototype.handle = function(data) {
    var message = parseJSON(data);
    if(message) {
      this.messageReceived(message);
    }
  };

  Receiver.prototype.messageReceived = function(message) {
    var prettyJSON = JSON.stringify(message, null, 2);
    console.log(prettyJSON);
  };

  return Receiver;

  function parseJSON(data) {
    try {
      return JSON.parse(data);
    } catch(e) {
      return null;
    }
  }

});
