(function(define) {
  return define(function(require) {
    var AudioController, buster, coloursConfig;
    buster = require("buster");
    coloursConfig = require('../../app/colours/colours_config');
    AudioController = require('../../app/utils/audio_controller');
    return buster.testCase("utils/audioController", {
      setUp: function() {
        return this.args = {
          audio: {
            addEventListener: function() {
              return console.log("audio.addEventListener called");
            },
            play: function() {
              return console.log("audio.play called");
            }
          },
          spriteMap: coloursConfig.spriteMap
        };
      },
      "audioController.resetAudio should be called on audioController.play": function() {
        var audioController, e;
        audioController = new AudioController(this.args);
        console.log('ccc', AudioController.prototype);
        e = {
          selectorTarget: {
            className: "box green"
          }
        };
        this.stub(this.audioController, "resetAudio");
        this.audioController.play(e);
        return assert.calledOnce(this.audioController.resetAudio);
      }
    });
  });
})((typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
}));
