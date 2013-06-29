define(function() {
  return {
    update: function(e) {
      var colour;
      colour = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
      return e.target.style.background = colour;
    },
    play: function(e) {
      var audio;
      audio = e.selectorTarget.firstElementChild;
      audio.load();
      return audio.play();
    }
  };
});
