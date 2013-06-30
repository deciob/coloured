define(function() {
  return {
    spriteData: {
      red: {
        start: 0.2,
        length: 1
      },
      orange: {
        start: 1.6,
        length: 1
      },
      green: {
        start: 2.8,
        length: 1
      },
      purple: {
        start: 4,
        length: 1.5
      },
      blue: {
        start: 5.3,
        length: 1.1
      },
      yellow: {
        start: 6.5,
        length: 1
      }
    },
    init: function() {
      var onTimeUpdate, self;
      self = this;
      onTimeUpdate = function() {
        if (self.currentSprite && this.currentTime >= self.currentSprite.start + self.currentSprite.length) {
          return this.pause();
        }
      };
      return this.audioSprite.addEventListener('timeupdate', onTimeUpdate, false);
    },
    update: function(e) {
      var colour;
      colour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
      return e.target.style.background = colour;
    },
    play: function(e) {
      this.currentSprite = this.spriteData[e.selectorTarget.className.slice(4)];
      this.audioSprite.currentTime = this.currentSprite.start;
      return this.audioSprite.play();
    },
    plugins: [
      {
        module: "wire/dom"
      }
    ]
  };
});
