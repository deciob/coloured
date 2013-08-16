((define) ->

  define ["lodash", "fast_button"], (_, FastButton) ->

    NavigationController = ->
      @

    NavigationController.prototype =

      initNavigation: ->
        @getCurrentNode().classList.remove('grey')
        #new FastButton(activeNode.parentNode, (e) => @navigate e)
        
      updateNavigation: (node, siblings) ->
        _.each siblings, (sibling) ->
          sibling.classList.add('grey')
        node.classList.remove('grey')

      navigate: (conf) ->
        @lang = @setCurrentLanguage conf.language
        @updateNavigation conf.node, conf.siblings
        #null

      setCurrentLanguage: (lang) ->
        lang or @defaultLanguage
        
    NavigationController.plugins = [module: "wire/dom"]

    NavigationController

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
