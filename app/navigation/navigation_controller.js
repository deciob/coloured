(function(define) {
  return define(["lodash", "fast_button"], function(_, FastButton) {
    var NavigationController;
    NavigationController = function() {
      return this;
    };
    NavigationController.prototype = {
      initNavigation: function() {
        var activeNode, str,
          _this = this;
        this.lang = this.setCurrentLanguage(this.defaultLanguage);
        str = 'button[id=' + ("nav_" + this.lang) + ']';
        activeNode = this.el.querySelector(str);
        activeNode.classList.remove('grey');
        return new FastButton(activeNode.parentNode, function(e) {
          return _this.navigate(e);
        });
      },
      updateNavigation: function(target, targetId) {
        return _.each(target.parentNode.childNodes, function(el) {
          if (el.nodeName === "BUTTON" && el.id === targetId) {
            el.classList.remove('grey');
          }
          if (el.nodeName === "BUTTON" && el.id !== targetId) {
            return el.classList.add('grey');
          }
        });
      },
      navigate: function(e) {
        var id;
        id = e.target.parentNode.id || e.target.id;
        this.lang = this.setCurrentLanguage(id.slice(4));
        this.updateNavigation(e.target, id);
        return null;
      },
      setCurrentLanguage: function(lang) {
        return lang || this.defaultLanguage;
      },
      setNavigationAudio: function(lang) {
        console.log("setNavigationAudio", lang);
        return {
          root: "all",
          spriteMap: lang
        };
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
