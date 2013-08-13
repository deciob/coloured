((define) ->

  define (require) ->
  
    ###
    From: http://code.this.com/mobile/articles/fast_buttons.html
    Also see: http://stackoverflow.com/questions/6300136/trying-to-implement-googles-fast-button
    ###

    clickbuster = ->
  
    # Call preventGhostClick to bust all click events that happen within 25px of
    #   the provided x, y coordinates in the next 2.5s. 
    clickbuster.preventGhostClick = (x, y) ->
      clickbuster.coordinates.push x, y
      window.setTimeout clickbuster.pop, 2500
  
    clickbuster.pop = ->
      clickbuster.coordinates.splice 0, 2
  
    
    # If we catch a click event inside the given radius and time threshold then we call
    #   stopPropagation and preventDefault. Calling preventDefault will stop links
    #   from being activated. 
    clickbuster.onClick = (event) ->
      i = 0
  
      while i < clickbuster.coordinates.length
        x = clickbuster.coordinates[i]
        y = clickbuster.coordinates[i + 1]
        if Math.abs(event.clientX - x) < 25 and Math.abs(event.clientY - y) < 25
          (if event.stopPropagation then event.stopPropagation() else (event.cancelBubble = true))
          (if event.preventDefault then event.preventDefault() else (event.returnValue = false))
        i += 2
  
    if isTouch
      
      # Don't need to use our custom addListener function since we only bust clicks on touch devices
      document.addEventListener "click", clickbuster.onClick, true
      clickbuster.coordinates = []
    
    ###
    For IE8 and earlier compatibility: https://developer.mozilla.org/en/DOM/element.addEventListener
    ###
    addListener = (el, type, listener, useCapture) ->
      if el.addEventListener
        el.addEventListener type, listener, useCapture
        destroy: ->
          el.removeEventListener type, listener, useCapture
      else
        
        # see: http://stackoverflow.com/questions/5198845/javascript-this-losing-context-in-ie
        handler = (e) ->
          listener.handleEvent window.event, listener
  
        el.attachEvent "on" + type, handler
        destroy: ->
          el.detachEvent "on" + type, handler
    isTouch = "ontouchstart" of window
    
    # Construct the FastButton with a reference to the element and click handler. 
    FastButton = (element, handler, useCapture) ->
      
      # collect functions to call to cleanup events 
      @events = []
      @touchEvents = []
      @element = element
      @handler = handler
      @useCapture = useCapture
      @events.push addListener(element, "touchstart", this, @useCapture)  if isTouch
      @events.push addListener(element, "click", this, @useCapture)
  
    
    # Remove event handling when no longer needed for this button 
    FastButton::destroy = ->
      i = @events.length - 1
      while i >= 0
        @events[i].destroy()
        i -= 1
      @events = @touchEvents = @element = @handler = @fastButton = null
  
    
    # acts as an event dispatcher 
    FastButton::handleEvent = (event) ->
      switch event.type
        when "touchstart"
          @onTouchStart event
        when "touchmove"
          @onTouchMove event
        when "touchend"
          @onClick event
        when "click"
          @onClick event
  
    
    # Save a reference to the touchstart coordinate and start listening to touchmove and
    #   touchend events. Calling stopPropagation guarantees that other behaviors don’t get a
    #   chance to handle the same click event. This is executed at the beginning of touch. 
    FastButton::onTouchStart = (event) ->
      (if event.stopPropagation then event.stopPropagation() else (event.cancelBubble = true))
      @touchEvents.push addListener(@element, "touchend", this, @useCapture)
      @touchEvents.push addListener(document.body, "touchmove", this, @useCapture)
      @startX = event.touches[0].clientX
      @startY = event.touches[0].clientY
  
    
    # When /if touchmove event is invoked, check if the user has dragged past the threshold of 10px. 
    FastButton::onTouchMove = (event) ->
      @reset()  if Math.abs(event.touches[0].clientX - @startX) > 10 or Math.abs(event.touches[0].clientY - @startY) > 10 #if he did, then cancel the touch event
  
    
    # Invoke the actual click handler and prevent ghost clicks if this was a touchend event. 
    FastButton::onClick = (event) ->
      (if event.stopPropagation then event.stopPropagation() else (event.cancelBubble = true))
      @reset()
      
      # Use .call to call the method so that we have the correct "this": https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call
      result = @handler.call(@element, event)
      clickbuster.preventGhostClick @startX, @startY  if event.type is "touchend"
      result
  
    FastButton::reset = ->
      i = @touchEvents.length - 1
      while i >= 0
        @touchEvents[i].destroy()
        i -= 1
      @touchEvents = []
  

    FastButton

)(if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)