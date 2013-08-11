(function(define) {
  return define(["lodash"], function(_) {
    return {
      log: function(e) {
        return console.log('zzz', e);
      },
      plugins: [
        {
          module: "wire/dom"
        }
      ]
    };
  });
})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});
