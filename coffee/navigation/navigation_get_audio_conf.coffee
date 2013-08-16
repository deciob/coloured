((define) ->

  define (require) ->

    getAudioConf = (e) ->
      conf = 
        sprite: @conf.all.spriteMap[e.target.id[4..-1]]
        audio: @audio
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)