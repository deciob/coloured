(function(define) {
  return define(["lodash", "hammer"], function(_, Hammer) {
    var NavigationController;
    NavigationController = function(args) {
      this.defaultLanguage = args.defaultLanguage;
      return this;
    };
    NavigationController.prototype = {
      initNavigation: function(lang) {
        var activeNode, self;
        self = this;
        activeNode = document.getElementById("nav_" + lang);
        activeNode.classList.remove('grey');
        return Hammer(activeNode.parentNode).on("tap", function(e) {
          return self.navigate(e);
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
        id = e.target.parentNode.id;
        this.setCurrentLanguage(id.slice(4));
        return this.updateNavigation(e.target.parentNode, id);
      },
      setCurrentLanguage: function(lang) {
        return this.lang = lang || this.defaultLanguage;
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
