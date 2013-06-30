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
        start: 3.8,
        length: 1.6
      },
      blue: {
        start: 5.1,
        length: 1.3
      },
      yellow: {
        start: 6.1,
        length: 1.3
      }
    },
    init: function() {
      var onTimeUpdate, self;
      self = this;
      onTimeUpdate = function() {
        return console.log(this.currentTime);
      };
      return this.audioSprite.addEventListener('timeupdate', onTimeUpdate, false);
    },
    update: function(e) {
      var colour;
      colour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
      return e.target.style.background = colour;
    },
    play: function(e) {
      var audio;
      audio = e.selectorTarget.firstElementChild;
      return audio.play();
    },
    plugins: [
      {
        module: "wire/dom"
      }
    ]
  };
});
