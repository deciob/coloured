((define) ->

  define (require) ->

    getAudioConf = (e) ->
      conf = 
        sprite: @conf[@lang].spriteMap[e.selectorTarget.id[4..-1]]
        audio: @audio[@lang] or null
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)