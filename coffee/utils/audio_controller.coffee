((define) ->

  define ["lodash"], (_) ->

    AudioController = (args) ->
      @audio = args.audio
      @conf = args.conf
      # The AudioController is unaware of its language until it gets this 
      # information from the NavigationController.
      @lang = null
      @currentAudio = null
      @

    AudioController.prototype =

      onTimeUpdate: (e, sprite) ->
        if e.currentTarget.currentTime > (sprite.start + sprite.length)
          @pause()

      # It is called before playing new audio or before changing language.
      resetAudio: ->
        if @currentAudio
          @currentAudio.removeEventListener 'timeupdate', @onTimeUpdateP, false
          @currentAudio.pause()

      play: (audioConf) ->
        @resetAudio()
        @currentAudio = audio = audioConf.audio
        currentSprite = audioConf.sprite
        audio.currentTime = currentSprite.start
        ## Passing the current sprite reference to the `timeupdate`
        ## callback by using a partial application.
        @onTimeUpdateP = _.partialRight @onTimeUpdate, currentSprite
        audio.addEventListener 'timeupdate', @onTimeUpdateP, false
        audio.play()

      setCurrentLanguage: (lang) ->
        @lang = lang
        
    AudioController.plugins = [module: "wire/dom"]

    AudioController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
