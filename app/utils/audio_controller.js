(function(define) {
  return define(["lodash"], function(_) {
    var AudioController;
    AudioController = function(args) {
      this.audio = args.audio;
      this.conf = args.conf;
      this.lang = null;
      return this;
    };
    AudioController.prototype = {
      onTimeUpdate: function(e, sprite) {
        if (e.currentTarget.currentTime > (sprite.start + sprite.length)) {
          return this.pause();
        }
      },
      resetAudio: function() {
        if (this.lang) {
          this.audio[this.lang].removeEventListener('timeupdate', this.onTimeUpdateP, false);
          return this.audio[this.lang].pause();
        }
      },
      play: function(e) {
        var currentSprite;
        this.resetAudio();
        currentSprite = this.conf[this.lang].spriteMap[e.selectorTarget.className.slice(4)];
        this.audio[this.lang].currentTime = currentSprite.start;
        this.onTimeUpdateP = _.partialRight(this.onTimeUpdate, currentSprite);
        this.audio[this.lang].addEventListener('timeupdate', this.onTimeUpdateP, false);
        return this.audio[this.lang].play();
      },
      setCurrentLanguage: function(lang) {
        return this.lang = lang;
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
