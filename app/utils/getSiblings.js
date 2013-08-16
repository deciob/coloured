(function(define) {
  return define(function(require) {
    var getSiblings;
    return getSiblings = function(currentNode) {
      var node, result;
      result = [];
      node = currentNode.parentNode.firstChild;
      while (node && node.nodeType === 1 && node !== currentNode) {
        result.push(node);
        node = node.nextElementSibling;
      }
      return result;
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
