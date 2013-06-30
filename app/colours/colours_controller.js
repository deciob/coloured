define(function() {
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
