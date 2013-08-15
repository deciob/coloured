((define) ->

  define ["lodash"], (_) ->

    AudioController = (args) ->
      @audio = args.audio
      @conf = args.conf
      # The AudioController is unaware of its language until it gets this 
      # information from the NavigationController.
      @lang = null
      @

    AudioController.prototype =

      onTimeUpdate: (e, sprite) ->
        if e.currentTarget.currentTime > (sprite.start + sprite.length)
          @pause()

      # It is called before playing new audio or before changing language.
      resetAudio: ->
        if @lang
          @audio[@lang].removeEventListener 'timeupdate', @onTimeUpdateP, false
          @audio[@lang].pause()

      play: (e) ->
        @resetAudio()
        currentSprite = @conf[@lang]
          .spriteMap[e.selectorTarget.className[4..-1]] # removing "box "
        @audio[@lang].currentTime = currentSprite.start
        # Passing the current sprite reference to the `timeupdate`
        # callback by using a partial application.
        @onTimeUpdateP = _.partialRight @onTimeUpdate, currentSprite
        @audio[@lang].addEventListener 'timeupdate', @onTimeUpdateP, false
        @audio[@lang].play()

      setCurrentLanguage: (lang) ->
        @lang = lang
        
    AudioController.plugins = [module: "wire/dom"]

    AudioController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
