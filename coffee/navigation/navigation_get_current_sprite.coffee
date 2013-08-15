((define) ->

  define (require) ->

    getCurrentSprite = (args) ->
      lang = args.lang
      conf = args.conf
      conf.all.spriteMap[lang]

      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)