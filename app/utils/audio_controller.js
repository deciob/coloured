(function(define) {
  return define(["lodash"], function(_) {
    var AudioController;
    AudioController = function(args) {
      this.defaultLanguage = args.defaultLanguage;
      this.audio = args.audio;
      this.conf = args.conf;
      return this;
    };
    AudioController.prototype = {
      onTimeUpdate: function(evt, spr) {
        if (evt.currentTarget.currentTime > (spr.start + spr.length)) {
          return this.pause();
        }
      },
      resetAudio: function() {
        var lang;
        lang = this.getCurrentLanguage();
        this.audio[lang].removeEventListener('timeupdate', this.onTimeUpdateP, false);
        return this.audio[lang].pause();
      },
      play: function(e) {
        var currentSprite, lang;
        lang = this.getCurrentLanguage();
        this.resetAudio();
        currentSprite = this.conf[lang].spriteMap[e.selectorTarget.className.slice(4)];
        this.audio[lang].currentTime = currentSprite.start;
        this.onTimeUpdateP = _.partialRight(this.onTimeUpdate, currentSprite);
        this.audio[lang].addEventListener('timeupdate', this.onTimeUpdateP, false);
        return this.audio[lang].play();
      },
      setCurrentLanguage: function(lang) {
        return this.lang = lang || this.defaultLanguage;
      },
      getCurrentLanguage: function() {
        var lang;
        return lang = this.lang || this.defaultLanguage;
      }
    };
    AudioController.plugins = [
      {
        module: "wire/dom"
      }
    ];
    return AudioController;
  });
})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});
