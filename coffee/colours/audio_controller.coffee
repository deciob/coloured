((define) ->

  define ["lodash"], (_) ->

    AudioController = (audioFile) ->
      #console.log "AudioController constructor", audioFile
      @audio = new Audio(audioFile).play()

    AudioController:: =
      init: (a,b,c) ->
        console.log a,b,c

      log: (e) ->
        console.log e

      # Wire.js plugins
      plugins: [
        module: "wire/dom"
      ]
  
      isConstructor: true

    AudioController


)(if typeof define is "function" and define.amd then define else (ids, factory) ->
  deps = ids.map( (id) -> require(id) )
  module.exports = factory.apply(null, deps)
)
