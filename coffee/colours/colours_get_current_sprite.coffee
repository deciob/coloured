((define) ->

  define (require) ->

    getCurrentSprite = (args) ->
      e = args.e
      lang = args.lang
      conf = args.conf
      conf[lang].spriteMap[e.selectorTarget.id[4..-1]] # removing "col_"
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)