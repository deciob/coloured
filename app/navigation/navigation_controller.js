(function(define) {
  return define(["lodash", "fast_button"], function(_, FastButton) {
    var NavigationController;
    NavigationController = function() {
      return this;
    };
    NavigationController.prototype = {
      initNavigation: function() {
        return this.getCurrentNode().classList.remove('grey');
      },
      updateNavigation: function(node, siblings) {
        _.each(siblings, function(sibling) {
          return sibling.classList.add('grey');
        });
        return node.classList.remove('grey');
      },
      navigate: function(conf) {
        this.lang = this.setCurrentLanguage(conf.language);
        return this.updateNavigation(conf.node, conf.siblings);
      },
      setCurrentLanguage: function(lang) {
        return lang || this.defaultLanguage;
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
