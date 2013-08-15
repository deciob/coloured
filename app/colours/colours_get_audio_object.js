(function(define) {
  return define(function(require) {
    var getAudioObject;
    return getAudioObject = function(audio, lang) {
      return audio[lang] || null;
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
