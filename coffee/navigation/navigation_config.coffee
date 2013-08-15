((define) ->

  define (require) ->
    all:
      audioFile: "app/navigation/audio/navigation.ogg"
      spriteMap:
        english:
          start: 0.2
          length: 1.2
        spanish:
          start: 1.9
          length: 1.4
        italian:
          start: 3.9
          length: 1.4
        
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)