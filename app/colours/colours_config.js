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
        audioFile: "app/colours/audio/colores-es.ogg",
        spriteMap: {
          red: {
            start: 0.6,
            length: 0.9
          },
          orange: {
            start: 1.9,
            length: 1.3
          },
          green: {
            start: 3.5,
            length: 1.1
          },
          purple: {
            start: 4.9,
            length: 1.1
          },
          blue: {
            start: 6.5,
            length: 0.6
          },
          yellow: {
            start: 7.6,
            length: 0.9
          }
        }
      }
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
