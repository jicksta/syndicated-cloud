define(['../util/object', '../service', 'riak-js', 'q'], function(object, service, riak, Q) {

  var persistence = object(service, {
    store: function(bucket, key, data) {
      var deferred = Q.defer();
      riak.getClient().save(bucket, key, data, function(err, success, somethingElse) {
        if(err) deferred.reject(err);
        else deferred.resolve(success, somethingElse);
      });
      deferred.promise.then(function() {
        console.log("Saved '" + key + "' to bucket '" + bucket + "' with data: " + data);
      });
      return deferred.promise;
    }
  });

  return function() {
    return object(persistence);
  }
});
