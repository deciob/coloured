((define) ->

  define ["lodash"], (_) ->

    AudioController = (args) ->
      @audio = new Audio(args.audioFile)
      @spriteMap = args.spriteMap
      @

    AudioController.prototype =
      init: (a) ->
        console.log a

      onTimeUpdate: (evt, spr) ->
        if evt.currentTarget.currentTime > (spr.start + spr.length)
          @pause()

      resetAudio: ->
        @audio.removeEventListener 'timeupdate', @onTimeUpdateP, false
        @audio.pause()

      play: (e) ->
        @resetAudio()
        currentSprite = @spriteMap[e.selectorTarget.className[4..-1]]
        @audio.currentTime = currentSprite.start
        # Passing the current sprite reference to the `timeupdate`
        # callback by using a partial application.
        @onTimeUpdateP = _.partialRight @onTimeUpdate, currentSprite
        @audio.addEventListener 'timeupdate', @onTimeUpdateP, false
        @audio.play()
        
    AudioController.plugins = [module: "wire/dom"]

    AudioController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
