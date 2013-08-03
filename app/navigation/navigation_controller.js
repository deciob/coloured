(function(define) {
  return define(["lodash"], function(_) {
    var NavigationController;
    NavigationController = function() {
      return this;
    };
    NavigationController.prototype = {
      updateNavigation: function(e) {
        var currentCountry, targetEl, targetId;
        targetId = e.selectorTarget.id;
        targetEl = document.getElementById(targetId);
        currentCountry = e.selectorTarget.id.slice(4);
        return _.each(targetEl.parentNode.childNodes, function(el) {
          if (el.nodeName === "DIV" && el.id === targetId) {
            el.classList.remove('grey');
          }
          if (el.nodeName === "DIV" && el.id !== targetId) {
            return el.classList.add('grey');
          }
        });
      },
      navigate: function(e) {
        return this.updateNavigation(e);
      }
    };
    NavigationController.plugins = [
      {
        module: "wire/dom"
      }
    ];
    return NavigationController;
  });
})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});
