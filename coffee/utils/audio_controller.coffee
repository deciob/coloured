((define) ->

  define ["lodash"], (_) ->

    AudioController = (args) ->
      @defaultLanguage = args.defaultLanguage
      @audio = args.audio
      @conf = args.conf
      @

    AudioController.prototype =

      onTimeUpdate: (evt, spr) ->
        if evt.currentTarget.currentTime > (spr.start + spr.length)
          @pause()

      resetAudio: ->
        lang = @getCurrentLanguage()
        @audio[lang].removeEventListener 'timeupdate', @onTimeUpdateP, false
        @audio[lang].pause()

      play: (e) ->
        lang = @getCurrentLanguage()
        @resetAudio()
        currentSprite = @conf[lang]
          .spriteMap[e.selectorTarget.className[4..-1]] # removing "box "
        @audio[lang].currentTime = currentSprite.start
        # Passing the current sprite reference to the `timeupdate`
        # callback by using a partial application.
        @onTimeUpdateP = _.partialRight @onTimeUpdate, currentSprite
        @audio[lang].addEventListener 'timeupdate', @onTimeUpdateP, false
        @audio[lang].play()

      # Initially called on wire init.
      setCurrentLanguage: (lang) ->
        @lang = lang or @defaultLanguage

      getCurrentLanguage: ->
        lang = @lang or @defaultLanguage
        
    AudioController.plugins = [module: "wire/dom"]

    AudioController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
