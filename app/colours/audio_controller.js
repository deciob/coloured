(function(define) {
  return define(["lodash"], function(_) {
    var AudioController;
    AudioController = function(args) {
      this.audio = args.audio;
      this.spriteMap = args.spriteMap;
      return this;
    };
    AudioController.prototype = {
      onTimeUpdate: function(evt, spr) {
        if (evt.currentTarget.currentTime > (spr.start + spr.length)) {
          return this.pause();
        }
      },
      resetAudio: function() {
        this.audio.removeEventListener('timeupdate', this.onTimeUpdateP, false);
        return this.audio.pause();
      },
      getCurrentSprite: function(className) {
        return this.spriteMap[className.slice(4)];
      },
      play: function(e) {
        var currentSprite;
        this.resetAudio();
        currentSprite = this.getCurrentSprite(e.selectorTarget.className);
        this.audio.currentTime = currentSprite.start;
        this.onTimeUpdateP = _.partialRight(this.onTimeUpdate, currentSprite);
        this.audio.addEventListener('timeupdate', this.onTimeUpdateP, false);
        return this.audio.play();
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
