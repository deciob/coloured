((define) ->

  define (require) ->

    getCurrentSprite = (e) ->
      @conf[@lang].spriteMap[e.selectorTarget.id[4..-1]] # removing "col_"
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)