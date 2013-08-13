((define) ->

  define ["lodash", "hammer"], (_, Hammer) ->

    NavigationController = (args) ->
      @defaultLanguage = args.defaultLanguage
      @

    NavigationController.prototype =

      initNavigation: (lang) ->
        self = @
        activeNode = document.getElementById("nav_#{lang}")
        activeNode.classList.remove('grey')
        #btns = activeNode.parentNode.getElementsByTagName('button')
        Hammer(activeNode.parentNode).on("tap", (e) -> self.navigate e) 
        
      updateNavigation: (target, targetId) ->
        _.each target.parentNode.childNodes, (el) ->
          if el.nodeName == "BUTTON" and el.id == targetId
            el.classList.remove('grey')
          if el.nodeName == "BUTTON" and el.id != targetId
            el.classList.add('grey')

      navigate: (e) ->
        id = e.target.parentNode.id
        @setCurrentLanguage id[4..-1]
        @updateNavigation e.target.parentNode, id

      # Initially called on wire ready.
      setCurrentLanguage: (lang) ->
        @lang = lang or @defaultLanguage
        
    NavigationController.plugins = [module: "wire/dom"]

    NavigationController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
