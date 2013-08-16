(function(define) {
  return define(function(require) {
    var getSiblings;
    return getSiblings = function(currentNode) {
      var node, result;
      result = [];
      node = currentNode.parentNode.firstChild;
      while (node) {
        if (node.nodeType === 1 && node !== currentNode) {
          result.push(node);
        }
        node = node.nextElementSibling || node.nextSibling;
      }
      return result;
    };
  });
})(typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
});
