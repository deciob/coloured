(function(define) {
  return define(function(require) {
    var getCurrentNode;
    return getCurrentNode = function(e) {
      if (e) {
        return e.target;
      }
      return document.getElementById("nav_" + this.defaultLanguage);
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
