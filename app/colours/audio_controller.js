(function(define) {
  return define(["lodash"], function(_) {
    var AudioController;
    AudioController = function(audioFile) {
      return this.audio = new Audio(audioFile).play();
    };
    AudioController.prototype = {
      init: function(a, b, c) {
        return console.log(a, b, c);
      },
      log: function(e) {
        return console.log(e);
      },
      plugins: [
        {
          module: "wire/dom"
        }
      ],
      isConstructor: true
    };
    return AudioController;
  });
})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});
