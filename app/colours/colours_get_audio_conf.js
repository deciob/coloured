(function(define) {
  return define(function(require) {
    var getAudioConf;
    return getAudioConf = function(e) {
      var conf;
      return conf = {
        sprite: this.conf[this.lang].spriteMap[e.selectorTarget.id.slice(4)],
        audio: this.audio[this.lang] || null
      };
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
