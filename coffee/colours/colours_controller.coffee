define ["lodash"], (_) ->

  spriteData:
    red:
        start: 0.6
        length: 1.1
    orange:
        start: 2.3
        length: 1.1
    green:
        start: 4.1
        length: 1.1
    purple:
        start: 6.1
        length: 1.1
    blue:
        start: 8.3
        length: 1.1
    yellow:
        start: 10.3
        length: 1.2

  onTimeUpdate: (evt, spr, self) ->
    if evt.currentTarget.currentTime > (spr.start + spr.length)
      self.audioSprite.removeEventListener('timeupdate', 
        self.onTimeUpdatePartial, false)
      @pause()

  play: (e) ->
    @currentSprite = @spriteData[e.selectorTarget.className[4..-1]]
    @audioSprite.currentTime = @currentSprite.start
    @onTimeUpdatePartial = _.partialRight @onTimeUpdate, @currentSprite, @
    @audioSprite.addEventListener 'timeupdate', @onTimeUpdatePartial, false
    @audioSprite.play()

  # Wire.js plugins
  plugins: [
    module: "wire/dom"
  ]
