(function(define) {
  return define(function(require) {
    return {
      english: {
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
      },
      italian: {
        audioFile: "app/colours/audio/colori-it.ogg",
        spriteMap: {
          red: {
            start: 0.7,
            length: 1.1
          },
          orange: {
            start: 2.3,
            length: 1.4
          },
          green: {
            start: 4.1,
            length: 1.1
          },
          purple: {
            start: 5.5,
            length: 1
          },
          blue: {
            start: 7,
            length: 0.6
          },
          yellow: {
            start: 8.3,
            length: 1
          }
        }
      },
      spanish: {
        audioFile: "app/colours/audio/colores-es-long.ogg",
        spriteMap: {
          red: {
            start: 0.4,
            length: 1.4
          },
          orange: {
            start: 2.1,
            length: 1.6
          },
          green: {
            start: 4.1,
            length: 1.6
          },
          purple: {
            start: 6,
            length: 1.6
          },
          blue: {
            start: 7.9,
            length: 1.6
          },
          yellow: {
            start: 9.9,
            length: 1.4
          }
        }
      }
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
