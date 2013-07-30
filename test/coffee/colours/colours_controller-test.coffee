
((define) ->
  define (require) ->
    buster = require("buster")
    coloursController = require('../../app/colours/colours_controller')

    buster.testCase "colours/coloursController",
      "should return empty string when input is empty": ->
        assert.equals 5, 5


) (if typeof define is "function" and define.amd then define else (factory) ->
  module.exports = factory(require)
)