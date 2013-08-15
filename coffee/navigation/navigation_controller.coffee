((define) ->

  define ["lodash", "fast_button"], (_, FastButton) ->

    NavigationController = ->
      @

    NavigationController.prototype =

      initNavigation: ->
        @lang = @setCurrentLanguage @defaultLanguage
        str = 'button[id=' + "nav_#{@lang}" + ']'
        activeNode = @el.querySelector(str)
        activeNode.classList.remove('grey')
        new FastButton(activeNode.parentNode, (e) => @navigate e)
        
      updateNavigation: (target, targetId) ->
        _.each target.parentNode.childNodes, (el) ->
          if el.nodeName == "BUTTON" and el.id == targetId
            el.classList.remove('grey')
          if el.nodeName == "BUTTON" and el.id != targetId
            el.classList.add('grey')

      navigate: (e) ->
        id = e.target.parentNode.id
        @lang = @setCurrentLanguage id[4..-1]
        @updateNavigation e.target.parentNode, id

      setCurrentLanguage: (lang) ->
        lang or @defaultLanguage
        
    NavigationController.plugins = [module: "wire/dom"]

    NavigationController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
