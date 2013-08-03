((define) ->
  define (require) ->
    buster = require("buster")
    coloursConfig = require('../../app/colours/colours_config')
    AudioController = require('../../app/utils/audio_controller')


    buster.testCase "utils/audioController",

      setUp: ->
        @args =
          audio:
            addEventListener: ->
              console.log "audio.addEventListener called"
            play: ->
              console.log "audio.play called"
          spriteMap: coloursConfig.spriteMap
        #@audioController = new AudioController(args)
      ,

      "audioController.resetAudio should be called on audioController.play": ->
        audioController = new AudioController(@args)
        console.log 'ccc', AudioController.prototype
        e = 
          selectorTarget:
            className: "box green"
        @stub(@audioController, "resetAudio")
        @audioController.play(e)
        assert.calledOnce(@audioController.resetAudio)

      #"audioController.getCurrentSprite should select the correct sprite": ->
      #  console.log 'KKK', @audioController
      #  orange = @audioController.getCurrentSprite "box orange"
      #  assert.match(orange, coloursConfig.spriteMap.orange)
        


) (if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)