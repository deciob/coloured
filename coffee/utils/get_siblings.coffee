((define) ->

  define (require) ->

    getSiblings = (currentNode) ->
      result = []
      node = currentNode.parentNode.firstChild
      while node
        if node.nodeType is 1 and node isnt currentNode
          result.push node
        node = node.nextElementSibling or node.nextSibling
      result
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)