((define) ->

  define (require) ->

    getAudioObject = (audio, lang) ->
      audio[lang] or null
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)