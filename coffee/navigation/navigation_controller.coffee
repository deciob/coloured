((define) ->

  define ["lodash"], (_) ->

    NavigationController = (args) ->
      @defaultLanguage = args.defaultLanguage
      @

    NavigationController.prototype =

      updateNavigation: (targetId) ->
        targetEl = document.getElementById(targetId)
        _.each targetEl.parentNode.childNodes, (el) ->
          if el.nodeName == "DIV" and el.id == targetId
            el.classList.remove('grey')
          if el.nodeName == "DIV" and el.id != targetId
            el.classList.add('grey')

      navigate: (e) ->
        @setCurrentLanguage e.selectorTarget.id[4..-1]
        @updateNavigation e.selectorTarget.id

      # Initially called on wire ready.
      setCurrentLanguage: (lang) ->
        @lang = lang or @defaultLanguage
        document.getElementById("nav_#{@lang}").classList.remove('grey')
        @lang
        
    NavigationController.plugins = [module: "wire/dom"]

    NavigationController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
