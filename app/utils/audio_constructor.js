(function(define) {
  return define(function(require) {
    var audioConstructor;
    return audioConstructor = function(args) {
      return new Audio(args.audioFile);
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
