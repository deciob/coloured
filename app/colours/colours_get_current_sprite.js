(function(define) {
  return define(function(require) {
    var getCurrentSprite;
    return getCurrentSprite = function(args) {
      var conf, e, lang;
      e = args.e;
      lang = args.lang;
      conf = args.conf;
      return conf[lang].spriteMap[e.selectorTarget.id.slice(4)];
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
