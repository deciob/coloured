(function(define) {
  return define(function(require) {
    var getAudioConf;
    return getAudioConf = function(e) {
      var conf;
      return conf = {
        sprite: this.conf.all.spriteMap[e.target.id.slice(4)],
        audio: this.audio
      };
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
