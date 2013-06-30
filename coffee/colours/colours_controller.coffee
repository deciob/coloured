define ->

  spriteData:
    red:
        start: 0.2
        length: 1.1
    orange:
        start: 1.6
        length: 1.1
    green:
        start: 3.2
        length: 1.1
    purple:
        start: 4.5
        length: 1.1
    blue:
        start: 5.8
        length: 1.1
    yellow:
        start: 7.2
        length: 1.1

  #querySelector: 
  #  $ref: 'first!'

  init: ->
    self = @
    # time update handler to ensure we stop when a sprite is complete
    onTimeUpdate = ->
      #console.log @currentTime, self.currentSprite
      if self.currentSprite and @currentTime >= self.currentSprite.start + self.currentSprite.length
        @pause()
    #console.log '@@@@@@@@', self.audioSprite
    @audioSprite.addEventListener 'timeupdate', onTimeUpdate, false

  update: (e) ->
    #@node.innerHTML = e.target.value
    colour = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    e.target.style.background = colour

  play: (e) ->
    #audio = e.selectorTarget.firstElementChild
    #audio.play()
    @currentSprite = @spriteData[e.selectorTarget.className[4..-1]]
    @audioSprite.currentTime = @currentSprite.start
    @audioSprite.play()

  # Wire.js plugins
  plugins: [
    module: "wire/dom"
  ]
