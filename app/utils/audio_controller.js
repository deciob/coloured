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
        var audio;
        audio = this.getAudioObject(this.audio, this.lang);
        if (audio) {
          audio.removeEventListener('timeupdate', this.onTimeUpdateP, false);
          return audio.pause();
        }
      },
      play: function(e) {
        var args, audio, currentSprite;
        this.resetAudio();
        args = {
          e: e,
          conf: this.conf,
          lang: this.lang
        };
        currentSprite = this.getCurrentSprite(args);
        audio = this.getAudioObject(this.audio, this.lang);
        audio.currentTime = currentSprite.start;
        this.onTimeUpdateP = _.partialRight(this.onTimeUpdate, currentSprite);
        audio.addEventListener('timeupdate', this.onTimeUpdateP, false);
        return audio.play();
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
