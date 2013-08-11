(function(define) {
  return define(function(require) {
    return {
      audioFile: "app/colours/audio/colours.ogg",
      spriteMap: {
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
      }
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
