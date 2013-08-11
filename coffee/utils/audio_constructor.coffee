((define) ->

  define (require) ->

    audioConstructor = (args) ->
      audioFile = args.conf[args.language].audioFile
      new Audio(audioFile)
      
)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)
