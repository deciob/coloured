(function(define) {
  return define(function(require) {
    var getCurrentSprite;
    return getCurrentSprite = function(args) {
      var conf, lang;
      lang = args.lang;
      conf = args.conf;
      return conf.all.spriteMap[lang];
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
