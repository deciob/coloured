(function(define) {
  return define(function(require) {
    var audioConstructor;
    return audioConstructor = function(args) {
      var audioFile;
      audioFile = args.conf[args.language].audioFile;
      return new Audio(audioFile);
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
