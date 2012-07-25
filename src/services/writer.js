define(["./persistence", "./receiver", "config"], function(persistence, receiver, config) {
  return function() {
    var intake = receiver(config.writer.port),
        persister = persistence();

    intake.start();

    intake.on("message", function(message) {
      persister.store(config.writer.bucketName, generateStatusUpdateKey(), message);
    });
  };

  function generateStatusUpdateKey() {
    return "update." + new Date().getTime();
  }

});
