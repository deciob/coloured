(function(define) {
  return define(["lodash"], function(_) {
    var AudioController;
    AudioController = function(args) {
      this.audio = args.audio;
      this.conf = args.conf;
      this.lang = null;
      this.currentAudio = null;
      return this;
    };
    AudioController.prototype = {
      onTimeUpdate: function(e, sprite) {
        if (e.currentTarget.currentTime > (sprite.start + sprite.length)) {
          return this.pause();
        }
      },
      resetAudio: function() {
        if (this.currentAudio) {
          this.currentAudio.removeEventListener('timeupdate', this.onTimeUpdateP, false);
          return this.currentAudio.pause();
        }
      },
      play: function(audioConf) {
        var audio, currentSprite;
        this.resetAudio();
        this.currentAudio = audio = audioConf.audio;
        currentSprite = audioConf.sprite;
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
