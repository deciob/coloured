((define) ->

  define ["lodash"], (_) ->

    log: (e) ->
      console.log 'zzz', e
  
    # Wire.js plugins
    plugins: [
      module: "wire/dom"
    ]

)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
