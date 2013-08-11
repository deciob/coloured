((define) ->

  define (require) ->

    audioConstructor = (args) ->
      new Audio(args.audioFile)
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)
