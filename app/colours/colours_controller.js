(function(define) {
  return define(["lodash"], function(_) {
    return {
      spriteData: {
        red: {
          start: 0.6,
          length: 1.1
        },
        orange: {
          start: 2.3,
          length: 1.1
        },
        green: {
          start: 4.1,
          length: 1.1
        },
        purple: {
          start: 6.1,
          length: 1.1
        },
        blue: {
          start: 8.3,
          length: 1.1
        },
        yellow: {
          start: 10.3,
          length: 1.2
        }
      },
      onTimeUpdate: function(evt, spr, self) {
        if (evt.currentTarget.currentTime > (spr.start + spr.length)) {
          self.audioSprite.removeEventListener('timeupdate', self.onTimeUpdatePartial, false);
          return this.pause();
        }
      },
      play: function(e) {
        this.currentSprite = this.spriteData[e.selectorTarget.className.slice(4)];
        this.audioSprite.currentTime = this.currentSprite.start;
        this.onTimeUpdatePartial = _.partialRight(this.onTimeUpdate, this.currentSprite, this);
        this.audioSprite.addEventListener('timeupdate', this.onTimeUpdatePartial, false);
        return this.audioSprite.play();
      },
      plugins: [
        {
          module: "wire/dom"
        }
      ]
    };
  });
})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});
