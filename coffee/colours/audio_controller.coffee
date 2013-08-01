((define) ->

  define ["lodash"], (_) ->

    AudioController = (args) ->
      @audio = new Audio(args.audioFile)
      @spriteMap = args.spriteMap
      @

    AudioController:: =
      init: (a) ->
        console.log a

      onTimeUpdate: (evt, spr) ->
        if evt.currentTarget.currentTime > (spr.start + spr.length)
          @pause()

      play: (e) ->
        @audio.removeEventListener 'timeupdate', @onTimeUpdateP, false
        @audio.pause()

        currentSprite = @spriteMap[e.selectorTarget.className[4..-1]]
        @audio.currentTime = currentSprite.start
        @onTimeUpdateP = _.partialRight @onTimeUpdate, currentSprite
        
        @audio.addEventListener 'timeupdate', @onTimeUpdateP, false
        @audio.play()
        
    AudioController.plugins = [module: "wire/dom"]

    AudioController


)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
