((define) ->

  define (require) ->

    getCurrentNode = (e) ->
      if e
        return e.target
      document.getElementById("nav_#{@defaultLanguage}")
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)