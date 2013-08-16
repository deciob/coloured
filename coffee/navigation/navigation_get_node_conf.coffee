((define) ->

  define ["get_siblings"], (getSiblings) ->

    getNodeConfig = (e) ->
      node = @getCurrentNode e
      conf = 
        node: node
        siblings: getSiblings node
        language: node.id[4..-1]
      
)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)