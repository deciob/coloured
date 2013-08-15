(function(define) {
  return define(function(require) {
    var getCurrentSprite;
    return getCurrentSprite = function(args) {
      var conf, lang;
      lang = args.lang;
      conf = args.conf;
      return conf.all.spriteMap[lang];
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
})({
  resetAudio: function() {
    console.log("resetAudio", this.lang);
    if (this.lang) {
      this.audio[this.lang].removeEventListener('timeupdate', this.onTimeUpdateP, false);
      return this.audio[this.lang].pause();
    }
  }
});
