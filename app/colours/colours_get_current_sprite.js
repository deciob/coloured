(function(define) {
  return define(function(require) {
    var getCurrentSprite;
    return getCurrentSprite = function(e) {
      return this.conf[this.lang].spriteMap[e.selectorTarget.id.slice(4)];
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
