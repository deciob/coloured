((define) ->

  define ["lodash"], (_) ->

    NavigationController = ->
      @

    NavigationController.prototype =

      updateNavigation: (e) ->
        targetId = e.selectorTarget.id
        targetEl = document.getElementById(targetId)
        currentCountry = e.selectorTarget.id[4..-1]
        _.each targetEl.parentNode.childNodes, (el) ->
          if el.nodeName == "DIV" and el.id == targetId
            el.classList.remove('grey')
          if el.nodeName == "DIV" and el.id != targetId
            el.classList.add('grey')

      navigate: (e) -> 
        @updateNavigation e
        
    NavigationController.plugins = [module: "wire/dom"]

    NavigationController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
