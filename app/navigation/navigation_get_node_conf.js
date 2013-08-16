(function(define) {
  return define(["get_siblings"], function(getSiblings) {
    var getNodeConfig;
    return getNodeConfig = function(e) {
      var conf, node;
      node = this.getCurrentNode(e);
      return conf = {
        node: node,
        siblings: getSiblings(node),
        language: node.id.slice(4)
      };
    };
  });
})(typeof define === "function" && define.amd ? define : function(ids, factory) {
  var deps;
  deps = ids.map(function(id) {
    return require(id);
  });
  return module.exports = factory.apply(null, deps);
});
