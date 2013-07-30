(function(define) {
  return define(function(require) {
    var buster, coloursController;
    buster = require("buster");
    coloursController = require('../../app/colours/colours_controller');
    return buster.testCase("colours/coloursController", {
      "should return empty string when input is empty": function() {
        return assert.equals(5, 5);
      }
    });
  });
})((typeof define === "function" && define.amd ? define : function(factory) {
  return module.exports = factory(require);
}));
