(function(define) {
  return define(function(require) {
    /*
    From: http://code.this.com/mobile/articles/fast_buttons.html
    Also see: http://stackoverflow.com/questions/6300136/trying-to-implement-googles-fast-button
    */

    var FastButton, addListener, clickbuster, isTouch;
    clickbuster = function() {};
    clickbuster.preventGhostClick = function(x, y) {
      clickbuster.coordinates.push(x, y);
      return window.setTimeout(clickbuster.pop, 2500);
    };
    clickbuster.pop = function() {
      return clickbuster.coordinates.splice(0, 2);
    };
    clickbuster.onClick = function(event) {
      var i, x, y, _results;
      i = 0;
      _results = [];
      while (i < clickbuster.coordinates.length) {
        x = clickbuster.coordinates[i];
        y = clickbuster.coordinates[i + 1];
        if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
          if (event.stopPropagation) {
            event.stopPropagation();
          } else {
            event.cancelBubble = true;
          }
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }
        }
        _results.push(i += 2);
      }
      return _results;
    };
    if (isTouch) {
      document.addEventListener("click", clickbuster.onClick, true);
      clickbuster.coordinates = [];
    }
    /*
    For IE8 and earlier compatibility: https://developer.mozilla.org/en/DOM/element.addEventListener
    */

    addListener = function(el, type, listener, useCapture) {
      var handler;
      if (el.addEventListener) {
        el.addEventListener(type, listener, useCapture);
        return {
          destroy: function() {
            return el.removeEventListener(type, listener, useCapture);
          }
        };
      } else {
        handler = function(e) {
          return listener.handleEvent(window.event, listener);
        };
        el.attachEvent("on" + type, handler);
        return {
          destroy: function() {
            return el.detachEvent("on" + type, handler);
          }
        };
      }
    };
    isTouch = "ontouchstart" in window;
    FastButton = function(element, handler, useCapture) {
      this.events = [];
      this.touchEvents = [];
      this.element = element;
      this.handler = handler;
      this.useCapture = useCapture;
      if (isTouch) {
        this.events.push(addListener(element, "touchstart", this, this.useCapture));
      }
      return this.events.push(addListener(element, "click", this, this.useCapture));
    };
    FastButton.prototype.destroy = function() {
      var i;
      i = this.events.length - 1;
      while (i >= 0) {
        this.events[i].destroy();
        i -= 1;
      }
      return this.events = this.touchEvents = this.element = this.handler = this.fastButton = null;
    };
    FastButton.prototype.handleEvent = function(event) {
      switch (event.type) {
        case "touchstart":
          return this.onTouchStart(event);
        case "touchmove":
          return this.onTouchMove(event);
        case "touchend":
          return this.onClick(event);
        case "click":
          return this.onClick(event);
      }
    };
    FastButton.prototype.onTouchStart = function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      this.touchEvents.push(addListener(this.element, "touchend", this, this.useCapture));
      this.touchEvents.push(addListener(document.body, "touchmove", this, this.useCapture));
      this.startX = event.touches[0].clientX;
      return this.startY = event.touches[0].clientY;
    };
    FastButton.prototype.onTouchMove = function(event) {
      if (Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
        return this.reset();
      }
    };
    FastButton.prototype.onClick = function(event) {
      var result;
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      this.reset();
      result = this.handler.call(this.element, event);
      if (event.type === "touchend") {
        clickbuster.preventGhostClick(this.startX, this.startY);
      }
      return result;
    };
    FastButton.prototype.reset = function() {
      var i;
      i = this.touchEvents.length - 1;
      while (i >= 0) {
        this.touchEvents[i].destroy();
        i -= 1;
      }
      return this.touchEvents = [];
    };
    return FastButton;
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
