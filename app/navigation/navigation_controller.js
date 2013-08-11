(function(define) {
  return define(["lodash"], function(_) {
    var NavigationController;
    NavigationController = function(args) {
      this.defaultLanguage = args.defaultLanguage;
      return this;
    };
    NavigationController.prototype = {
      updateNavigation: function(targetId) {
        var targetEl;
        targetEl = document.getElementById(targetId);
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
        this.setCurrentLanguage(e.selectorTarget.id.slice(4));
        return this.updateNavigation(e.selectorTarget.id);
      },
      setCurrentLanguage: function(lang) {
        this.lang = lang || this.defaultLanguage;
        document.getElementById("nav_" + this.lang).classList.remove('grey');
        return this.lang;
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
