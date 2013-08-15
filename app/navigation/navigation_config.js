(function(define) {
  return define(function(require) {
    return {
      all: {
        audioFile: "app/navigation/audio/navigation.ogg",
        spriteMap: {
          english: {
            start: 0.2,
            length: 1.2
          },
          spanish: {
            start: 1.9,
            length: 1.4
          },
          italian: {
            start: 3.9,
            length: 1.4
          }
        }
      }
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
