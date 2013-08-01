
;(function(curl) {
  var config, fail, success;
  success = function() {
    var msg;
    msg = void 0;
    msg = "Looking good!";
    return console.log(msg);
  };
  fail = function(ex) {
    var el, msg;
    el = void 0;
    msg = void 0;
    console.log("an error happened during loading :'(");
    console.log(ex.message);
    if (ex.stack) {
      console.log(ex.stack);
    }
    el = document.getElementById("errout");
    msg = "An error occurred while loading: " + ex.message + ". See the console for more information.";
    if (el) {
      if ("textContent" in el) {
        el.textContent = msg;
      } else {
        el.innerText = msg;
      }
      el.style.display = "";
      return document.documentElement.className = "";
    } else {
      throw msg;
    }
  };
  config = {
    baseUrl: './',
    packages: [
      {
        name: "colours",
        location: "app/colours"
      }, {
        name: "theme",
        location: "theme/css",
        config: {
          moduleLoader: "curl/plugin/css"
        }
      }, {
        name: "curl",
        location: "lib/curl/src/curl"
      }, {
        name: "wire",
        location: "lib/wire",
        main: "wire"
      }, {
        name: "cola",
        location: "lib/cola",
        main: "cola"
      }, {
        name: "when",
        location: "lib/when",
        main: "when"
      }, {
        name: "meld",
        location: "lib/meld",
        main: "meld"
      }, {
        name: "poly",
        location: "lib/poly"
      }, {
        name: "lodash",
        location: "lib/lodash",
        main: "lodash"
      }
    ],
    locale: false,
    preloads: ["poly/all"]
  };
  return curl(config, ["wire!app/main"]).then(success, fail);
})(curl);
/**
 * XHR polyfill / shims
 *
 * (c) copyright 2011-2013 Brian Cavalier and John Hann
 *
 * This module is part of the cujo.js family of libraries (http://cujojs.com/).
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 */
define('poly/xhr', function () {

	var progIds;

	// find XHR implementation
	if (typeof XMLHttpRequest == 'undefined') {
		// create xhr impl that will fail if called.
		assignCtor(function () { throw new Error("poly/xhr: XMLHttpRequest not available"); });
		// keep trying progIds until we find the correct one,
		progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
		while (progIds.length && tryProgId(progIds.shift())) {}
	}

	function assignCtor (ctor) {
		// assign window.XMLHttpRequest function
		window.XMLHttpRequest = ctor;
	}

	function tryProgId (progId) {
		try {
			new ActiveXObject(progId);
			assignCtor(function () { return new ActiveXObject(progId); });
			return true;
		}
		catch (ex) {}
	}

});
/**
 * poly common functions
 *
 * (c) copyright 2011-2013 Brian Cavalier and John Hann
 *
 * This module is part of the cujo.js family of libraries (http://cujojs.com/).
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 */
define('poly/lib/_base', ['require', 'exports', 'module'], function (require, exports, module) {

	var toString;

	toString = ({}).toString;

	exports.isFunction = function (o) {
		return typeof o == 'function';
	};

	exports.isString = function (o) {
		return toString.call(o) == '[object String]';
	};

	exports.toString = function (o) {
		return toString.apply(o);
	};

	exports.createCaster = function (caster, name) {
		return function cast (o) {
			if (o == null) throw new TypeError(name + ' method called on null or undefined');
			return caster(o);
		}
	}

});
/*! JSON v3.2.4 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Convenience aliases.
  var getClass = {}.toString, isProperty, forEach, undef;

  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd, JSON3 = !isLoader && typeof exports == "object" && exports;

  if (JSON3 || isLoader) {
    if (typeof JSON == "object" && JSON) {
      // Delegate to the native `stringify` and `parse` implementations in
      // asynchronous module loaders and CommonJS environments.
      if (isLoader) {
        JSON3 = JSON;
      } else {
        JSON3.stringify = JSON.stringify;
        JSON3.parse = JSON.parse;
      }
    } else if (isLoader) {
      JSON3 = this.JSON = {};
    }
  } else {
    // Export for web browsers and JavaScript engines.
    JSON3 = this.JSON || (this.JSON = {});
  }

  // Local variables.
  var Escapes, toPaddedString, quote, serialize;
  var fromCharCode, Unescapes, abort, lex, get, walk, update, Index, Source;

  // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
  var isExtended = new Date(-3509827334573292), floor, Months, getDay;

  try {
    // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
    // results for certain dates in Opera >= 10.53.
    isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() == 1 &&
      // Safari < 2.0.2 stores the internal millisecond time value correctly,
      // but clips the values returned by the date methods to the range of
      // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
      isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
  } catch (exception) {}

  // Internal: Determines whether the native `JSON.stringify` and `parse`
  // implementations are spec-compliant. Based on work by Ken Snyder.
  function has(name) {
    var stringifySupported, parseSupported, value, serialized = '{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}', all = name == "json";
    if (all || name == "json-stringify" || name == "json-parse") {
      // Test `JSON.stringify`.
      if (name == "json-stringify" || all) {
        if ((stringifySupported = typeof JSON3.stringify == "function" && isExtended)) {
          // A test function object with a custom `toJSON` method.
          (value = function () {
            return 1;
          }).toJSON = value;
          try {
            stringifySupported =
              // Firefox 3.1b1 and b2 serialize string, number, and boolean
              // primitives as object literals.
              JSON3.stringify(0) === "0" &&
              // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
              // literals.
              JSON3.stringify(new Number()) === "0" &&
              JSON3.stringify(new String()) == '""' &&
              // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
              // does not define a canonical JSON representation (this applies to
              // objects with `toJSON` properties as well, *unless* they are nested
              // within an object or array).
              JSON3.stringify(getClass) === undef &&
              // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
              // FF 3.1b3 pass this test.
              JSON3.stringify(undef) === undef &&
              // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
              // respectively, if the value is omitted entirely.
              JSON3.stringify() === undef &&
              // FF 3.1b1, 2 throw an error if the given value is not a number,
              // string, array, object, Boolean, or `null` literal. This applies to
              // objects with custom `toJSON` methods as well, unless they are nested
              // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
              // methods entirely.
              JSON3.stringify(value) === "1" &&
              JSON3.stringify([value]) == "[1]" &&
              // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
              // `"[null]"`.
              JSON3.stringify([undef]) == "[null]" &&
              // YUI 3.0.0b1 fails to serialize `null` literals.
              JSON3.stringify(null) == "null" &&
              // FF 3.1b1, 2 halts serialization if an array contains a function:
              // `[1, true, getClass, 1]` serializes as "[1,true,],". These versions
              // of Firefox also allow trailing commas in JSON objects and arrays.
              // FF 3.1b3 elides non-JSON values from objects and arrays, unless they
              // define custom `toJSON` methods.
              JSON3.stringify([undef, getClass, null]) == "[null,null,null]" &&
              // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
              // where character escape codes are expected (e.g., `\b` => `\u0008`).
              JSON3.stringify({ "A": [value, true, false, null, "\0\b\n\f\r\t"] }) == serialized &&
              // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
              JSON3.stringify(null, value) === "1" &&
              JSON3.stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              JSON3.stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              JSON3.stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              JSON3.stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              JSON3.stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          } catch (exception) {
            stringifySupported = false;
          }
        }
        if (!all) {
          return stringifySupported;
        }
      }
      // Test `JSON.parse`.
      if (name == "json-parse" || all) {
        if (typeof JSON3.parse == "function") {
          try {
            // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
            // Conforming implementations should also coerce the initial argument to
            // a string prior to parsing.
            if (JSON3.parse("0") === 0 && !JSON3.parse(false)) {
              // Simple parsing test.
              value = JSON3.parse(serialized);
              if ((parseSupported = value.A.length == 5 && value.A[0] == 1)) {
                try {
                  // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                  parseSupported = !JSON3.parse('"\t"');
                } catch (exception) {}
                if (parseSupported) {
                  try {
                    // FF 4.0 and 4.0.1 allow leading `+` signs, and leading and
                    // trailing decimal points. FF 4.0, 4.0.1, and IE 9-10 also
                    // allow certain octal literals.
                    parseSupported = JSON3.parse("01") != 1;
                  } catch (exception) {}
                }
              }
            }
          } catch (exception) {
            parseSupported = false;
          }
        }
        if (!all) {
          return parseSupported;
        }
      }
      return stringifySupported && parseSupported;
    }
  }

  if (!has("json")) {
    // Define additional utility methods if the `Date` methods are buggy.
    if (!isExtended) {
      floor = Math.floor;
      // A mapping between the months of the year and the number of days between
      // January 1st and the first of the respective month.
      Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      // Internal: Calculates the number of days between the Unix epoch and the
      // first day of the given month.
      getDay = function (year, month) {
        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
      };
    }
    
    // Internal: Determines if a property is a direct property of the given
    // object. Delegates to the native `Object#hasOwnProperty` method.
    if (!(isProperty = {}.hasOwnProperty)) {
      isProperty = function (property) {
        var members = {}, constructor;
        if ((members.__proto__ = null, members.__proto__ = {
          // The *proto* property cannot be set multiple times in recent
          // versions of Firefox and SeaMonkey.
          "toString": 1
        }, members).toString != getClass) {
          // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
          // supports the mutable *proto* property.
          isProperty = function (property) {
            // Capture and break the object's prototype chain (see section 8.6.2
            // of the ES 5.1 spec). The parenthesized expression prevents an
            // unsafe transformation by the Closure Compiler.
            var original = this.__proto__, result = property in (this.__proto__ = null, this);
            // Restore the original prototype chain.
            this.__proto__ = original;
            return result;
          };
        } else {
          // Capture a reference to the top-level `Object` constructor.
          constructor = members.constructor;
          // Use the `constructor` property to simulate `Object#hasOwnProperty` in
          // other environments.
          isProperty = function (property) {
            var parent = (this.constructor || constructor).prototype;
            return property in this && !(property in parent && this[property] === parent[property]);
          };
        }
        members = null;
        return isProperty.call(this, property);
      };
    }

    // Internal: Normalizes the `for...in` iteration algorithm across
    // environments. Each enumerated key is yielded to a `callback` function.
    forEach = function (object, callback) {
      var size = 0, Properties, members, property, forEach;

      // Tests for bugs in the current environment's `for...in` algorithm. The
      // `valueOf` property inherits the non-enumerable flag from
      // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
      (Properties = function () {
        this.valueOf = 0;
      }).prototype.valueOf = 0;

      // Iterate over a new instance of the `Properties` class.
      members = new Properties();
      for (property in members) {
        // Ignore all properties inherited from `Object.prototype`.
        if (isProperty.call(members, property)) {
          size++;
        }
      }
      Properties = members = null;

      // Normalize the iteration algorithm.
      if (!size) {
        // A list of non-enumerable properties inherited from `Object.prototype`.
        members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
        // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
        // properties.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == "[object Function]", property, length;
          for (property in object) {
            // Gecko <= 1.0 enumerates the `prototype` property of functions under
            // certain conditions; IE does not.
            if (!(isFunction && property == "prototype") && isProperty.call(object, property)) {
              callback(property);
            }
          }
          // Manually invoke the callback for each non-enumerable property.
          for (length = members.length; property = members[--length]; isProperty.call(object, property) && callback(property));
        };
      } else if (size == 2) {
        // Safari <= 2.0.4 enumerates shadowed properties twice.
        forEach = function (object, callback) {
          // Create a set of iterated properties.
          var members = {}, isFunction = getClass.call(object) == "[object Function]", property;
          for (property in object) {
            // Store each property name to prevent double enumeration. The
            // `prototype` property of functions is not enumerated due to cross-
            // environment inconsistencies.
            if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
              callback(property);
            }
          }
        };
      } else {
        // No bugs detected; use the standard `for...in` algorithm.
        forEach = function (object, callback) {
          var isFunction = getClass.call(object) == "[object Function]", property, isConstructor;
          for (property in object) {
            if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
              callback(property);
            }
          }
          // Manually invoke the callback for the `constructor` property due to
          // cross-environment inconsistencies.
          if (isConstructor || isProperty.call(object, (property = "constructor"))) {
            callback(property);
          }
        };
      }
      return forEach(object, callback);
    };

    // Public: Serializes a JavaScript `value` as a JSON string. The optional
    // `filter` argument may specify either a function that alters how object and
    // array members are serialized, or an array of strings and numbers that
    // indicates which properties should be serialized. The optional `width`
    // argument may be either a string or number that specifies the indentation
    // level of the output.
    if (!has("json-stringify")) {
      // Internal: A map of control characters and their escaped equivalents.
      Escapes = {
        "\\": "\\\\",
        '"': '\\"',
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t"
      };

      // Internal: Converts `value` into a zero-padded string such that its
      // length is at least equal to `width`. The `width` must be <= 6.
      toPaddedString = function (width, value) {
        // The `|| 0` expression is necessary to work around a bug in
        // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
        return ("000000" + (value || 0)).slice(-width);
      };

      // Internal: Double-quotes a string `value`, replacing all ASCII control
      // characters (characters with code unit values between 0 and 31) with
      // their escaped equivalents. This is an implementation of the
      // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
      quote = function (value) {
        var result = '"', index = 0, symbol;
        for (; symbol = value.charAt(index); index++) {
          // Escape the reverse solidus, double quote, backspace, form feed, line
          // feed, carriage return, and tab characters.
          result += '\\"\b\f\n\r\t'.indexOf(symbol) > -1 ? Escapes[symbol] :
            // If the character is a control character, append its Unicode escape
            // sequence; otherwise, append the character as-is.
            (Escapes[symbol] = symbol < " " ? "\\u00" + toPaddedString(2, symbol.charCodeAt(0).toString(16)) : symbol);
        }
        return result + '"';
      };

      // Internal: Recursively serializes an object. Implements the
      // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
      serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
        var value = object[property], className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, any, result;
        if (typeof value == "object" && value) {
          className = getClass.call(value);
          if (className == "[object Date]" && !isProperty.call(value, "toJSON")) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              if (getDay) {
                // Manually compute the year, month, date, hours, minutes,
                // seconds, and milliseconds if the `getUTC*` methods are
                // buggy. Adapted from @Yaffle's `date-shim` project.
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                // The `time` value specifies the time within the day (see ES
                // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                // to compute `A modulo B`, as the `%` operator does not
                // correspond to the `modulo` operation for negative numbers.
                time = (value % 864e5 + 864e5) % 864e5;
                // The hours, minutes, seconds, and milliseconds are obtained by
                // decomposing the time within the day. See section 15.9.1.10.
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              } else {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              }
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                // Months, dates, hours, minutes, and seconds should have two
                // digits; milliseconds should have three.
                "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                // Milliseconds are optional in ES 5.0, but required in 5.1.
                "." + toPaddedString(3, milliseconds) + "Z";
            } else {
              value = null;
            }
          } else if (typeof value.toJSON == "function" && ((className != "[object Number]" && className != "[object String]" && className != "[object Array]") || isProperty.call(value, "toJSON"))) {
            // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
            // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
            // ignores all `toJSON` methods on these objects unless they are
            // defined directly on an instance.
            value = value.toJSON(property);
          }
        }
        if (callback) {
          // If a replacement function was provided, call it to obtain the value
          // for serialization.
          value = callback.call(object, property, value);
        }
        if (value === null) {
          return "null";
        }
        className = getClass.call(value);
        if (className == "[object Boolean]") {
          // Booleans are represented literally.
          return "" + value;
        } else if (className == "[object Number]") {
          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
          // `"null"`.
          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
        } else if (className == "[object String]") {
          // Strings are double-quoted and escaped.
          return quote(value);
        }
        // Recursively serialize objects and arrays.
        if (typeof value == "object") {
          // Check for cyclic structures. This is a linear search; performance
          // is inversely proportional to the number of unique nested objects.
          for (length = stack.length; length--;) {
            if (stack[length] === value) {
              // Cyclic structures cannot be serialized by `JSON.stringify`.
              throw TypeError();
            }
          }
          // Add the object to the stack of traversed objects.
          stack.push(value);
          results = [];
          // Save the current indentation level and indent one additional level.
          prefix = indentation;
          indentation += whitespace;
          if (className == "[object Array]") {
            // Recursively serialize array elements.
            for (index = 0, length = value.length; index < length; any || (any = true), index++) {
              element = serialize(index, value, callback, properties, whitespace, indentation, stack);
              results.push(element === undef ? "null" : element);
            }
            result = any ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
          } else {
            // Recursively serialize object members. Members are selected from
            // either a user-specified list of property names, or the object
            // itself.
            forEach(properties || value, function (property) {
              var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
              if (element !== undef) {
                // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                // is not the empty string, let `member` {quote(property) + ":"}
                // be the concatenation of `member` and the `space` character."
                // The "`space` character" refers to the literal space
                // character, not the `space` {width} argument provided to
                // `JSON.stringify`.
                results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
              }
              any || (any = true);
            });
            result = any ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
          }
          // Remove the object from the traversed object stack.
          stack.pop();
          return result;
        }
      };

      // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
      JSON3.stringify = function (source, filter, width) {
        var whitespace, callback, properties, index, length, value;
        if (typeof filter == "function" || typeof filter == "object" && filter) {
          if (getClass.call(filter) == "[object Function]") {
            callback = filter;
          } else if (getClass.call(filter) == "[object Array]") {
            // Convert the property names array into a makeshift set.
            properties = {};
            for (index = 0, length = filter.length; index < length; value = filter[index++], ((getClass.call(value) == "[object String]" || getClass.call(value) == "[object Number]") && (properties[value] = 1)));
          }
        }
        if (width) {
          if (getClass.call(width) == "[object Number]") {
            // Convert the `width` to an integer and create a string containing
            // `width` number of space characters.
            if ((width -= width % 1) > 0) {
              for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
            }
          } else if (getClass.call(width) == "[object String]") {
            whitespace = width.length <= 10 ? width : width.slice(0, 10);
          }
        }
        // Opera <= 7.54u2 discards the values associated with empty string keys
        // (`""`) only if they are used directly within an object member list
        // (e.g., `!("" in { "": 1})`).
        return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
      };
    }

    // Public: Parses a JSON source string.
    if (!has("json-parse")) {
      fromCharCode = String.fromCharCode;
      // Internal: A map of escaped control characters and their unescaped
      // equivalents.
      Unescapes = {
        "\\": "\\",
        '"': '"',
        "/": "/",
        "b": "\b",
        "t": "\t",
        "n": "\n",
        "f": "\f",
        "r": "\r"
      };

      // Internal: Resets the parser state and throws a `SyntaxError`.
      abort = function() {
        Index = Source = null;
        throw SyntaxError();
      };

      // Internal: Returns the next token, or `"$"` if the parser has reached
      // the end of the source string. A token may be a string, number, `null`
      // literal, or Boolean literal.
      lex = function () {
        var source = Source, length = source.length, symbol, value, begin, position, sign;
        while (Index < length) {
          symbol = source.charAt(Index);
          if ("\t\r\n ".indexOf(symbol) > -1) {
            // Skip whitespace tokens, including tabs, carriage returns, line
            // feeds, and space characters.
            Index++;
          } else if ("{}[]:,".indexOf(symbol) > -1) {
            // Parse a punctuator token at the current position.
            Index++;
            return symbol;
          } else if (symbol == '"') {
            // Advance to the next character and parse a JSON string at the
            // current position. String tokens are prefixed with the sentinel
            // `@` character to distinguish them from punctuators.
            for (value = "@", Index++; Index < length;) {
              symbol = source.charAt(Index);
              if (symbol < " ") {
                // Unescaped ASCII control characters are not permitted.
                abort();
              } else if (symbol == "\\") {
                // Parse escaped JSON control characters, `"`, `\`, `/`, and
                // Unicode escape sequences.
                symbol = source.charAt(++Index);
                if ('\\"/btnfr'.indexOf(symbol) > -1) {
                  // Revive escaped control characters.
                  value += Unescapes[symbol];
                  Index++;
                } else if (symbol == "u") {
                  // Advance to the first character of the escape sequence.
                  begin = ++Index;
                  // Validate the Unicode escape sequence.
                  for (position = Index + 4; Index < position; Index++) {
                    symbol = source.charAt(Index);
                    // A valid sequence comprises four hexdigits that form a
                    // single hexadecimal value.
                    if (!(symbol >= "0" && symbol <= "9" || symbol >= "a" && symbol <= "f" || symbol >= "A" && symbol <= "F")) {
                      // Invalid Unicode escape sequence.
                      abort();
                    }
                  }
                  // Revive the escaped character.
                  value += fromCharCode("0x" + source.slice(begin, Index));
                } else {
                  // Invalid escape sequence.
                  abort();
                }
              } else {
                if (symbol == '"') {
                  // An unescaped double-quote character marks the end of the
                  // string.
                  break;
                }
                // Append the original character as-is.
                value += symbol;
                Index++;
              }
            }
            if (source.charAt(Index) == '"') {
              Index++;
              // Return the revived string.
              return value;
            }
            // Unterminated string.
            abort();
          } else {
            // Parse numbers and literals.
            begin = Index;
            // Advance the scanner's position past the sign, if one is
            // specified.
            if (symbol == "-") {
              sign = true;
              symbol = source.charAt(++Index);
            }
            // Parse an integer or floating-point value.
            if (symbol >= "0" && symbol <= "9") {
              // Leading zeroes are interpreted as octal literals.
              if (symbol == "0" && (symbol = source.charAt(Index + 1), symbol >= "0" && symbol <= "9")) {
                // Illegal octal literal.
                abort();
              }
              sign = false;
              // Parse the integer component.
              for (; Index < length && (symbol = source.charAt(Index), symbol >= "0" && symbol <= "9"); Index++);
              // Floats cannot contain a leading decimal point; however, this
              // case is already accounted for by the parser.
              if (source.charAt(Index) == ".") {
                position = ++Index;
                // Parse the decimal component.
                for (; position < length && (symbol = source.charAt(position), symbol >= "0" && symbol <= "9"); position++);
                if (position == Index) {
                  // Illegal trailing decimal.
                  abort();
                }
                Index = position;
              }
              // Parse exponents.
              symbol = source.charAt(Index);
              if (symbol == "e" || symbol == "E") {
                // Skip past the sign following the exponent, if one is
                // specified.
                symbol = source.charAt(++Index);
                if (symbol == "+" || symbol == "-") {
                  Index++;
                }
                // Parse the exponential component.
                for (position = Index; position < length && (symbol = source.charAt(position), symbol >= "0" && symbol <= "9"); position++);
                if (position == Index) {
                  // Illegal empty exponent.
                  abort();
                }
                Index = position;
              }
              // Coerce the parsed value to a JavaScript number.
              return +source.slice(begin, Index);
            }
            // A negative sign may only precede numbers.
            if (sign) {
              abort();
            }
            // `true`, `false`, and `null` literals.
            if (source.slice(Index, Index + 4) == "true") {
              Index += 4;
              return true;
            } else if (source.slice(Index, Index + 5) == "false") {
              Index += 5;
              return false;
            } else if (source.slice(Index, Index + 4) == "null") {
              Index += 4;
              return null;
            }
            // Unrecognized token.
            abort();
          }
        }
        // Return the sentinel `$` character if the parser has reached the end
        // of the source string.
        return "$";
      };

      // Internal: Parses a JSON `value` token.
      get = function (value) {
        var results, any, key;
        if (value == "$") {
          // Unexpected end of input.
          abort();
        }
        if (typeof value == "string") {
          if (value.charAt(0) == "@") {
            // Remove the sentinel `@` character.
            return value.slice(1);
          }
          // Parse object and array literals.
          if (value == "[") {
            // Parses a JSON array, returning a new JavaScript array.
            results = [];
            for (;; any || (any = true)) {
              value = lex();
              // A closing square bracket marks the end of the array literal.
              if (value == "]") {
                break;
              }
              // If the array literal contains elements, the current token
              // should be a comma separating the previous element from the
              // next.
              if (any) {
                if (value == ",") {
                  value = lex();
                  if (value == "]") {
                    // Unexpected trailing `,` in array literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each array element.
                  abort();
                }
              }
              // Elisions and leading commas are not permitted.
              if (value == ",") {
                abort();
              }
              results.push(get(value));
            }
            return results;
          } else if (value == "{") {
            // Parses a JSON object, returning a new JavaScript object.
            results = {};
            for (;; any || (any = true)) {
              value = lex();
              // A closing curly brace marks the end of the object literal.
              if (value == "}") {
                break;
              }
              // If the object literal contains members, the current token
              // should be a comma separator.
              if (any) {
                if (value == ",") {
                  value = lex();
                  if (value == "}") {
                    // Unexpected trailing `,` in object literal.
                    abort();
                  }
                } else {
                  // A `,` must separate each object member.
                  abort();
                }
              }
              // Leading commas are not permitted, object property names must be
              // double-quoted strings, and a `:` must separate each property
              // name and value.
              if (value == "," || typeof value != "string" || value.charAt(0) != "@" || lex() != ":") {
                abort();
              }
              results[value.slice(1)] = get(lex());
            }
            return results;
          }
          // Unexpected token encountered.
          abort();
        }
        return value;
      };

      // Internal: Updates a traversed object member.
      update = function(source, property, callback) {
        var element = walk(source, property, callback);
        if (element === undef) {
          delete source[property];
        } else {
          source[property] = element;
        }
      };

      // Internal: Recursively traverses a parsed JSON object, invoking the
      // `callback` function for each value. This is an implementation of the
      // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
      walk = function (source, property, callback) {
        var value = source[property], length;
        if (typeof value == "object" && value) {
          if (getClass.call(value) == "[object Array]") {
            for (length = value.length; length--;) {
              update(value, length, callback);
            }
          } else {
            // `forEach` can't be used to traverse an array in Opera <= 8.54,
            // as `Object#hasOwnProperty` returns `false` for array indices
            // (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            forEach(value, function (property) {
              update(value, property, callback);
            });
          }
        }
        return callback.call(source, property, value);
      };

      // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
      JSON3.parse = function (source, callback) {
        var result, value;
        Index = 0;
        Source = source;
        result = get(lex());
        // If a JSON string contains multiple tokens, it is invalid.
        if (lex() != "$") {
          abort();
        }
        // Reset the parser state.
        Index = Source = null;
        return callback && getClass.call(callback) == "[object Function]" ? walk((value = {}, value[""] = result, value), "", callback) : result;
      };
    }
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define('poly/support/json3', function () {
      return JSON3;
    });
  }
}).call(this);
/**
 * String polyfill / shims
 *
 * (c) copyright 2011-2013 Brian Cavalier and John Hann
 *
 * This module is part of the cujo.js family of libraries (http://cujojs.com/).
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 * Adds str.trim(), str.trimRight(), and str.trimLeft()
 *
 * Note: we don't bother trimming all possible ES5 white-space characters.
 * If you truly need strict ES5 whitespace compliance in all browsers,
 * create your own trim function.
 * from http://perfectionkills.com/whitespace-deviations/
 * '\x09-\x0D\x20\xA0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000\u2028\u2029'
 */
define('poly/string', ['poly/lib/_base'], function (base) {
	"use strict";

	var proto = String.prototype,
		featureMap,
		has,
		toString;

	featureMap = {
		'string-trim': 'trim',
		'string-trimleft': 'trimLeft',
		'string-trimright': 'trimRight'
	};

	function checkFeature (feature) {
		var prop = featureMap[feature];
		return base.isFunction(proto[prop]);
	}

	function neg () { return false; }

	has = checkFeature;

	// compressibility helper
	function remove (str, rx) {
		return str.replace(rx, '');
	}

	toString = base.createCaster(String, 'String');

	var trimRightRx, trimLeftRx;

	trimRightRx = /\s+$/;
	trimLeftRx = /^\s+/;

	function checkShims () {
		if (!has('string-trim')) {
			proto.trim = function trim () {
				return remove(remove(toString(this), trimLeftRx), trimRightRx);
			};
		}

		if (!has('string-trimleft')) {
			proto.trimLeft = function trimLeft () {
				return remove(toString(this), trimLeftRx);
			};
		}

		if (!has('string-trimright')) {
			proto.trimRight = function trimRight () {
				return remove(toString(this), trimRightRx);
			};
		}

	}

	checkShims();

	return {
		setWhitespaceChars: function (wsc) {
			trimRightRx = new RegExp(wsc + '$');
			trimLeftRx = new RegExp('^' + wsc);
			// fail all has() checks and check shims again
			has = neg;
			checkShims();
		}
	};

});
/**
 * JSON polyfill / shim
 *
 * (c) copyright 2011-2013 Brian Cavalier and John Hann
 *
 * poly is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 */
define('poly/json', ['poly/support/json3'], function (JSON) {
	return JSON;
});
/*
	poly/date

	ES5-ish Date shims for older browsers.

	(c) copyright 2011-2013 Brian Cavalier and John Hann

	This module is part of the cujo.js family of libraries (http://cujojs.com/).

	Licensed under the MIT License at:
		http://www.opensource.org/licenses/mit-license.php
*/
(function (origDate) {
define('poly/date', ['poly/lib/_base'], function (base) {

	var origProto,
		origParse,
		featureMap,
		maxDate,
		invalidDate,
		isoCompat,
		isoParseRx,
		ownProp,
		undef;

	origProto = origDate.prototype;
	origParse = origDate.parse;

	ownProp = Object.prototype.hasOwnProperty;

	maxDate = 8.64e15;
	invalidDate = NaN;
	// borrowed this from https://github.com/kriskowal/es5-shim
	isoCompat = function () { return origDate.parse('+275760-09-13T00:00:00.000Z') == maxDate; };
	// can't even have spaces in iso date strings
	// in Chrome and FF, the colon in the timezone is optional, but IE, Opera, and Safari need it
	isoParseRx = /^([+\-]\d{6}|\d{4})(?:-(\d{2}))?(?:-(\d{2}))?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:.(\d{1,3}))?)?(?:Z|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;

	featureMap = {
		'date-now': 'now',
		'date-tojson': 'toJSON',
		'date-toisostring': 'toISOString'
	};

	function has (feature) {
		var prop = featureMap[feature];
		return prop in origDate || prop in origProto;
	}

	if (!has('date-now')) {
		origDate.now = function () { return +(new Date); };
	}

	function isInvalidDate (date) {
		return !isFinite(date);
	}

	function fix2 (number) {
		// ensures number is formatted to at least two digits
		return (number < 10 ? '0' : '') + number;
	}

	function isoParse (str) {
		// parses simplified iso8601 dates, such as
		// yyyy-mm-ddThh:mm:ssZ
		// +yyyyyy-mm-ddThh:mm:ss-06:30
		var result;

		// prepare for the worst
		result = invalidDate;

		// fast parse
		str.replace(isoParseRx, function (a, y, m, d, h, n, s, ms, tzs, tzh, tzm) {
			var adjust = 0;

			// Date.UTC handles years between 0 and 100 as 2-digit years, but
			// that's not what we want with iso dates. If we move forward
			// 400 years -- a full cycle in the Gregorian calendar -- then
			// subtract the 400 years (as milliseconds) afterwards, we can avoid
			// this problem. (learned of this trick from kriskowal/es5-shim.)
			if (y >= 0 && y < 100) {
				y = +y + 400; // convert to number
				adjust = -126227808e5; // 400 years
			}

			result = Date.UTC(y, (m || 1) - 1, d || 1, h || 0, n || 0, s || 0, ms || 0) + adjust;

			tzh = +(tzs + tzh); // convert to signed number
			tzm = +(tzs + tzm); // convert to signed number

			if (tzh || tzm) {
				result -= (tzh + tzm / 60) * 36e5;
				// check if time zone is out of bounds
				if (tzh > 23 || tzh < -23 || tzm > 59) result = invalidDate;
				// check if time zone pushed us over maximum date value
				if (result > maxDate) result = invalidDate;
			}

			return ''; // reduces memory used
		});

		return result;
	}

	if (!has('date-toisostring')) {

		origProto.toISOString = function toIsoString () {
			if (isInvalidDate(this)) {
				throw new RangeError("toISOString called on invalid value");
			}
			return [
				this.getUTCFullYear(), '-',
				fix2(this.getUTCMonth() + 1), '-',
				fix2(this.getUTCDate()), 'T',
				fix2(this.getUTCHours()), ':',
				fix2(this.getUTCMinutes()), ':',
				fix2(this.getUTCSeconds()), '.',
				(this.getUTCMilliseconds()/1000).toFixed(3).slice(2), 'Z'
			].join('');
		};

	}

	if (!has('date-tojson')) {

		origProto.toJSON = function toJSON (key) {
			// key arg is ignored by Date objects, but since this function
			// is generic, other Date-like objects could use the key arg.
			// spec says to throw a TypeError if toISOString is not callable
			// but that's what happens anyways, so no need for extra code.
			return this.toISOString();
		};
	}

	function checkIsoCompat () {
		// fix Date constructor

		var newDate = (function () {
			// Replacement Date constructor
			return function Date (y, m, d, h, mn, s, ms) {
				var len, result;

				// Date called as function, not constructor
				if (!(this instanceof newDate)) return origDate.apply(this, arguments);

				len = arguments.length;

				if (len === 0) {
					result = new origDate();
				}
				else if (len === 1) {
					result = new origDate(base.isString(y) ? newDate.parse(y) : y);
				}
				else {
					result = new origDate(y, m, d == undef ? 1 : d, h || 0, mn || 0, s || 0, ms || 0);
				}

				result.constructor = newDate;

				return result;
			};
		}());

		if (!isoCompat()) {

			newDate.now = origDate.now;
			newDate.UTC = origDate.UTC;
			newDate.prototype = origProto;
			newDate.prototype.constructor = newDate;

			newDate.parse = function parse (str) {
				var result;

				// check for iso date
				result = isoParse('' + str);

				if (isInvalidDate(result)) {
					// try original parse()
					result = origParse(str);
				}

				return result;
			};

			// Unfortunate. See cujojs/poly#11
			// Copy any owned props that may have been previously added to
			// the Date constructor by 3rd party libs.
			copyPropsSafely(newDate, origDate);

			Date = newDate;
		}
		else if (Date != origDate) {
			Date = origDate;
		}

	}

	function copyPropsSafely(dst, src) {
		for (var p in src) {
			if (ownProp.call(src, p) && !ownProp.call(dst, p)) {
				dst[p] = src[p];
			}
		}
	}

	checkIsoCompat();

	return {
		setIsoCompatTest: function (testFunc) {
			isoCompat = testFunc;
			checkIsoCompat();
		}
	};

});
}(Date));
/**
 * Object polyfill / shims
 *
 * (c) copyright 2011-2013 Brian Cavalier and John Hann
 *
 * This module is part of the cujo.js family of libraries (http://cujojs.com/).
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 */
/**
 * The goal of these shims is to emulate a JavaScript 1.8.5+ environments as
 * much as possible.  While it's not feasible to fully shim Object,
 * we can try to maximize code compatibility with older js engines.
 *
 * Note: these shims cannot fix `for (var p in obj) {}`. Instead, use this:
 *     Object.keys(obj).forEach(function (p) {}); // shimmed Array
 *
 * Also, these shims can't prevent writing to object properties.
 *
 * If you want your code to fail loudly if a shim can't mimic ES5 closely
 * then set the AMD loader config option `failIfShimmed`.  Possible values
 * for `failIfShimmed` include:
 *
 * true: fail on every shimmed Object function
 * false: fail never
 * function: fail for shims whose name returns true from function (name) {}
 *
 * By default, no shims fail.
 *
 * The following functions are safely shimmed:
 * create (unless the second parameter is specified since that calls defineProperties)
 * keys
 * getOwnPropertyNames
 * getPrototypeOf
 * isExtensible
 *
 * In order to play nicely with several third-party libs (including Promises/A
 * implementations), the following functions don't fail by default even though
 * they can't be correctly shimmed:
 * freeze
 * seal
 * isFrozen
 * isSealed
 *
 * Note: this shim doesn't do anything special with IE8's minimally useful
 * Object.defineProperty(domNode).
 *
 * The poly/strict module will set failIfShimmed to fail for some shims.
 * See the documentation for more information.
 *
 * IE missing enum properties fixes copied from kangax:
 * https://github.com/kangax/protolicious/blob/master/experimental/object.for_in.js
 *
 * TODO: fix Object#propertyIsEnumerable for IE's non-enumerable props to match Object.keys()
 */
define('poly/object', ['poly/lib/_base'], function (base) {
"use strict";

	var refObj,
		refProto,
		has__proto__,
		hasNonEnumerableProps,
		getPrototypeOf,
		keys,
		featureMap,
		shims,
		secrets,
		protoSecretProp,
		hasOwnProp = 'hasOwnProperty',
		undef;

	refObj = Object;
	refProto = refObj.prototype;

	has__proto__ = typeof {}.__proto__ == 'object';

	hasNonEnumerableProps = (function () {
		for (var p in { valueOf: 1 }) return false;
		return true;
	}());

	// TODO: this still doesn't work for IE6-8 since object.constructor && object.constructor.prototype are clobbered/replaced when using `new` on a constructor that has a prototype. srsly.
	// devs will have to do the following if they want this to work in IE6-8:
	// Ctor.prototype.constructor = Ctor
	getPrototypeOf = has__proto__
		? function (object) { assertIsObject(object); return object.__proto__; }
		: function (object) {
			assertIsObject(object);
			return protoSecretProp && object[protoSecretProp](secrets)
				? object[protoSecretProp](secrets.proto)
				: object.constructor ? object.constructor.prototype : refProto;
		};

	keys = !hasNonEnumerableProps
		? _keys
		: (function (masked) {
			return function (object) {
				var result = _keys(object), i = 0, m;
				while (m = masked[i++]) {
					if (hasProp(object, m)) result.push(m);
				}
				return result;
			}
		}([ 'constructor', hasOwnProp, 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'toLocaleString', 'valueOf' ]));

	featureMap = {
		'object-create': 'create',
		'object-freeze': 'freeze',
		'object-isfrozen': 'isFrozen',
		'object-seal': 'seal',
		'object-issealed': 'isSealed',
		'object-getprototypeof': 'getPrototypeOf',
		'object-keys': 'keys',
		'object-getownpropertynames': 'getOwnPropertyNames',
		'object-defineproperty': 'defineProperty',
		'object-defineproperties': 'defineProperties',
		'object-isextensible': 'isExtensible',
		'object-preventextensions': 'preventExtensions',
		'object-getownpropertydescriptor': 'getOwnPropertyDescriptor'
	};

	shims = {};

	secrets = {
		proto: {}
	};

	protoSecretProp = !has('object-getprototypeof') && !has__proto__ && hasNonEnumerableProps && hasOwnProp;

	function createFlameThrower (feature) {
		return function () {
			throw new Error('poly/object: ' + feature + ' is not safely supported.');
		}
	}

	function has (feature) {
		var prop = featureMap[feature];
		return prop in refObj;
	}

	function PolyBase () {}

	// for better compression
	function hasProp (object, name) {
		return object.hasOwnProperty(name);
	}

	function _keys (object) {
		var result = [];
		for (var p in object) {
			if (hasProp(object, p)) {
				result.push(p);
			}
		}
		return result;
	}

	// we might create an owned property to hold the secrets, but make it look
	// like it's not an owned property.  (affects getOwnPropertyNames, too)
	if (protoSecretProp) (function (_hop) {
		refProto[hasOwnProp] = function (name) {
			if (name == protoSecretProp) return false;
			return _hop.call(this, name);
		};
	}(refProto[hasOwnProp]));

	if (!has('object-create')) {
		Object.create = shims.create = function create (proto, props) {
			var obj;

			if (typeof proto != 'object') throw new TypeError('prototype is not of type Object or Null.');

			PolyBase.prototype = proto;
			obj = new PolyBase();
			PolyBase.prototype = null;

			// provide a mechanism for retrieving the prototype in IE 6-8
			if (protoSecretProp) {
				var orig = obj[protoSecretProp];
				obj[protoSecretProp] = function (name) {
					if (name == secrets) return true; // yes, we're using secrets
					if (name == secrets.proto) return proto;
					return orig.call(this, name);
				};
			}

			if (arguments.length > 1) {
				// defineProperties could throw depending on `failIfShimmed`
				Object.defineProperties(obj, props);
			}

			return obj;
		};
	}

	if (!has('object-freeze')) {
		Object.freeze = shims.freeze = function freeze (object) {
			return object;
		};
	}

	if (!has('object-isfrozen')) {
		Object.isFrozen = shims.isFrozen = function isFrozen (object) {
			return false;
		};
	}

	if (!has('object-seal')) {
		Object.seal = shims.seal = function seal (object) {
			return object;
		};
	}

	if (!has('object-issealed')) {
		Object.isSealed = shims.isSealed = function isSealed (object) {
			return false;
		};
	}

	if (!has('object-getprototypeof')) {
		Object.getPrototypeOf = shims.getPrototypeOf = getPrototypeOf;
	}

	if (!has('object-keys')) {
		Object.keys = keys;
	}

	if (!has('object-getownpropertynames')) {
		Object.getOwnPropertyNames = shims.getOwnPropertyNames = function getOwnPropertyNames (object) {
			return keys(object);
		};
	}

	if (!has('object-defineproperty') || !has('object-defineproperties')) {
		Object.defineProperty = shims.defineProperty = function defineProperty (object, name, descriptor) {
			object[name] = descriptor && descriptor.value;
			return object;
		};
	}

	if (!has('object-defineproperties') || !has('object-create')) {
		Object.defineProperties = shims.defineProperties = function defineProperties (object, descriptors) {
			var names, name;
			names = keys(descriptors);
			while ((name = names.pop())) {
				Object.defineProperty(object, name, descriptors[name]);
			}
			return object;
		};
	}

	if (!has('object-isextensible')) {
		Object.isExtensible = shims.isExtensible = function isExtensible (object) {
			var prop = '_poly_';
			try {
				// create unique property name
				while (prop in object) prop += '_';
				// try to set it
				object[prop] = 1;
				return hasProp(object, prop);
			}
			catch (ex) { return false; }
			finally {
				try { delete object[prop]; } catch (ex) { /* squelch */ }
			}
		};
	}

	if (!has('object-preventextensions')) {
		Object.preventExtensions = shims.preventExtensions = function preventExtensions (object) {
			return object;
		};
	}

	if (!has('object-getownpropertydescriptor')) {
		Object.getOwnPropertyDescriptor = shims.getOwnPropertyDescriptor = function getOwnPropertyDescriptor (object, name) {
			return hasProp(object, name)
				? {
					value: object[name],
					enumerable: true,
					configurable: true,
					writable: true
				}
				: undef;
		};
	}

	function failIfShimmed (failTest) {
		var shouldThrow;

		if (typeof failTest == 'function') {
			shouldThrow = failTest;
		}
		else {
			// assume truthy/falsey
			shouldThrow = function () { return failTest; };
		}

		// create throwers for some features
		for (var feature in shims) {
			Object[feature] = shouldThrow(feature)
				? createFlameThrower(feature)
				: shims[feature];
		}
	}

	function assertIsObject (o) { if (typeof o != 'object') throw new TypeError('Object.getPrototypeOf called on non-object'); }

	return {
		failIfShimmed: failIfShimmed
	};

});
/*
	Array -- a stand-alone module for using Javascript 1.6 array features
	in lame-o browsers that don't support Javascript 1.6

	(c) copyright 2011-2013 Brian Cavalier and John Hann

	This module is part of the cujo.js family of libraries (http://cujojs.com/).

	Licensed under the MIT License at:
		http://www.opensource.org/licenses/mit-license.php
*/
/*
	This module is under 1kB when compiled/gzipped and is compatible with
	has() pre-processors (<400 bytes when compiled for modern browsers).

	wrapper API:

	This module will wrap native methods to normalize array calls to
	be unified across js engines that support the array methods
	natively with those that don't:

	define(['poly/lib/shim/array'], function (array) {
		var items = [1, 2, 3];
		array.forEach(items, function (item) {
			console.log(item);
		};
	});

	forEach(array, lambda [, context]);
	every(array, lambda [, context]);
	some(array, lambda [, context]);
	filter(array, lambda [, context]);
	map(array, lambda [, context]);
	indexOf(arr, item [, fromIndex]);
	lastIndexOf(arr, item [, fromIndex]);
	reduce(arr, reduceFunc [, initialValue]);
	reduceRight(arr, reduceFunc [, initialValue]);
	isArray(object)

	polyfill API:

	You may also use this module to augment the Array.prototype of
	older js engines by loading it via the poly! plugin prefix:

	define(['poly!poly/lib/shim/array'], function () {
		var items = [1, 2, 3];
		items.forEach(function (item) {
			console.log(item);
		};
	});

	All of the wrapper API methods are shimmed and are reasonably close to
	the ES5 specification, but may vary slightly in unforeseen edge cases:

	var array = [1, 2, 3];

	array.forEach(lambda [, context]);
	array.every(lambda [, context]);
	array.some(lambda [, context]);
	array.filter(lambda [, context]);
	array.map(lambda [, context]);
	array.indexOf(item [, fromIndex]);
	array.lastIndexOf(item [, fromIndex]);
	array.reduce(reduceFunc [, initialValue]);
	array.reduceRight(reduceFunc [, initialValue]);
	Array.isArray(object)

 */

define('poly/array', ['poly/lib/_base'], function (base) {
"use strict";

	var proto = Array.prototype,
		toString = {}.toString,
		featureMap,
		toObject,
		_reduce,
		_find,
		undef;

	featureMap = {
		'array-foreach': 'forEach',
		'array-every': 'every',
		'array-some': 'some',
		'array-map': 'map',
		'array-filter': 'filter',
		'array-reduce': 'reduce',
		'array-reduceright': 'reduceRight',
		'array-indexof': 'indexOf',
		'array-lastindexof': 'lastIndexOf'
	};

	toObject = base.createCaster(Object, 'Array');

	function toArrayLike (o) {
		return (base.toString(o) == '[object String]')
			? o.split('')
			: toObject(o);
	}

	function isArray (o) {
		return toString.call(o) == '[object Array]';
	}

	function has (feature) {
		var prop = featureMap[feature];
		return base.isFunction(proto[prop]);
	}

	function returnTruthy () {
		return 1;
	}

	function returnValue (val) {
		return val;
	}

	/***** iterators *****/

	function _iterate (arr, lambda, continueFunc, context, start, inc) {

		var alo, len, i, end;

		alo = toArrayLike(arr);
		len = alo.length >>> 0;

		if (start === undef) start = 0;
		if (!inc) inc = 1;
		end = inc < 0 ? -1 : len;

		if (!base.isFunction(lambda)) {
			throw new TypeError(lambda + ' is not a function');
		}
		if (start == end) {
			return false;
		}
		if ((start <= end) ^ (inc > 0)) {
			throw new TypeError('Invalid length or starting index');
		}

		for (i = start; i != end; i = i + inc) {
			if (i in alo) {
				if (!continueFunc(lambda.call(context, alo[i], i, alo), i, alo[i])) {
					return false;
				}
			}
		}

		return true;
	}

	if (!has('array-foreach')) {
		proto.forEach = function forEach (lambda) {
			// arguments[+1] is to fool google closure compiler into NOT adding a function argument!
			_iterate(this, lambda, returnTruthy, arguments[+1]);
		};
	}

	if (!has('array-every')) {
		proto.every = function every (lambda) {
			// arguments[+1] is to fool google closure compiler into NOT adding a function argument!
			return _iterate(this, lambda, returnValue, arguments[+1]);
		};
	}

	if (!has('array-some')) {
		proto.some = function some (lambda) {
			// arguments[+1] is to fool google closure compiler into NOT adding a function argument!
			return _iterate(this, lambda, function (val) { return !val; }, arguments[+1]);
		};
	}

	/***** mutators *****/

	if(!has('array-map')) {
		proto.map = function map (lambda) {
			var arr, result;

			arr = this;
			result = new Array(arr.length);

			// arguments[+1] is to fool google closure compiler into NOT adding a function argument!
			_iterate(arr, lambda, function (val, i) { result[i] = val; return 1; }, arguments[+1]);

			return result;
		};
	}

	if (!has('array-filter')) {
		proto.filter = function filter (lambda) {
			var arr, result;

			arr = this;
			result = [];

			_iterate(arr, lambda, function (val, i, orig) {
				// use a copy of the original value in case
				// the lambda function changed it
				if (val) {
					result.push(orig);
				}
				return 1;
			}, arguments[1]);

			return result;
		};
	}

	/***** reducers *****/

	if (!has('array-reduce') || !has('array-reduceright')) {

		_reduce = function _reduce (reduceFunc, inc, initialValue, hasInitialValue) {
			var reduced, startPos, initialValuePos;

			startPos = initialValuePos = inc > 0 ? -1 : toArrayLike(this).length >>> 0;

			// If no initialValue, use first item of array (we know length !== 0 here)
			// and adjust i to start at second item
			if (!hasInitialValue) {
				_iterate(this, returnValue, function (val, i) {
					reduced = val;
					initialValuePos = i;
				}, null, startPos + inc, inc);
				if (initialValuePos == startPos) {
					// no intial value and no items in array!
					throw new TypeError();
				}
			}
			else {
				// If initialValue provided, use it
				reduced = initialValue;
			}

			// Do the actual reduce
			_iterate(this, function (item, i, arr) {
				reduced = reduceFunc(reduced, item, i, arr);
			}, returnTruthy, null, initialValuePos + inc, inc);

			// we have a reduced value!
			return reduced;
		};

		if (!has('array-reduce')) {
			proto.reduce = function reduce (reduceFunc /*, initialValue */) {
				return _reduce.call(this, reduceFunc, 1, arguments[+1], arguments.length > 1);
			};
		}

		if (!has('array-reduceright')) {
			proto.reduceRight = function reduceRight (reduceFunc /*, initialValue */) {
				return _reduce.call(this, reduceFunc, -1, arguments[+1], arguments.length > 1);
			};
		}
	}

	/***** finders *****/

	if (!has('array-indexof') || !has('array-lastindexof')) {

		_find = function _find (arr, item, from, forward) {
			var len = toArrayLike(arr).length >>> 0, foundAt = -1;

			// convert to number, or default to start or end positions
			from = isNaN(from) ? (forward ? 0 : len - 1) : Number(from);
			// negative means it's an offset from the end position
			if (from < 0) {
				from = len + from - 1;
			}

			_iterate(arr, returnValue, function (val, i) {
				if (val === item) {
					foundAt = i;
				}
				return foundAt == -1;
			}, null, from, forward ? 1 : -1);

			return foundAt;
		};

		if (!has('array-indexof')) {
			proto.indexOf = function indexOf (item) {
				// arguments[+1] is to fool google closure compiler into NOT adding a function argument!
				return _find(this, item, arguments[+1], true);
			};
		}

		if (!has('array-lastindexof')) {
			proto.lastIndexOf = function lastIndexOf (item) {
				// arguments[+1] is to fool google closure compiler into NOT adding a function argument!
				return _find(this, item, arguments[+1], false);
			};
		}
	}

	if (!Array.isArray) {
		Array.isArray = isArray;
	}

});
/**
 * Function polyfill / shims
 *
 * (c) copyright 2011-2013 Brian Cavalier and John Hann
 *
 * This module is part of the cujo.js family of libraries (http://cujojs.com/).
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 */
define('poly/function', ['poly/lib/_base'], function (base) {
"use strict";

	var bind,
		slice = [].slice,
		proto = Function.prototype,
		featureMap;

	featureMap = {
		'function-bind': 'bind'
	};

	function has (feature) {
		var prop = featureMap[feature];
		return base.isFunction(proto[prop]);
	}

	// check for missing features
	if (!has('function-bind')) {
		// adapted from Mozilla Developer Network example at
		// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
		bind = function bind (obj) {
			var args = slice.call(arguments, 1),
				self = this,
				nop = function () {},
				bound = function () {
				  return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
				};
			nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
			bound.prototype = new nop();
			return bound;
		};
		proto.bind = bind;
	}

	return {};

});
/**
 * setImmediate polyfill / shim
 *
 * (c) copyright 2011-2013 Brian Cavalier and John Hann
 *
 * poly is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Based on NobleJS's setImmediate. (https://github.com/NobleJS/setImmediate)
 *
 * Licensed under the MIT License at:
 *      http://www.opensource.org/licenses/mit-license.php
 *
 */
(function (global) {
define('poly/setImmediate', ['poly/lib/_base'], function (base) {

	var testCache,
		tasks;

	testCache = {};
	tasks = (function () {
		var nextHandle,
			tasksByHandle,
			currentlyRunningATask;

		nextHandle = 1; // Spec says greater than zero
		tasksByHandle = {};
		currentlyRunningATask = false;

		function Task (handler, args) {
			this.handler = handler;
			this.args = Array.prototype.slice.call(args);
		}

		Task.prototype.run = function () {
			// See steps in section 5 of the spec.
			if (base.isFunction(this.handler)) {
				// Choice of `thisArg` is not in the setImmediate spec; `undefined` is in the setTimeout spec though:
				// http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html
				this.handler.apply(undefined, this.args);
			}
			else {
				var scriptSource = '' + this.handler;
				eval(scriptSource);
			}
		};

		return {
			addFromSetImmediateArguments: function (args) {
				var handler,
					argsToHandle,
					task,
					thisHandle;

				handler = args[0];
				argsToHandle = Array.prototype.slice.call(args, 1);
				task = new Task(handler, argsToHandle);

				thisHandle = nextHandle++;
				tasksByHandle[thisHandle] = task;
				return thisHandle;
			},
			runIfPresent: function (handle) {
				// From the spec: "Wait until any invocations of this algorithm started before this one have completed."
				// So if we're currently running a task, we'll need to delay this invocation.
				if (!currentlyRunningATask) {
					var task = tasksByHandle[handle];
					if (task) {
						currentlyRunningATask = true;
						try {
							task.run();
						} finally {
							delete tasksByHandle[handle];
							currentlyRunningATask = false;
						}
					}
				} else {
					// Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
					// "too much recursion" error.
					global.setTimeout(function () {
						tasks.runIfPresent(handle);
					}, 0);
				}
			},
			remove: function (handle) {
				delete tasksByHandle[handle];
			}
		};
	}());

	function has (name) {
		if (base.isFunction(testCache[name])) {
			testCache[name] = testCache[name](global);
		}
		return testCache[name];
	}

	function add (name, test, now) {
		testCache[name] = now ? test(global, d, el) : test;
	}

	function aliasMicrosoftImplementation (attachTo) {
		attachTo.setImmediate = global.msSetImmediate;
		attachTo.clearImmediate = global.msClearImmediate;
	}

	function installPostMessageImplementation (attachTo) {
		// Installs an event handler on `global` for the `message` event: see
		// * https://developer.mozilla.org/en/DOM/window.postMessage
		// * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

		var MESSAGE_PREFIX = 'cujojs/poly.setImmediate' + Math.random();

		function isStringAndStartsWith (string, putativeStart) {
			return typeof string === 'string' && string.substring(0, putativeStart.length) === putativeStart;
		}

		function onGlobalMessage (event) {
			// This will catch all incoming messages (even from other windows!), so we need to try reasonably hard to
			// avoid letting anyone else trick us into firing off. We test the origin is still this window, and that a
			// (randomly generated) unpredictable identifying prefix is present.
			if (event.source === global && isStringAndStartsWith(event.data, MESSAGE_PREFIX)) {
				var handle = event.data.substring(MESSAGE_PREFIX.length);
				tasks.runIfPresent(handle);
			}
		}
		global.addEventListener('message', onGlobalMessage, false);

		attachTo.setImmediate = function () {
			var handle = tasks.addFromSetImmediateArguments(arguments);

			// Make `global` post a message to itself with the handle and identifying prefix, thus asynchronously
			// invoking our onGlobalMessage listener above.
			global.postMessage(MESSAGE_PREFIX + handle, '*');
			return handle;
		};
	}

	function installReadyStateChangeImplementation(attachTo) {
		attachTo.setImmediate = function () {
			var handle = tasks.addFromSetImmediateArguments(arguments);

			// Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
			// into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
			var scriptEl = global.document.createElement('script');
			scriptEl.onreadystatechange = function () {
				tasks.runIfPresent(handle);

				scriptEl.onreadystatechange = null;
				scriptEl.parentNode.removeChild(scriptEl);
				scriptEl = null;
			};
			global.document.documentElement.appendChild(scriptEl);
			return handle;
		};
	}

	function installSetTimeoutImplementation(attachTo) {
		attachTo.setImmediate = function () {
			var handle = tasks.addFromSetImmediateArguments(arguments);

			global.setTimeout(function () {
				tasks.runIfPresent(handle);
			}, 0);
			return handle;
		};
	}

	add('setimmediate', function (g) {
		return base.isFunction(g.setImmediate);
	});

	add('ms-setimmediate', function (g) {
		return base.isFunction(g.msSetImmediate);
	});

	add('post-message', function (g) {
		// Note: this is only for the async postMessage, not the buggy sync
		// version in IE8
		var postMessageIsAsynchronous,
			oldOnMessage;

		postMessageIsAsynchronous = true;
		oldOnMessage = g.onmessage;

		if (!g.postMessage) {
			return false;
		}

		g.onmessage = function () {
			postMessageIsAsynchronous = false;
		};
		g.postMessage('', '*');
		g.onmessage = oldOnMessage;
		return postMessageIsAsynchronous;
	});

	add('script-onreadystatechange', function (g) {
		return 'document' in g && 'onreadystatechange' in g.document.createElement('script');
	});

	if (!has('setimmediate')) {
		if (has('ms-setimmediate')) {
			aliasMicrosoftImplementation(global);
		}
		else {
			if (has('post-message')) {
				installPostMessageImplementation(global);
			}
			else if (has('script-onreadystatechange')) {
				installReadyStateChangeImplementation(global);
			}
			else {
				 installSetTimeoutImplementation(global);
			}
			global.clearImmediate = tasks.remove;
		}
	}
});
}(this.global || this));
/**
 * polyfill / shim plugin for AMD loaders
 *
 * (c) copyright 2011-2013 Brian Cavalier and John Hann
 *
 * poly is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 */

define('poly/all', ['poly/object', 'poly/string', 'poly/date', 'poly/array', 'poly/function', 'poly/json', 'poly/xhr', 'poly/setImmediate'], function (object, string, date, $cram_3, $cram_4, $cram_5, $cram_6, $cram_7) {

	return {
		failIfShimmed: object.failIfShimmed,
		setWhitespaceChars: string.setWhitespaceChars,
		setIsoCompatTest: date.setIsoCompatTest
	};

});
/** @license MIT License (c) copyright 2011-2013 original author or authors */

/**
 * A lightweight CommonJS Promises/A and when() implementation
 * when is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Brian Cavalier
 * @author John Hann
 * @version 2.2.1
 */
(function(define, global) { 'use strict';
define('when/when', function () {

	// Public API

	when.promise   = promise;    // Create a pending promise
	when.resolve   = resolve;    // Create a resolved promise
	when.reject    = reject;     // Create a rejected promise
	when.defer     = defer;      // Create a {promise, resolver} pair

	when.join      = join;       // Join 2 or more promises

	when.all       = all;        // Resolve a list of promises
	when.map       = map;        // Array.map() for promises
	when.reduce    = reduce;     // Array.reduce() for promises
	when.settle    = settle;     // Settle a list of promises

	when.any       = any;        // One-winner race
	when.some      = some;       // Multi-winner race

	when.isPromise = isPromise;  // Determine if a thing is a promise


	/**
	 * Register an observer for a promise or immediate value.
	 *
	 * @param {*} promiseOrValue
	 * @param {function?} [onFulfilled] callback to be called when promiseOrValue is
	 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	 *   will be invoked immediately.
	 * @param {function?} [onRejected] callback to be called when promiseOrValue is
	 *   rejected.
	 * @param {function?} [onProgress] callback to be called when progress updates
	 *   are issued for promiseOrValue.
	 * @returns {Promise} a new {@link Promise} that will complete with the return
	 *   value of callback or errback or the completion value of promiseOrValue if
	 *   callback and/or errback is not supplied.
	 */
	function when(promiseOrValue, onFulfilled, onRejected, onProgress) {
		// Get a trusted promise for the input promiseOrValue, and then
		// register promise handlers
		return resolve(promiseOrValue).then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Trusted Promise constructor.  A Promise created from this constructor is
	 * a trusted when.js promise.  Any other duck-typed promise is considered
	 * untrusted.
	 * @constructor
	 * @name Promise
	 */
	function Promise(then, inspect) {
		this.then = then;
		this.inspect = inspect;
	}

	Promise.prototype = {
		/**
		 * Register a rejection handler.  Shortcut for .then(undefined, onRejected)
		 * @param {function?} onRejected
		 * @return {Promise}
		 */
		otherwise: function(onRejected) {
			return this.then(undef, onRejected);
		},

		/**
		 * Ensures that onFulfilledOrRejected will be called regardless of whether
		 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
		 * receive the promises' value or reason.  Any returned value will be disregarded.
		 * onFulfilledOrRejected may throw or return a rejected promise to signal
		 * an additional error.
		 * @param {function} onFulfilledOrRejected handler to be called regardless of
		 *  fulfillment or rejection
		 * @returns {Promise}
		 */
		ensure: function(onFulfilledOrRejected) {
			return this.then(injectHandler, injectHandler)['yield'](this);

			function injectHandler() {
				return resolve(onFulfilledOrRejected());
			}
		},

		/**
		 * Shortcut for .then(function() { return value; })
		 * @param  {*} value
		 * @return {Promise} a promise that:
		 *  - is fulfilled if value is not a promise, or
		 *  - if value is a promise, will fulfill with its value, or reject
		 *    with its reason.
		 */
		'yield': function(value) {
			return this.then(function() {
				return value;
			});
		},

		/**
		 * Assumes that this promise will fulfill with an array, and arranges
		 * for the onFulfilled to be called with the array as its argument list
		 * i.e. onFulfilled.apply(undefined, array).
		 * @param {function} onFulfilled function to receive spread arguments
		 * @return {Promise}
		 */
		spread: function(onFulfilled) {
			return this.then(function(array) {
				// array may contain promises, so resolve its contents.
				return all(array, function(array) {
					return onFulfilled.apply(undef, array);
				});
			});
		},

		/**
		 * Shortcut for .then(onFulfilledOrRejected, onFulfilledOrRejected)
		 * @deprecated
		 */
		always: function(onFulfilledOrRejected, onProgress) {
			return this.then(onFulfilledOrRejected, onFulfilledOrRejected, onProgress);
		}
	};

	/**
	 * Returns a resolved promise. The returned promise will be
	 *  - fulfilled with promiseOrValue if it is a value, or
	 *  - if promiseOrValue is a promise
	 *    - fulfilled with promiseOrValue's value after it is fulfilled
	 *    - rejected with promiseOrValue's reason after it is rejected
	 * @param  {*} value
	 * @return {Promise}
	 */
	function resolve(value) {
		return promise(function(resolve) {
			resolve(value);
		});
	}

	/**
	 * Returns a rejected promise for the supplied promiseOrValue.  The returned
	 * promise will be rejected with:
	 * - promiseOrValue, if it is a value, or
	 * - if promiseOrValue is a promise
	 *   - promiseOrValue's value after it is fulfilled
	 *   - promiseOrValue's reason after it is rejected
	 * @param {*} promiseOrValue the rejected value of the returned {@link Promise}
	 * @return {Promise} rejected {@link Promise}
	 */
	function reject(promiseOrValue) {
		return when(promiseOrValue, rejected);
	}

	/**
	 * Creates a {promise, resolver} pair, either or both of which
	 * may be given out safely to consumers.
	 * The resolver has resolve, reject, and progress.  The promise
	 * has then plus extended promise API.
	 *
	 * @return {{
	 * promise: Promise,
	 * resolve: function:Promise,
	 * reject: function:Promise,
	 * notify: function:Promise
	 * resolver: {
	 *	resolve: function:Promise,
	 *	reject: function:Promise,
	 *	notify: function:Promise
	 * }}}
	 */
	function defer() {
		var deferred, pending, resolved;

		// Optimize object shape
		deferred = {
			promise: undef, resolve: undef, reject: undef, notify: undef,
			resolver: { resolve: undef, reject: undef, notify: undef }
		};

		deferred.promise = pending = promise(makeDeferred);

		return deferred;

		function makeDeferred(resolvePending, rejectPending, notifyPending) {
			deferred.resolve = deferred.resolver.resolve = function(value) {
				if(resolved) {
					return resolve(value);
				}
				resolved = true;
				resolvePending(value);
				return pending;
			};

			deferred.reject  = deferred.resolver.reject  = function(reason) {
				if(resolved) {
					return resolve(rejected(reason));
				}
				resolved = true;
				rejectPending(reason);
				return pending;
			};

			deferred.notify  = deferred.resolver.notify  = function(update) {
				notifyPending(update);
				return update;
			};
		}
	}

	/**
	 * Creates a new promise whose fate is determined by resolver.
	 * @param {function} resolver function(resolve, reject, notify)
	 * @returns {Promise} promise whose fate is determine by resolver
	 */
	function promise(resolver) {
		return _promise(resolver, monitorApi.PromiseStatus && monitorApi.PromiseStatus());
	}

	/**
	 * Creates a new promise, linked to parent, whose fate is determined
	 * by resolver.
	 * @param {function} resolver function(resolve, reject, notify)
	 * @param {Promise?} status promise from which the new promise is begotten
	 * @returns {Promise} promise whose fate is determine by resolver
	 * @private
	 */
	function _promise(resolver, status) {
		var self, value, handlers = [];

		self = new Promise(then, inspect);

		// Call the provider resolver to seal the promise's fate
		try {
			resolver(promiseResolve, promiseReject, promiseNotify);
		} catch(e) {
			promiseReject(e);
		}

		// Return the promise
		return self;

		/**
		 * Register handlers for this promise.
		 * @param [onFulfilled] {Function} fulfillment handler
		 * @param [onRejected] {Function} rejection handler
		 * @param [onProgress] {Function} progress handler
		 * @return {Promise} new Promise
		 */
		function then(onFulfilled, onRejected, onProgress) {
			var next = _promise(function(resolve, reject, notify) {
				// if not resolved, push onto handlers, otherwise execute asap
				// but not in the current stack
				handlers ? handlers.push(run) : enqueue(function() { run(value); });

				function run(p) {
					p.then(onFulfilled, onRejected, onProgress)
						.then(resolve, reject, notify);
				}

			}, status && status.observed());

			return next;
		}

		function inspect() {
			return value ? value.inspect() : toPendingState();
		}

		/**
		 * Transition from pre-resolution state to post-resolution state, notifying
		 * all listeners of the ultimate fulfillment or rejection
		 * @param {*|Promise} val resolution value
		 */
		function promiseResolve(val) {
			if(!handlers) {
				return;
			}

			value = coerce(val);
			scheduleHandlers(handlers, value);
			handlers = undef;

			if (status) {
				value.then(
					function () { status.fulfilled(); },
					function(r) { status.rejected(r); }
				);
			}
		}

		/**
		 * Reject this promise with the supplied reason, which will be used verbatim.
		 * @param {*} reason reason for the rejection
		 */
		function promiseReject(reason) {
			promiseResolve(rejected(reason));
		}

		/**
		 * Issue a progress event, notifying all progress listeners
		 * @param {*} update progress event payload to pass to all listeners
		 */
		function promiseNotify(update) {
			if(handlers) {
				scheduleHandlers(handlers, progressing(update));
			}
		}
	}

	/**
	 * Coerces x to a trusted Promise
	 *
	 * @private
	 * @param {*} x thing to coerce
	 * @returns {Promise} Guaranteed to return a trusted Promise.  If x
	 *   is trusted, returns x, otherwise, returns a new, trusted, already-resolved
	 *   Promise whose resolution value is:
	 *   * the resolution value of x if it's a foreign promise, or
	 *   * x if it's a value
	 */
	function coerce(x) {
		if(x instanceof Promise) {
			return x;
		}

		if (!(x === Object(x) && 'then' in x)) {
			return fulfilled(x);
		}

		return promise(function(resolve, reject, notify) {
			enqueue(function() {
				try {
					// We must check and assimilate in the same tick, but not the
					// current tick, careful only to access promiseOrValue.then once.
					var untrustedThen = x.then;

					if(typeof untrustedThen === 'function') {
						fcall(untrustedThen, x, resolve, reject, notify);
					} else {
						// It's a value, create a fulfilled wrapper
						resolve(fulfilled(x));
					}

				} catch(e) {
					// Something went wrong, reject
					reject(e);
				}
			});
		});
	}

	/**
	 * Create an already-fulfilled promise for the supplied value
	 * @private
	 * @param {*} value
	 * @return {Promise} fulfilled promise
	 */
	function fulfilled(value) {
		var self = new Promise(function (onFulfilled) {
			try {
				return typeof onFulfilled == 'function'
					? coerce(onFulfilled(value)) : self;
			} catch (e) {
				return rejected(e);
			}
		}, function() {
			return toFulfilledState(value);
		});

		return self;
	}

	/**
	 * Create an already-rejected promise with the supplied rejection reason.
	 * @private
	 * @param {*} reason
	 * @return {Promise} rejected promise
	 */
	function rejected(reason) {
		var self = new Promise(function (_, onRejected) {
			try {
				return typeof onRejected == 'function'
					? coerce(onRejected(reason)) : self;
			} catch (e) {
				return rejected(e);
			}
		}, function() {
			return toRejectedState(reason);
		});

		return self;
	}

	/**
	 * Create a progress promise with the supplied update.
	 * @private
	 * @param {*} update
	 * @return {Promise} progress promise
	 */
	function progressing(update) {
		var self = new Promise(function (_, __, onProgress) {
			try {
				return typeof onProgress == 'function'
					? progressing(onProgress(update)) : self;
			} catch (e) {
				return progressing(e);
			}
		});

		return self;
	}

	/**
	 * Schedule a task that will process a list of handlers
	 * in the next queue drain run.
	 * @private
	 * @param {Array} handlers queue of handlers to execute
	 * @param {*} value passed as the only arg to each handler
	 */
	function scheduleHandlers(handlers, value) {
		enqueue(function() {
			var handler, i = 0;
			while (handler = handlers[i++]) {
				handler(value);
			}
		});
	}

	/**
	 * Determines if promiseOrValue is a promise or not
	 *
	 * @param {*} promiseOrValue anything
	 * @returns {boolean} true if promiseOrValue is a {@link Promise}
	 */
	function isPromise(promiseOrValue) {
		return promiseOrValue && typeof promiseOrValue.then === 'function';
	}

	/**
	 * Initiates a competitive race, returning a promise that will resolve when
	 * howMany of the supplied promisesOrValues have resolved, or will reject when
	 * it becomes impossible for howMany to resolve, for example, when
	 * (promisesOrValues.length - howMany) + 1 input promises reject.
	 *
	 * @param {Array} promisesOrValues array of anything, may contain a mix
	 *      of promises and values
	 * @param howMany {number} number of promisesOrValues to resolve
	 * @param {function?} [onFulfilled] DEPRECATED, use returnedPromise.then()
	 * @param {function?} [onRejected] DEPRECATED, use returnedPromise.then()
	 * @param {function?} [onProgress] DEPRECATED, use returnedPromise.then()
	 * @returns {Promise} promise that will resolve to an array of howMany values that
	 *  resolved first, or will reject with an array of
	 *  (promisesOrValues.length - howMany) + 1 rejection reasons.
	 */
	function some(promisesOrValues, howMany, onFulfilled, onRejected, onProgress) {

		return when(promisesOrValues, function(promisesOrValues) {

			return promise(resolveSome).then(onFulfilled, onRejected, onProgress);

			function resolveSome(resolve, reject, notify) {
				var toResolve, toReject, values, reasons, fulfillOne, rejectOne, len, i;

				len = promisesOrValues.length >>> 0;

				toResolve = Math.max(0, Math.min(howMany, len));
				values = [];

				toReject = (len - toResolve) + 1;
				reasons = [];

				// No items in the input, resolve immediately
				if (!toResolve) {
					resolve(values);

				} else {
					rejectOne = function(reason) {
						reasons.push(reason);
						if(!--toReject) {
							fulfillOne = rejectOne = identity;
							reject(reasons);
						}
					};

					fulfillOne = function(val) {
						// This orders the values based on promise resolution order
						values.push(val);
						if (!--toResolve) {
							fulfillOne = rejectOne = identity;
							resolve(values);
						}
					};

					for(i = 0; i < len; ++i) {
						if(i in promisesOrValues) {
							when(promisesOrValues[i], fulfiller, rejecter, notify);
						}
					}
				}

				function rejecter(reason) {
					rejectOne(reason);
				}

				function fulfiller(val) {
					fulfillOne(val);
				}
			}
		});
	}

	/**
	 * Initiates a competitive race, returning a promise that will resolve when
	 * any one of the supplied promisesOrValues has resolved or will reject when
	 * *all* promisesOrValues have rejected.
	 *
	 * @param {Array|Promise} promisesOrValues array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param {function?} [onFulfilled] DEPRECATED, use returnedPromise.then()
	 * @param {function?} [onRejected] DEPRECATED, use returnedPromise.then()
	 * @param {function?} [onProgress] DEPRECATED, use returnedPromise.then()
	 * @returns {Promise} promise that will resolve to the value that resolved first, or
	 * will reject with an array of all rejected inputs.
	 */
	function any(promisesOrValues, onFulfilled, onRejected, onProgress) {

		function unwrapSingleResult(val) {
			return onFulfilled ? onFulfilled(val[0]) : val[0];
		}

		return some(promisesOrValues, 1, unwrapSingleResult, onRejected, onProgress);
	}

	/**
	 * Return a promise that will resolve only once all the supplied promisesOrValues
	 * have resolved. The resolution value of the returned promise will be an array
	 * containing the resolution values of each of the promisesOrValues.
	 * @memberOf when
	 *
	 * @param {Array|Promise} promisesOrValues array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param {function?} [onFulfilled] DEPRECATED, use returnedPromise.then()
	 * @param {function?} [onRejected] DEPRECATED, use returnedPromise.then()
	 * @param {function?} [onProgress] DEPRECATED, use returnedPromise.then()
	 * @returns {Promise}
	 */
	function all(promisesOrValues, onFulfilled, onRejected, onProgress) {
		return _map(promisesOrValues, identity).then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Joins multiple promises into a single returned promise.
	 * @return {Promise} a promise that will fulfill when *all* the input promises
	 * have fulfilled, or will reject when *any one* of the input promises rejects.
	 */
	function join(/* ...promises */) {
		return _map(arguments, identity);
	}

	/**
	 * Settles all input promises such that they are guaranteed not to
	 * be pending once the returned promise fulfills. The returned promise
	 * will always fulfill, except in the case where `array` is a promise
	 * that rejects.
	 * @param {Array|Promise} array or promise for array of promises to settle
	 * @returns {Promise} promise that always fulfills with an array of
	 *  outcome snapshots for each input promise.
	 */
	function settle(array) {
		return _map(array, toFulfilledState, toRejectedState);
	}

	/**
	 * Promise-aware array map function, similar to `Array.prototype.map()`,
	 * but input array may contain promises or values.
	 * @param {Array|Promise} array array of anything, may contain promises and values
	 * @param {function} mapFunc map function which may return a promise or value
	 * @returns {Promise} promise that will fulfill with an array of mapped values
	 *  or reject if any input promise rejects.
	 */
	function map(array, mapFunc) {
		return _map(array, mapFunc);
	}

	/**
	 * Internal map that allows a fallback to handle rejections
	 * @param {Array|Promise} array array of anything, may contain promises and values
	 * @param {function} mapFunc map function which may return a promise or value
	 * @param {function?} fallback function to handle rejected promises
	 * @returns {Promise} promise that will fulfill with an array of mapped values
	 *  or reject if any input promise rejects.
	 */
	function _map(array, mapFunc, fallback) {
		return when(array, function(array) {

			return promise(resolveMap);

			function resolveMap(resolve, reject, notify) {
				var results, len, toResolve, i;

				// Since we know the resulting length, we can preallocate the results
				// array to avoid array expansions.
				toResolve = len = array.length >>> 0;
				results = [];

				if(!toResolve) {
					resolve(results);
					return;
				}

				// Since mapFunc may be async, get all invocations of it into flight
				for(i = 0; i < len; i++) {
					if(i in array) {
						resolveOne(array[i], i);
					} else {
						--toResolve;
					}
				}

				function resolveOne(item, i) {
					when(item, mapFunc, fallback).then(function(mapped) {
						results[i] = mapped;

						if(!--toResolve) {
							resolve(results);
						}
					}, reject, notify);
				}
			}
		});
	}

	/**
	 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
	 * input may contain promises and/or values, and reduceFunc
	 * may return either a value or a promise, *and* initialValue may
	 * be a promise for the starting value.
	 *
	 * @param {Array|Promise} promise array or promise for an array of anything,
	 *      may contain a mix of promises and values.
	 * @param {function} reduceFunc reduce function reduce(currentValue, nextValue, index, total),
	 *      where total is the total number of items being reduced, and will be the same
	 *      in each call to reduceFunc.
	 * @returns {Promise} that will resolve to the final reduced value
	 */
	function reduce(promise, reduceFunc /*, initialValue */) {
		var args = fcall(slice, arguments, 1);

		return when(promise, function(array) {
			var total;

			total = array.length;

			// Wrap the supplied reduceFunc with one that handles promises and then
			// delegates to the supplied.
			args[0] = function (current, val, i) {
				return when(current, function (c) {
					return when(val, function (value) {
						return reduceFunc(c, value, i, total);
					});
				});
			};

			return reduceArray.apply(array, args);
		});
	}

	// Snapshot states

	/**
	 * Creates a fulfilled state snapshot
	 * @private
	 * @param {*} x any value
	 * @returns {{state:'fulfilled',value:*}}
	 */
	function toFulfilledState(x) {
		return { state: 'fulfilled', value: x };
	}

	/**
	 * Creates a rejected state snapshot
	 * @private
	 * @param {*} x any reason
	 * @returns {{state:'rejected',reason:*}}
	 */
	function toRejectedState(x) {
		return { state: 'rejected', reason: x };
	}

	/**
	 * Creates a pending state snapshot
	 * @private
	 * @returns {{state:'pending'}}
	 */
	function toPendingState() {
		return { state: 'pending' };
	}

	//
	// Utilities, etc.
	//

	var reduceArray, slice, fcall, nextTick, handlerQueue,
		setTimeout, funcProto, call, arrayProto, monitorApi, undef;

	//
	// Shared handler queue processing
	//
	// Credit to Twisol (https://github.com/Twisol) for suggesting
	// this type of extensible queue + trampoline approach for
	// next-tick conflation.

	handlerQueue = [];

	/**
	 * Enqueue a task. If the queue is not currently scheduled to be
	 * drained, schedule it.
	 * @param {function} task
	 */
	function enqueue(task) {
		if(handlerQueue.push(task) === 1) {
			nextTick(drainQueue);
		}
	}

	/**
	 * Drain the handler queue entirely, being careful to allow the
	 * queue to be extended while it is being processed, and to continue
	 * processing until it is truly empty.
	 */
	function drainQueue() {
		var task, i = 0;

		while(task = handlerQueue[i++]) {
			task();
		}

		handlerQueue = [];
	}

	//
	// Capture function and array utils
	//
	/*global setImmediate,process,vertx*/

	// Allow attaching the monitor to when() if env has no console
	monitorApi = typeof console != 'undefined' ? console : when;

	// capture setTimeout to avoid being caught by fake timers used in time based tests
	setTimeout = global.setTimeout;
	// Prefer setImmediate, cascade to node, vertx and finally setTimeout
	nextTick = typeof setImmediate === 'function' ? setImmediate.bind(global)
		: typeof process === 'object' && process.nextTick ? process.nextTick
		: typeof vertx === 'object' ? vertx.runOnLoop // vert.x
			: function(task) { setTimeout(task, 0); }; // fallback

	// Safe function calls
	funcProto = Function.prototype;
	call = funcProto.call;
	fcall = funcProto.bind
		? call.bind(call)
		: function(f, context) {
			return f.apply(context, slice.call(arguments, 2));
		};

	// Safe array ops
	arrayProto = [];
	slice = arrayProto.slice;

	// ES5 reduce implementation if native not available
	// See: http://es5.github.com/#x15.4.4.21 as there are many
	// specifics and edge cases.  ES5 dictates that reduce.length === 1
	// This implementation deviates from ES5 spec in the following ways:
	// 1. It does not check if reduceFunc is a Callable
	reduceArray = arrayProto.reduce ||
		function(reduceFunc /*, initialValue */) {
			/*jshint maxcomplexity: 7*/
			var arr, args, reduced, len, i;

			i = 0;
			arr = Object(this);
			len = arr.length >>> 0;
			args = arguments;

			// If no initialValue, use first item of array (we know length !== 0 here)
			// and adjust i to start at second item
			if(args.length <= 1) {
				// Skip to the first real element in the array
				for(;;) {
					if(i in arr) {
						reduced = arr[i++];
						break;
					}

					// If we reached the end of the array without finding any real
					// elements, it's a TypeError
					if(++i >= len) {
						throw new TypeError();
					}
				}
			} else {
				// If initialValue provided, use it
				reduced = args[1];
			}

			// Do the actual reduce
			for(;i < len; ++i) {
				if(i in arr) {
					reduced = reduceFunc(reduced, arr[i], i, arr);
				}
			}

			return reduced;
		};

	function identity(x) {
		return x;
	}

	return when;
});
})(
	typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(); },
	this
);
/** MIT License (c) copyright 2010-2013 B Cavalier & J Hann */

/**
 * curl domReady
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 */

/**
 * usage:
 *  require(['ModuleA', 'curl/domReady'], function (ModuleA, domReady) {
 * 		var a = new ModuleA();
 * 		domReady(function () {
 * 			document.body.appendChild(a.domNode);
 * 		});
 * 	});
 *
 * also: check out curl's domReady! plugin
 *
 * HT to Bryan Forbes who wrote the initial domReady code:
 * http://www.reigndropsfall.net/
 *
 */
(function (global, doc) {

	var
		readyState = 'readyState',
		// keep these quoted so closure compiler doesn't squash them
		readyStates = { 'loaded': 1, 'interactive': 1, 'complete': 1 },
		callbacks = [],
		fixReadyState = doc && typeof doc[readyState] != "string",
		// IE needs this cuz it won't stop setTimeout if it's already queued up
		completed = false,
		pollerTime = 10,
		addEvent,
		remover,
		removers = [],
		pollerHandle,
		undef;

	function ready () {
		completed = true;
		clearTimeout(pollerHandle);
		while (remover = removers.pop()) remover();
		if (fixReadyState) {
			doc[readyState] = "complete";
		}
		// callback all queued callbacks
		var cb;
		while ((cb = callbacks.shift())) {
			cb();
		}
	}

	var testEl;
	function isDomManipulable () {
		// question: implement Diego Perini's IEContentLoaded instead?
		// answer: The current impl seems more future-proof rather than a
		// non-standard method (doScroll). i don't care if the rest of the js
		// world is using doScroll! They can have fun repairing their libs when
		// the IE team removes doScroll in IE 13. :)
		if (!doc.body) return false; // no body? we're definitely not ready!
		if (!testEl) testEl = doc.createTextNode('');
		try {
			// webkit needs to use body. doc
			doc.body.removeChild(doc.body.appendChild(testEl));
			testEl = undef;
			return true;
		}
		catch (ex) {
			return false;
		}
	}

	function checkDOMReady (e) {
		var isReady;
		// all browsers except IE will be ready when readyState == 'interactive'
		// so we also must check for document.body
		isReady = readyStates[doc[readyState]] && isDomManipulable();
		if (!completed && isReady) {
			ready();
		}
		return isReady;
	}

	function poller () {
		checkDOMReady();
		if (!completed) {
			pollerHandle = setTimeout(poller, pollerTime);
		}
	}

	// select the correct event listener function. all of our supported
	// browsers will use one of these
	if ('addEventListener' in global) {
		addEvent = function (node, event) {
			node.addEventListener(event, checkDOMReady, false);
			return function () { node.removeEventListener(event, checkDOMReady, false); };
		};
	}
	else {
		addEvent = function (node, event) {
			node.attachEvent('on' + event, checkDOMReady);
			return function () { node.detachEvent(event, checkDOMReady); };
		};
	}

	if (doc) {
		if (!checkDOMReady()) {
			// add event listeners and collect remover functions
			removers = [
				addEvent(global, 'load'),
				addEvent(doc, 'readystatechange'),
				addEvent(global, 'DOMContentLoaded')
			];
			// additionally, poll for readystate
			pollerHandle = setTimeout(poller, pollerTime);
		}
	}

	define('curl/domReady', function () {

		// this is simply a callback, but make it look like a promise
		function domReady (cb) {
			if (completed) cb(); else callbacks.push(cb);
		}
		domReady['then'] = domReady;
		domReady['amd'] = true;

		return domReady;

	});

}(this, this.document));

;define('curl/plugin/_fetchText', function () {

	var xhr, progIds;

	progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];

	xhr = function () {
		if (typeof XMLHttpRequest !== "undefined") {
			// rewrite the getXhr method to always return the native implementation
			xhr = function () {
				return new XMLHttpRequest();
			};
		}
		else {
			// keep trying progIds until we find the correct one, then rewrite the getXhr method
			// to always return that one.
			var noXhr = xhr = function () {
				throw new Error("getXhr(): XMLHttpRequest not available");
			};
			while (progIds.length > 0 && xhr === noXhr) (function (id) {
				try {
					new ActiveXObject(id);
					xhr = function () {
						return new ActiveXObject(id);
					};
				}
				catch (ex) {
				}
			}(progIds.shift()));
		}
		return xhr();
	};

	function fetchText (url, callback, errback) {
		var x = xhr();
		x.open('GET', url, true);
		x.onreadystatechange = function (e) {
			if (x.readyState === 4) {
				if (x.status < 400) {
					callback(x.responseText);
				}
				else {
					errback(new Error('fetchText() failed. status: ' + x.statusText));
				}
			}
		};
		x.send(null);
	}

	return fetchText;

});
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define){
define('wire/lib/array', function () {
"use strict";

	var slice = [].slice;

	return {
		delegate: delegateArray,
		fromArguments: fromArguments
	};

	/**
	 * Creates a new {Array} with the same contents as array
	 * @param array {Array}
	 * @return {Array} a new {Array} with the same contents as array. If array is falsey,
	 *  returns a new empty {Array}
	 */
	function delegateArray(array) {
		return array ? [].concat(array) : [];
	}

	function fromArguments(args, index) {
		return slice.call(args, index||0);
	}

});
})(typeof define == 'function'
	// AMD
	? define
	// CommonJS
	: function(factory) { module.exports = factory(); }
);
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define){
define('wire/lib/object', function () {
"use strict";

	return {
		isObject: isObject,
		inherit: inherit
	};

	function isObject(it) {
		// In IE7 tos.call(null) is '[object Object]'
		// so we need to check to see if 'it' is
		// even set
		return it && Object.prototype.toString.call(it) == '[object Object]';
	}

	function inherit(parent) {
		return parent ? Object.create(parent) : {};
	}

});
})(typeof define == 'function'
	// AMD
	? define
	// CommonJS
	: function(factory) { module.exports = factory(); }
);
/** MIT License (c) copyright 2010-2013 B Cavalier & J Hann */

/**
 * curl domReady loader plugin
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 */

/**
 *
 * allows the curl/domReady module to be used like a plugin
 * this is for better compatibility with other loaders.
 *
 * Usage:
 *
 * curl(["domReady!"]).then(doSomething);
 *
 * TODO: use "../domReady" instead of "curl/domReady" when curl's make.sh is updated to use cram
 */

define('curl/plugin/domReady', ['curl/domReady'], function (domReady) {

	return {

		'load': function (name, req, cb, cfg) {
			domReady(cb);
		}

	};

});
/** MIT License (c) copyright 2010-2013 B Cavalier & J Hann */

/**
 * curl text! loader plugin
 *
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 */

/**
 * TODO: load xdomain text, too, somehow
 *
 */

define('curl/plugin/text', ['curl/plugin/_fetchText'], function (fetchText) {

	return {

		'normalize': function (resourceId, toAbsId) {
			// remove options
			return resourceId ? toAbsId(resourceId.split("!")[0]) : resourceId;
		},

		load: function (resourceName, req, callback, config) {
			// remove suffixes (future)
			// get the text
			fetchText(req['toUrl'](resourceName), callback, callback['error'] || error);
		},

		'cramPlugin': '../cram/text'

	};

	function error (ex) {
		throw ex;
	}

});
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define){
define('wire/lib/component', function () {
"use strict";

	var undef;

	/**
	 * Creates an object by either invoking ctor as a function and returning the result,
	 * or by calling new ctor().  It uses a simple heuristic to try to guess which approach
	 * is the "right" one.
	 *
	 * @param ctor {Function} function or constructor to invoke
	 * @param args {Array} array of arguments to pass to ctor in either case
	 *
	 * @return The result of invoking ctor with args, with or without new, depending on
	 * the strategy selected.
	 */
	return function createComponent(ctor, args, forceConstructor) {

		var begotten, ctorResult;

		if (forceConstructor || isConstructor(ctor)) {
			begotten = Object.create(ctor.prototype);
			defineConstructorIfPossible(begotten, ctor);
			ctorResult = ctor.apply(begotten, args);
			if(ctorResult !== undef) {
				begotten = ctorResult;
			}

		} else {
			begotten = ctor.apply(undef, args);

		}

		return begotten === undef ? null : begotten;
	};

	/**
	 * Carefully sets the instance's constructor property to the supplied
	 * constructor, using Object.defineProperty if available.  If it can't
	 * set the constructor in a safe way, it will do nothing.
	 *
	 * @param instance {Object} component instance
	 * @param ctor {Function} constructor
	 */
	function defineConstructorIfPossible(instance, ctor) {
		try {
			Object.defineProperty(instance, 'constructor', {
				value: ctor,
				enumerable: false
			});
		} catch(e) {
			// If we can't define a constructor, oh well.
			// This can happen if in envs where Object.defineProperty is not
			// available, or when using cujojs/poly or other ES5 shims
		}
	}

	/**
	 * Determines whether the supplied function should be invoked directly or
	 * should be invoked using new in order to create the object to be wired.
	 *
	 * @param func {Function} determine whether this should be called using new or not
	 *
	 * @returns {Boolean} true iff func should be invoked using new, false otherwise.
	 */
	function isConstructor(func) {
		var is = false, p;
		for (p in func.prototype) {
			if (p !== undef) {
				is = true;
				break;
			}
		}

		return is;
	}

});
})(typeof define == 'function'
	// AMD
	? define
	// CommonJS
	: function(factory) {
		module.exports = factory();
	}
);

;(function(define) {
define('wire/lib/invoker', ['require'], function (require) {

	return function(methodName, args) {
		return function(target) {
			return target[methodName].apply(target, args);
		};
	};

});
})(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); });
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define){
define('wire/lib/async', ['require', 'when/when', 'wire/lib/array'], function (require, $cram_r0, $cram_r1) {
	"use strict";

	var when, array;

	when = $cram_r0;
	array = $cram_r1;

	return {
		sequence: sequence,
		until: until
	};

	/**
	 * Run the supplied async tasks in sequence, with no overlap.
	 * @param tasks {Array} array of functions
	 * @return {Promise} promise that resolves when all tasks
	 * have completed
	 */
	function sequence(tasks /*, args... */) {
		var args = Array.prototype.slice.call(arguments, 1);
		return when.reduce(tasks, function(results, task) {
			return when(task.apply(null, args), function(result) {
				results.push(result);
				return results;
			});
		}, []);
	};

	function until(work, interval, verifier) {

		var deferred = when.defer();

		verifier = verifier || function () { return false; };

		function schedule() {
			setTimeout(vote, interval);
		}

		function vote() {
			when(work(),
				function (result) {
					when(verifier(result), handleNext, schedule);

					function handleNext(verification) {
						return verification ? deferred.resolve(result) : schedule();
					}
				},
				deferred.reject
			);
		}

		schedule();

		return deferred.promise;
	}


});
})(typeof define == 'function' && define.amd ? define : function(factory) { module.exports = factory(require); });
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

/**
 * Abstract the platform's loader
 * @type {Function}
 * @param require {Function} platform-specific require
 * @return {Function}
 */
if(typeof define == 'function' && define.amd) {
	// AMD
	define('wire/lib/moduleLoader', ['when/when'], function (when) {

		return function createModuleLoader(require) {
			return function(moduleId) {
				var deferred = when.defer();
				require([moduleId], deferred.resolve, deferred.reject);
				return deferred.promise;
			};
		};

	});

} else {
	// CommonJS
	module.exports = function createModuleLoader(require) {
		return require;
	};

}
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define){
define('wire/lib/lifecycle', ['when/when'], function (when) {

	"use strict";

	var lifecyclePhases, phase;

	lifecyclePhases = {
		init: generateSteps(['create', 'configure', 'initialize']),
		startup: generateSteps(['connect', 'ready']),
		shutdown: generateSteps(['destroy'])
	};

	function Lifecycle(config) {
		this._config = config;
	}

	// Generate prototype from lifecyclePhases
	for(phase in lifecyclePhases) {
		Lifecycle.prototype[phase] = createLifecyclePhase(phase);
	}

	return Lifecycle;

	/**
	 * Generate a method to process all steps in a lifecycle phase
	 * @param phase
	 * @return {Function}
	 */
	function createLifecyclePhase(phase) {
		var steps = lifecyclePhases[phase];

		return function(proxy) {
			var self = this;
			return when.reduce(steps, function (unused, step) {
				return processFacets(step, proxy, self._config);
			}, proxy);
		};
	}

	function processFacets(step, proxy, config) {
		var promises, options, name, spec, facets;
		
		promises = [];
		spec = proxy.spec;

		facets = config.facets;

		for (name in facets) {
			options = spec[name];
			if (options) {
				processStep(promises, facets[name], step, proxy, options, config.pluginApi);
			}
		}

		return when.all(promises).then(function () {
			return processListeners(step, proxy, config);
		}).then(function() {
			return proxy;
		});
	}

	function processListeners(step, proxy, config) {
		var listeners, listenerPromises;

		listeners = config.listeners;
		listenerPromises = [];

		for (var i = 0; i < listeners.length; i++) {
			processStep(listenerPromises, listeners[i], step, proxy, {}, config.pluginApi);
		}

		return when.all(listenerPromises);
	}

	function processStep(promises, processor, step, proxy, options, pluginApi) {
		var facet, facetPromise;

		if (processor && processor[step]) {
			facetPromise = when.defer();
			promises.push(facetPromise.promise);

			facet = Object.create(proxy);
			facet.options = options;
			processor[step](facetPromise.resolver, facet, pluginApi);
		}
	}

	function generateSteps(steps) {
		return steps.reduce(reduceSteps, []);
	}

	function reduceSteps(lifecycle, step) {
		lifecycle.push(step + ':before');
		lifecycle.push(step);
		lifecycle.push(step + ':after');
		return lifecycle;
	}
});
})(typeof define == 'function'
	// AMD
	? define
	// CommonJS
	: function(deps, factory) {
		module.exports = factory.apply(this, deps.map(function(x) {
			return require(x);
		}));
	}
);
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define){
define('wire/lib/resolver', ['when/when'], function (when) {

	'use strict';

	function Resolver(config) {
		this._resolvers = config.resolvers;
		this._pluginApi = config.pluginApi;
	}

	Resolver.prototype = {

		isRef: function(it) {
			return it && it.hasOwnProperty('$ref');
		},

		parse: function(it) {
			return this.create(it.$ref, it);
		},

		create: function(name, options) {
			var self, split, resolver;

			self = this;

			split = name.indexOf('!');
			resolver = name.substring(0, split);
			name = name.substring(split + 1);

			return {
				resolver: resolver,
				name: name,
				options: options,
				resolve: function() {
					return self._resolve(resolver, name, options);
				}
			};
		},

		_resolve: function(resolverName, name, options) {
			var deferred, resolver;

			deferred = when.defer();

			if (resolverName) {
				resolver = this._resolvers[resolverName];

				if (resolver) {
					resolver(deferred.resolver, name, options||{}, this._pluginApi);
				} else {
					deferred.reject('No resolver plugin found: ' + resolverName);
				}

			} else {
				deferred.reject('Cannot resolve ref: ' + name);
			}

			return deferred.promise;
		}
	};

	return Resolver;

});
})(typeof define == 'function'
	// AMD
	? define
	// CommonJS
	: function(deps, factory) {
		module.exports = factory.apply(this, deps.map(function(x) {
			return require(x);
		}));
	}
);
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * functional
 * Helper library for working with pure functions in wire and wire plugins
 *
 * NOTE: This lib assumes Function.prototype.bind is available
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */
(function (define) {
define('wire/lib/functional', ['when/when'], function (when) {
"use strict";

	var slice, undef;

	slice = [].slice;

	/**
	 * Create a partial function
	 * @param f {Function}
	 * @param [args] {*} additional arguments will be bound to the returned partial
	 * @return {Function}
	 */
	function partial(f, args/*...*/) {
		// What we want here is to allow the partial function to be called in
		// any context, by attaching it to an object, or using partialed.call/apply
		// That's why we're not using Function.bind() here.  It has no way to bind
		// arguments but allow the context to default.  In other words, you MUST bind
		// the the context to something with Function.bind().

		// Optimization: return f if no args provided
		if(arguments.length == 1) {
			return f;
		}

		args = slice.call(arguments, 1);

		return function() {
			return f.apply(this, args.concat(slice.call(arguments)));
		};
	}

	/**
	 * Creates a partial function that weaves arguments into returned function
	 * @param f {Function}
	 * @param weaves {Object} sparse array-like object (with length property)
	 *   These weaves are spliced into the run-time arguments.  Each property
	 *   whose is a positive integer describes a point at which to splice
	 *   an argument.
	 * @return {Function}
	 */
	function weave (f, weaves) {
		return function () {
			var length = Math.max(weaves.length || 0, arguments.length, f.length);
			return f.apply(this, injectArgs(weaves, length, arguments));
		};
	}

	/**
	 * @private
	 * @param weaves {Object} sparse array-like object (with length property)
	 * @param length {Number} how long the resulting arguments list should be
	 * @param args {Arguments} run-time arguments
	 * @return {Array} interwoven arguments
	 */
	function injectArgs (weaves, length, args) {
		var woven = [], i;
		args = slice.call(args); // copy
		for (i = 0; i < length; i++) {
			if (i in weaves) {
				woven.push(weaves[i]);
			}
			if (args.length > 0) {
				woven.push(args.shift());
			}
		}
		return woven;
	}

	/**
	 * Compose functions
	 * @param funcs {Array} array of functions to compose
	 * @return {Function} composed function
	 */
	function compose(funcs) {

		var first;
		first = funcs[0];
		funcs = funcs.slice(1);

		return function composed() {
			var context = this;
			return funcs.reduce(function(result, f) {
				return f.call(context, result);
			}, first.apply(this, arguments));
		};
	}

	/**
	 * Parses the function composition string, resolving references as needed, and
	 * composes a function from the resolved refs.
	 * @param proxy {Object} wire proxy on which to invoke the final method of the composition
	 * @param composeString {String} function composition string
	 *  of the form: 'transform1 | transform2 | ... | methodOnProxyTarget"
	 * @param wire.resolveRef {Function} function to use is resolving references, returns a promise
	 * @param wire.getProxy {Function} function used to obtain a proxy for a component
	 * @return {Promise} a promise for the composed function
	 */
	compose.parse = function parseCompose(proxy, composeString, wire) {

		var bindSpecs, resolveRef, getProxy;

		if(typeof composeString != 'string') {
			return wire(composeString, function(func) {
				return createProxyInvoker(proxy, func);
			});
		}

		bindSpecs = composeString.split(/\s*\|\s*/);
		resolveRef = wire.resolveRef;
		getProxy = wire.getProxy;

		function createProxyInvoker(proxy, method) {
			return function() {
				return proxy.invoke(method, arguments);
			};
		}

		function createBound(bindSpec) {
			var target, method;

			target = bindSpec.split('.');

			if(target.length > 2) {
				throw new Error('Only 1 "." is allowed in refs: ' + bindSpec);
			}

			if(target.length > 1) {
				method = target[1];
				target = target[0];
				if(!target) {
					return function(target) {
						return target[method].apply(target, slice.call(arguments, 1));
					};
				}
				return when(getProxy(target), function(proxy) {
					return createProxyInvoker(proxy, method);
				});
			} else {
				return when(resolveRef(bindSpec),
					null,
					function() {
						return createProxyInvoker(proxy, bindSpec);
					}
				);
			}

		}

		// First, resolve each transform function, stuffing it into an array
		// The result of this reduce will an array of concrete functions
		// Then add the final context[method] to the array of funcs and
		// return the composition.
		return when.reduce(bindSpecs, function(funcs, bindSpec) {
			return when(createBound(bindSpec), function(func) {
				funcs.push(func);
				return funcs;
			});
		}, []).then(
			function(funcs) {
				var context = proxy && proxy.target;
				return (funcs.length == 1 ? funcs[0] : compose(funcs)).bind(context);
			}
		);
	};

	return {
		compose: compose,
		partial: partial,
		weave: weave
	};

});
})(typeof define == 'function'
	// AMD
	? define
	// CommonJS
	: function(deps, factory) {
		module.exports = factory.apply(this, deps.map(function(x) {
			return require(x);
		}));
	}
);
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * wire/base plugin
 * Base wire plugin that provides properties, init, and destroy facets, and
 * a proxy for plain JS objects.
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define) {
define('wire/base', ['when/when', 'wire/lib/object', 'wire/lib/functional', 'wire/lib/component', 'wire/lib/invoker'], function (when, object, functional, createComponent, createInvoker) {

	var whenAll, obj, undef;

	whenAll = when.all;
	obj = {};

	function asArray(it) {
		return Array.isArray(it) ? it : [it];
	}

	function invoke(func, proxy, args, wire) {
        return when(wire(args, func, proxy.path),
			function (resolvedArgs) {
				return proxy.invoke(func, asArray(resolvedArgs));
			}
		);
	}

	function invokeAll(facet, wire) {
		var options = facet.options;

		if(typeof options == 'string') {
			return invoke(options, facet, [], wire);

		} else {
			var promises, funcName;
			promises = [];

			for(funcName in options) {
				promises.push(invoke(funcName, facet, options[funcName], wire));
			}

			return whenAll(promises);
		}
	}

	//
	// Mixins
	//

	function mixin(target, src) {
		var name, s;

		for(name in src) {
			s = src[name];
			if(!(name in target) || (target[name] !== s && (!(name in obj) || obj[name] !== s))) {
				target[name] = s;
			}
		}

		return target;
	}

	function doMixin(target, introduction, wire) {
		introduction = typeof introduction == 'string'
			? wire.resolveRef(introduction)
			: wire(introduction);

		return when(introduction, mixin.bind(null, target));
	}

	function mixinFacet(resolver, facet, wire) {
		var target, intros, promise;

		target = facet.target;
		intros = facet.options;

		if(!Array.isArray(intros)) {
			intros = [intros];
		}

		promise = when.reduce(intros, function(target, intro) {
			return doMixin(target, intro, wire);
		}, target);

		resolver.resolve(promise);
	}

    /**
     * Factory that handles cases where you need to create an object literal
     * that has a property whose name would trigger another wire factory.
     * For example, if you need an object literal with a property named "create",
     * which would normally cause wire to try to construct an instance using
     * a constructor or other function, and will probably result in an error,
     * or an unexpected result:
     * myObject: {
     *      create: "foo"
     *    ...
     * }
     *
     * You can use the literal factory to force creation of an object literal:
     * myObject: {
     *    literal: {
     *      create: "foo"
     *    }
     * }
     *
     * which will result in myObject.create == "foo" rather than attempting
     * to create an instance of an AMD module whose id is "foo".
     */
	function literalFactory(resolver, spec /*, wire */) {
		resolver.resolve(spec.literal);
	}

	/**
	 * @deprecated Use create (instanceFactory) instead
	 * @param resolver
	 * @param spec
	 * @param wire
	 */
	function protoFactory(resolver, spec, wire) {
		var parentRef, promise;

        parentRef = spec.prototype;

        promise = typeof parentRef === 'string'
                ? wire.resolveRef(parentRef)
                : wire(parentRef);

        when(promise, Object.create)
			.then(resolver.resolve, resolver.reject);
	}

	function propertiesFacet(resolver, facet, wire) {

		var properties, path, setProperty;

		properties = facet.options;
		path = facet.path;
		setProperty = facet.set.bind(facet);

		when.map(Object.keys(facet.options), function(key) {
			return wire(properties[key], key, facet.path)
				.then(function(wiredProperty) {
					setProperty(key, wiredProperty);
				}
			);
		}).then(resolver.resolve, resolver.reject);

	}

	function invokerFactory(resolver, componentDef, wire) {

		wire(componentDef.invoker).then(function(invokerContext) {
			// It'd be nice to use wire.getProxy() then proxy.invoke()
			// here, but that means the invoker must always return
			// a promise.  Not sure that's best, so for now, just
			// call the method directly
			return createInvoker(invokerContext.method, invokerContext.args);
		}).then(resolver.resolve, resolver.reject);

	}

	function invokerFacet(resolver, facet, wire) {
		resolver.resolve(invokeAll(facet, wire));
	}

	function pojoProxy(object /*, spec */) {
		return {
			get: function(property) {
				return object[property];
			},
			set: function(property, value) {
				object[property] = value;
				return value;
			},
			invoke: function(method, args) {
				if(typeof method === 'string') {
					method = object[method];
				}

				return method.apply(object, args);
			},
			destroy: function() {},
			clone: function(options) {
				// don't try to clone a primitive
				if (typeof object != 'object') {
					return object;
				}
				// cloneThing doesn't clone functions (methods), so clone here:
				else if (typeof object == 'function') {
					return object.bind();
				}

				if (!options) {
					options = {};
				}

				return cloneThing(object, options);
			}
		};
	}

	function cloneThing (thing, options) {
		var deep, inherited, clone, prop;
		deep = options.deep;
		inherited = options.inherited;

		// Note: this filters out primitive properties and methods
		if (typeof thing != 'object') {
			return thing;
		}
		else if (thing instanceof Date) {
			return new Date(thing.getTime());
		}
		else if (thing instanceof RegExp) {
			return new RegExp(thing);
		}
		else if (Array.isArray(thing)) {
			return deep
				? thing.map(function (i) { return cloneThing(i, options); })
				: thing.slice();
		}
		else {
			clone = thing.constructor ? new thing.constructor() : {};
			for (prop in thing) {
				if (inherited || thing.hasOwnProperty(prop)) {
					clone[prop] = deep
						? cloneThing(thing[prop], options)
						: thing[prop];
				}
			}
			return clone;
		}
	}

    //noinspection JSUnusedLocalSymbols
    /**
     * Wrapper for use with when.reduce that calls the supplied destroyFunc
     * @param [unused]
     * @param destroyFunc {Function} destroy function to call
     */
    function destroyReducer(unused, destroyFunc) {
        return destroyFunc();
    }

	function moduleFactory(resolver, spec, wire) {
		resolver.resolve(wire.loadModule(spec.module, spec));
	}

	function cloneFactory(resolver, spec, wire) {
		var sourceRef, options;

		if (wire.resolver.isRef(spec.clone.source)) {
			sourceRef = spec.clone.source;
			options = spec.clone;
		}
		else {
			sourceRef = spec.clone;
			options = {};
		}

		when(wire(sourceRef), function (ref) {
			return when(wire.getProxy(ref), function (proxy) {
				if (!proxy.clone) {
					throw new Error('No clone function found for ' + spec.id);
				}

				return proxy.clone(options);
			});
		}).then(resolver.resolve, resolver.reject);
	}

	/**
	 * Factory that uses an AMD module either directly, or as a
	 * constructor or plain function to create the resulting item.
	 *
	 * @param resolver {Resolver} resolver to resolve with the created component
	 * @param spec {Object} portion of the spec for the component to be created
	 */
	function instanceFactory(resolver, spec, wire) {
		var create, args, isConstructor, name, promise;

		name = spec.id;
		create = spec.create;

		if (typeof create == 'string') {
			promise = wire.loadModule(create, spec);
		} else if(wire.resolver.isRef(create)) {
			promise = wire(create);
		} else {
			promise = wire(create);
			args = create.args;
			isConstructor = create.isConstructor;
		}

		resolver.resolve(when(promise, handleModule));

		// Load the module, and use it to create the object
		function handleModule(module) {
			function resolve(resolvedArgs) {
				return createComponent(module, resolvedArgs, isConstructor);
			}

			// We'll either use the module directly, or we need
			// to instantiate/invoke it.
			if (typeof module == 'function') {
				// Instantiate or invoke it and use the result
				return args
					? when(wire(asArray(args)), resolve)
					: resolve([]);

			} else {
				// Simply use the module as is
				return Object.create(module);
			}
		}
	}

	function composeFactory(resolver, spec, wire) {
		var promise;

		spec = spec.compose;

		if(typeof spec == 'string') {
			promise = functional.compose.parse(undef, spec, wire);
		} else {
			// Assume it's an array of things that will wire to functions
			promise = when(wire(spec), function(funcArray) {
				return functional.compose(funcArray);
			});
		}

		resolver.resolve(promise);
	}

	return {
		wire$plugin: function(ready, destroyed /*, options */) {
            // Components in the current context that will be destroyed
            // when this context is destroyed
			var destroyFuncs, plugin;

			destroyFuncs = [];

			when(destroyed, function() {
                return when.reduce(destroyFuncs, destroyReducer, 0);
			});

			function destroyFacet(resolver, facet, wire) {
				destroyFuncs.push(function destroyObject() {
					return invokeAll(facet, wire);
				});

				// This resolver is just related to *collecting* the functions to
				// invoke when the component is destroyed.
				resolver.resolve();
			}

			plugin = {
				factories: {
					module: moduleFactory,
					create: instanceFactory,
					literal: literalFactory,
					prototype: protoFactory,
					clone: cloneFactory,
					compose: composeFactory,
					invoker: invokerFactory
				},
				facets: {
					// properties facet.  Sets properties on components
					// after creation.
					properties: {
						configure: propertiesFacet
					},
					mixin: {
						configure: mixinFacet
					},
					// init facet.  Invokes methods on components during
					// the "init" stage.
					init: {
						initialize: invokerFacet
					},
					// ready facet.  Invokes methods on components during
					// the "ready" stage.
					ready: {
						ready: invokerFacet
					},
					// destroy facet.  Registers methods to be invoked
					// on components when the enclosing context is destroyed
					destroy: {
						ready: destroyFacet
					}
				},
				proxies: [
					pojoProxy
				]
			};

			// "introduce" is deprecated, but preserved here for now.
			plugin.facets.introduce = plugin.facets.mixin;

			return plugin;
		}
	};
});
})(typeof define == 'function'
	? define
	: function(deps, factory) {
		module.exports = factory.apply(this, deps.map(function(x) {
			return require(x);
		}));
	}
);
/** @license MIT License (c) copyright B Cavalier & J Hann */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(define){
define('wire/lib/context', ['require', 'when/when', 'wire/lib/array', 'wire/lib/object', 'wire/lib/async', 'wire/lib/moduleLoader', 'wire/lib/lifecycle', 'wire/lib/resolver', 'wire/base'], function (require, when, array, object, async, createModuleLoader, Lifecycle, Resolver, basePlugin) {

	"use strict";

	var defer, emptyObject, undef;

	// Local refs to when.js
	defer = when.defer;
	emptyObject = {};

	function WireContext() {}

	/**
	 * Creates a new context from the supplied specs, with the supplied parent context.
	 * If specs is an {Array}, it may be a mixed array of string module ids, and object
	 * literal specs.  All spec module ids will be loaded, and then all specs will be
	 * merged from left-to-right (rightmost wins), and the resulting, merged spec will
	 * be wired.
	 *
	 * @private
	 *
	 * @param specs {String|Array|*}
	 * @param parent {Object} parent content
	 * @param options {Object}
	 *
	 * @return {Promise} a promise for the new context
	 */
	function createContext(specs, parent, options) {
		// Do the actual wiring after all specs have been loaded
		function doWireContext(spec) {
			return createScope(spec, parent, options);
		}

		var moduleLoader = getModuleLoader(parent, options);

		return when(specs, function(specs) {
			return Array.isArray(specs)
				? when(ensureAllSpecsLoaded(specs, moduleLoader), doWireContext)
				: when(isString(specs) ? moduleLoader(specs) : specs, doWireContext);
		});
	}

	return createContext;

	/**
	 * Do the work of creating a new scope and fully wiring its contents
	 * @private
	 *
	 * @param scopeDef {Object} The spec (or portion of a spec) to be wired into a new scope
	 * @param parent {scope} scope to use as the parent, and thus from which to inherit
	 *  plugins, components, etc.
	 * @param [options] {Object} scope options
	 *
	 * @return {Promise} a promise for the new scope
	 */
	function createScope(scopeDef, parent, options) {
		var scope, scopeParent, context, config, contextHandlers,
			proxiedComponents, components, lifecycle, resolver, inflightRefs,
			pluginApi, resolvers, factories, facets, listeners, proxiers,
			moduleLoader, modulesToLoad, plugins,
			wireApi, modulesReady, scopeReady, scopeDestroyed, doDestroy;

		inflightRefs = [];

		// Empty parent scope if none provided
		if(!parent) { parent = {}; }
		if(!options) { options = {}; }

		inheritFromParent(parent, options);
		createPluginApi();

		// TODO: Find a better way to load and scan the base plugin
		scanPlugin(basePlugin);

		configureContext(options);
		pluginApi.resolver = resolver;

		// Setup overwritable doDestroy so that this context
		// can only be destroyed once
		doDestroy = function () {
			// Retain a do-nothing doDestroy() func, in case
			// it is called again for some reason.
			doDestroy = function () {
			};

			return when(destroyContext(), executeDestroyers);
		};

		context = {
			spec: scopeDef,
			components: components,
			config: config
		};

		function executeInitializers() {
			return async.sequence(contextHandlers.init, context);
		}
		function executeDestroyers() {
			return async.sequence(contextHandlers.destroy, context);
		}

		return executeInitializers()
			.then(function() {

				var componentsToCreate = parseSpec(scopeDef, scopeReady);

				createComponents(componentsToCreate, scopeDef);

				// Once all modules are loaded, all the components can finish
				ensureAllModulesLoaded();

				// Return promise
				// Context will be ready when this promise resolves
				return scopeReady.promise;
			});

		//
		// Initialization
		//

		function inheritFromParent(parent, options) {
			// Descend scope and plugins from parent so that this scope can
			// use them directly via the prototype chain

			WireContext.prototype = createWireApi(object.inherit(parent.components));
			components = new WireContext();
			WireContext.prototype = undef;

			resolvers = object.inherit(parent.resolvers);
			factories = object.inherit(parent.factories);
			facets = object.inherit(parent.facets);

			// Set/override integral resolvers and factories
			resolvers.wire = wireResolver;
			factories.wire = wireFactory;

			listeners = array.delegate(parent.listeners);

			// Proxies is an array, have to concat
			proxiers = array.delegate(parent.proxiers);
			proxiedComponents = [];

			plugins = [];
			modulesToLoad = [];
			modulesReady = defer();

			scopeReady = defer();
			scopeDestroyed = defer();

			moduleLoader = getModuleLoader(parent, options);

			// A proxy of this scope that can be used as a parent to
			// any child scopes that may be created.
			scopeParent = {
				moduleLoader: moduleLoader,
				components: components,
				destroyed: scopeDestroyed.promise
			};

			// Full scope definition.  This will be given to sub-scopes,
			// but should never be given to child contexts
			scope = Object.create(scopeParent);

			scope.resolvers = resolvers;
			scope.factories = factories;
			scope.facets = facets;
			scope.listeners = listeners;
			scope.proxiers = proxiers;
			scope.resolveRef = resolveRefName;
			scope.destroy = destroy;
			scope.path = createPath(options.name, parent.path);

			// When the parent begins its destroy phase, this child must
			// begin its destroy phase and complete it before the parent.
			// The context hierarchy will be destroyed from child to parent.
			if (parent.destroyed) {
				when(parent.destroyed, destroy);
			}
		}

		function createWireApi(context) {
			wireApi = context.wire = wireChild;
			wireApi.destroy = context.destroy = apiDestroy;

			// Consider deprecating resolve
			// Any reference you could resolve using this should simply be
			// injected instead.
			wireApi.resolve = context.resolve = apiResolveRef;

			return context;
		}

		function createPluginApi() {
			// Plugin API
			// wire() API that is passed to plugins.
			pluginApi = function (spec, name, path) {
				return createItem(spec, createPath(name, path));
			};

			pluginApi.resolveRef = apiResolveRef;
			pluginApi.getProxy = getProxy;
			pluginApi.loadModule = getModule;
		}

		function configureContext(options) {
			// TODO: This configuration object needs to be abstracted and reused
			config = {
				pluginApi: pluginApi,
				resolvers: resolvers,
				facets: facets,
				listeners: listeners
			};

			lifecycle = new Lifecycle(config);
			resolver = new Resolver(config);

			contextHandlers = {
				init: array.delegate(options.init),
				destroy: array.delegate(options.destroy)
			};
		}

		function parseSpec(scopeDef, scopeReady) {
			var promises, componentsToCreate, d;

			promises = [];
			componentsToCreate = {};

			// Setup a promise for each item in this scope
			for (var name in scopeDef) {
				// An initializer may have inserted concrete components
				// into the context.  If so, they override components of the
				// same name from the input spec
				if(!(components.hasOwnProperty(name))) {
					// Hack for 0.9.x + when 2.0 compat only. To be removed in 0.10.0
					d = defer();
					componentsToCreate[name] = d.resolver;
					components[name] = d.promise;
					promises.push(d.promise);
				}
			}

			// When all scope item promises are resolved, the scope
			// is ready. When this scope is ready, resolve the promise
			// with the objects that were created
			when.all(promises).then(
				function() {
					scopeReady.resolve(components);
				},
				scopeReady.reject
			);

			return componentsToCreate;
		}

		//
		// Context Startup
		//

		function createComponents(componentsToCreate, spec) {
			// Process/create each item in scope and resolve its
			// promise when completed.
			for (var name in componentsToCreate) {
				createScopeItem(name, spec[name], componentsToCreate[name]);
			}
		}

		function ensureAllModulesLoaded() {
			async.until(waitForModules, 0, allModulesLoaded).then(
				function() { modulesReady.resolve(); },
				function() { modulesReady.reject(); }
			);

			function waitForModules() {
				var modules = modulesToLoad;
				modulesToLoad = [];

				return when.all(modules);
			}

			function allModulesLoaded() {
				return modulesToLoad.length === 0;
			}
		}

		//
		// Context Destroy
		//

		function destroyContext() {
			var shutdown;

			scopeDestroyed.resolve();

			// TODO: Clear out the context prototypes?

			shutdown = when.reduce(proxiedComponents, function(unused, proxied) {
				return lifecycle.shutdown(proxied);
			}, undef);

			return when(shutdown, function () {
				function deleteAll(container) {
					for(var p in container) {
						delete container[p];
					}
				}

				deleteAll(components);
				deleteAll(scope);

				return when.reduce(proxiedComponents, function(p, proxied) {
					when(p, function() {
						proxied.destroy();
					});
				}, undef)
				.then(function() {
					// Free Objects
					components = scope = parent
						= resolvers = factories = facets = listeners
						= wireApi = proxiedComponents = proxiers = plugins
						= undef;

					return scopeDestroyed.promise;

				});

			});
		}

		//
		// Context API
		//

		// API of a wired context that is returned, via promise, to
		// the caller.  It will also have properties for all the
		// objects that were created in this scope.

		/**
		 * Resolves a reference in the current context, using any reference resolvers
		 * available in the current context
		 *
		 * @param ref {String} reference name (may contain resolver prefix, e.g. "resolver!refname"
		 */
		function apiResolveRef(ref, onBehalfOf) {
			return when(resolveRefName(ref, {}, onBehalfOf));
		}

		/**
		 * Destroys the current context
		 */
		function apiDestroy() {
			return destroy();
		}

		/**
		 * Wires a child spec with this context as its parent
		 * @param spec
		 */
		function wireChild(spec, options) {
			return createContext(spec, scopeParent, options);
		}

		//
		// Scope functions
		//

		function createPath(name, basePath) {
			var path = basePath || scope.path;

			return (path && name) ? (path + '.' + name) : name;
		}

		function createScopeItem(name, val, resolver) {
			// NOTE: Order is important here.
			// The object & local property assignment MUST happen before
			// the chain resolves so that the concrete item is in place.
			// Otherwise, the whole scope can be marked as resolved before
			// the final item has been resolved.
			var p = createItem(val, name);

			return when(p, function (resolved) {
				makeResolvable(name, resolved);
				resolver.resolve(resolved);
			}, resolver.reject);
		}

		/**
		 * Make a component resolvable under the given name
		 * @param name {String} name by which to allow the component to be resolved
		 * @param component {*} component
		 */
		function makeResolvable(name, component) {
			components[name] = getResolvedValue(component);
		}

		function createItem(val, name) {
			var created;

			if (resolver.isRef(val)) {
				// Reference
				created = resolveRef(val, name);

			} else if (Array.isArray(val)) {
				// Array
				created = createArray(val, name);

			} else if (object.isObject(val)) {
				// component spec, create the component
				created = realizeComponent(val, name);

			} else {
				// Plain value
				created = when.resolve(val);
			}

			return created;
		}

		function getModule(moduleId, spec) {
			var module = defer();

			scanPluginWhenLoaded(typeof moduleId == 'string'
				? moduleLoader(moduleId)
				: moduleId, module.resolver);

			return module.promise;

			function scanPluginWhenLoaded(loadModulePromise, moduleReadyResolver) {

				var loadPromise = when(loadModulePromise, function (module) {
					return when(scanPlugin(module, spec), function() {
						modulesReady.promise.then(function() {
							return module;
						}).then(moduleReadyResolver.resolve, moduleReadyResolver.reject);
					}, moduleReadyResolver.reject);
				}, moduleReadyResolver.reject);

				modulesToLoad && modulesToLoad.push(loadPromise);

			}
		}

		function scanPlugin(module, spec) {
			if (module && isFunction(module.wire$plugin) && plugins.indexOf(module.wire$plugin) === -1) {
				// Add to singleton plugins list to only allow one instance
				// of this plugin in the current context.
				plugins.push(module.wire$plugin);

				// Initialize the plugin for this context
				return when(module.wire$plugin(scopeReady.promise, scopeDestroyed.promise, spec),
					function(plugin) {
						plugin && registerPlugin(plugin);
						return module;
					}
				);
			}

			return module;
		}

		function registerPlugin(plugin) {
			addPlugin(plugin.resolvers, resolvers);
			addPlugin(plugin.factories, factories);
			addPlugin(plugin.facets, facets);

			listeners.push(plugin);

			addProxies(plugin.proxies);
		}

		function addProxies(proxiesToAdd) {
			if (!proxiesToAdd) { return; }

			var newProxiers, p, i = 0;

			newProxiers = [];
			while (p = proxiesToAdd[i++]) {
				if (proxiers.indexOf(p) < 0) {
					newProxiers.push(p);
				}
			}

			scope.proxiers = proxiers = newProxiers.concat(proxiers);
		}

		function addPlugin(src, registry) {
			var name;
			for (name in src) {
				if (registry.hasOwnProperty(name)) {
					throw new Error("Two plugins for same type in scope: " + name);
				}

				registry[name] = src[name];
			}
		}

		function createArray(arrayDef, name) {
			// Minor optimization, if it's an empty array spec, just return
			// an empty array.
			return arrayDef.length
				? when.map(arrayDef, function(item) {
					return createItem(item, name + '[]');
				})
				: [];
		}

		/**
		 * Fully realize a component from a spec: create, initialize, then
		 * startup.
		 * @param spec {Object} component spec
		 * @param name {String} component name
		 * @return {Promise} promise for the fully realized component
		 */
		function realizeComponent(spec, name) {

			// Look for a factory, then use it to create the object
			return when(findFactory(spec),
				function (factory) {
					var component = defer();

					if (!spec.id) {
						spec.id = name;
					}

					factory(component.resolver, spec, pluginApi);

					return processComponent(component.promise, spec, name);
				},
				function () {
					// No factory found, treat object spec as a nested scope
					return createScope(spec, scope, { name: name }).then(function(context) {
						return safeMixin({}, context);
					});
				}
			);
		}

		/**
		 * Move component through all phases of the component lifecycle up
		 * to ready.
		 * @param component {*} component or promise for a component
		 * @param spec {Object} component spec
		 * @param name {String} component name
		 * @return {Promise} promise for the component in the ready state
		 */
		function processComponent(component, spec, name) {
			return when(component, function(component) {

				return when(createProxy(component, spec), function(proxy) {
					return lifecycle.init(proxy);

				}).then(function(proxy) {
					// Components become resolvable after the initialization phase
					// This allows circular references to be resolved after init
					makeResolvable(name, proxy.target);
					return lifecycle.startup(proxy);

				}).then(function(proxy) {
					return proxy.target;

				});
			});
		}

		/**
		 * Select the factory plugin to use to create a component
		 * for the supplied component spec
		 * @param spec {Object} component spec
		 * @return {Promise} promise for factory, rejected if no suitable
		 *  factory can be found
		 */
		function findFactory(spec) {

			// FUTURE: Should not have to wait for all modules to load,
			// but rather only the module containing the particular
			// factory we need.  But how to know which factory before
			// they are all loaded?
			// Maybe need a special syntax for factories, something like:
			// create: "factory!whatever-arg-the-factory-takes"
			// args: [factory args here]

			function getFactory() {
				var f, factory;

				for (f in factories) {
					if (spec.hasOwnProperty(f)) {
						factory = factories[f];
						break;
					}
				}

				// Intentionally returns undefined if no factory found
				return factory;
			}

			return getFactory() || when(modulesReady.promise, function () {
				return getFactory() || when.reject(spec);
			});
		}

		function createProxy(object, spec) {
			return when(modulesReady.promise, function() {
				var proxier, proxy, id, i;

				i = 0;

				while ((proxier = proxiers[i++]) && !(proxy = proxier(object, spec))) {}

				proxy.target = object;
				proxy.spec = spec;

				if(spec) {
					id = spec && spec.id;
					proxy.id = id;
					proxy.path = createPath(id);
					proxiedComponents.push(proxy);
				}

				return proxy;
			});
		}

		/**
		 * Return a proxy for the component name, or concrete component
		 * @param nameOrComponent {String|*} if it's a string, consider it to be a component name
		 *  otherwise, consider it to be a concrete component
		 * @return {Object|Promise} proxy or promise for proxy of the component
		 */
		function getProxy(nameOrComponent, onBehalfOf) {
			return typeof nameOrComponent != 'string'
				? createProxy(nameOrComponent)
				: when(resolveRefName(nameOrComponent, {}, onBehalfOf), function(component) {
					return createProxy(component);
				});
		}

		//
		// Destroy
		//

		/**
		 * Destroy the current context.  Waits for the context to finish
		 * wiring and then immediately destroys it.
		 *
		 * @return {Promise} a promise that will resolve once the context
		 * has been destroyed
		 */
		function destroy() {
			return when(scopeReady.promise, doDestroy, doDestroy);
		}

		//
		// Reference resolution
		//

		/**
		 * Resolves the supplied ref as a local component name, or delegates
		 * to registered resolver plugins
		 * @param ref {Object} reference object returned by resolver.parse or resolver.create
		 * @param scope {Object} scope for resolving local component names
		 * @param [onBehalfOf] {*} optional indicator of the party requesting the reference
		 * @return {Promise} a promise for the fully resolved reference value
		 */
		function doResolveRef(ref, scope, onBehalfOf) {
			return ref.resolver
				? when(modulesReady.promise, ref.resolve)
				: doResolveDeepRef(ref.name, scope);
		}

		/**
		 * Resolves a component references, traversing one level of "." nesting
		 * if necessarily (e.g. "thing.property")
		 * @param name {String} component name or dot-separated path
		 * @param scope {Object} scope in which to resolve the reference
		 * @return {Promise} promise for the referenced component or property
		 */
		function doResolveDeepRef(name, scope) {
			var parts = name.split('.');

			if(parts.length > 2) {
				return when.reject('Only 1 "." is allowed in refs: ' + name);
			}

			return when.reduce(parts, function(scope, segment) {
				return segment in scope
					? scope[segment]
					: when.reject('Cannot resolve ref: ' + name);
			}, scope);
		}

		/**
		 * @param ref {*} any reference format supported by the registered resolver
		 * @param name {String} component name to which the the resolved value of the reference
		 *  will eventually be assigned.  Used to avoid self-circular references.
		 * @return {Promise} a promise for the fully resolved reference value
		 */
		function resolveRef(ref, name) {
			var scope;

			ref = resolver.parse(ref);
			scope = name == ref.name && parent.components ? parent.components : components;

			return doResolveRef(ref, scope, name);
		}

		/**
		 *
		 * @param refName {String} name of reference to resolve. Can be either a
		 *  component name, or a plugin-style reference, e.g. plugin!reference
		 * @param [options] {Object} additional options to pass to reference resolver
		 *  plugins if the refName requires a plugin to resolve
		 * @param [onBehalfOf] {*} optional indicator of the party requesting the reference
		 * @return {Promise} a promise for the fully resolved reference value
		 */
		function resolveRefName(refName, options, onBehalfOf) {
			return doResolveRef(resolver.create(refName, options), components, onBehalfOf);
		}

		/**
		 * Builtin reference resolver that resolves to the context-specific
		 * wire function.
		 *
		 * @param resolver {Resolver} resolver to resolve
		 */
		function wireResolver(resolver /*, name, refObj, wire*/) {
			resolver.resolve(wireApi);
		}

		//
		// Built-in Factories
		//

		/**
		 * Factory that creates either a child context, or a *function* that will create
		 * that child context.  In the case that a child is created, this factory returns
		 * a promise that will resolve when the child has completed wiring.
		 *
		 * @param resolver {Resolver} resolver to resolve with the created component
		 * @param spec {Object} portion of the spec for the component to be created
		 */
		function wireFactory(resolver, spec, wire) {
			//
			// TODO: Move wireFactory to its own module
			//
			var options, module, provide, defer, waitParent;

			options = spec.wire;

			// Get child spec and options
			if (isString(options)) {
				module = options;
			} else {
				module = options.spec;
				waitParent = options.waitParent;
				defer = options.defer;
				provide = options.provide;
			}

			function init(context) {
				if(provide) {
					return when(wire(provide), function(provides) {
						safeMixin(context.components, provides);
					});
				}
			}

			function createChild(/** {Object|String}? */ mixin) {
				var spec, config;

				spec = mixin ? [].concat(module, mixin) : module;
				config = { init: init };

				var child = wireChild(spec, config);
				return defer ? child
					: when(child, function(child) {
						return child.hasOwnProperty('$exports') ? child.$exports : child;
					});
			}

			if (defer) {
				// Resolve with the createChild *function* itself
				// which can be used later to wire the spec
				resolver.resolve(createChild);

			} else if(waitParent) {

				var childPromise = when(scopeReady, function() {
					// ensure nothing is passed to createChild here
					return createChild();
				});

				resolver.resolve(new ResolvedValue(childPromise));

			} else {
				resolver.resolve(createChild(spec));

			}
		}

	} // createScope

	function getModuleLoader(context, options) {
		return options && options.require
			? createModuleLoader(options.require)
			: context.moduleLoader;
	}

	/**
	 * Given a mixed array of strings and non-strings, returns a promise that will resolve
	 * to an array containing resolved modules by loading all the strings found in the
	 * specs array as module ids
	 * @private
	 *
	 * @param specs {Array} mixed array of strings and non-strings
	 *
	 * @returns {Promise} a promise that resolves to an array of resolved modules
	 */
	function ensureAllSpecsLoaded(specs, loadModule) {
		return when.reduce(specs, function(merged, module) {
			return isString(module)
				? when(loadModule(module), function(spec) { return safeMixin(merged, spec); })
				: safeMixin(merged, module);
		}, {});
	}

	/**
	 * Add components in from to those in to.  If duplicates are found, it
	 * is an error.
	 * @param to {Object} target object
	 * @param from {Object} source object
	 */
	function safeMixin(to, from) {
		for (var name in from) {
			if (from.hasOwnProperty(name) && !(name in emptyObject)) {
				if (to.hasOwnProperty(name)) {
					throw new Error("Duplicate component name in sibling specs: " + name);
				} else {
					to[name] = from[name];
				}
			}
		}

		return to;
	}

	function isString(it) {
		return typeof it == 'string';
	}

	/**
	 * Standard function test
	 * @param it
	 */
	function isFunction(it) {
		return typeof it == 'function';
	}

	/**
	 * Special object to hold a Promise that should not be resolved, but
	 * rather should be passed through a promise chain *as the resolution value*
	 * @param val
	 */
	function ResolvedValue(val) {
		this.value = val;
	}

	/**
	 * If it is a PromiseKeeper, return it.value, otherwise return it.  See
	 * PromiseKeeper above for an explanation.
	 * @param it anything
	 */
	function getResolvedValue(it) {
		return it instanceof ResolvedValue ? it.value : it;
	}


	// TODO: Start using this after compatible curl release
	// TODO: Move to somewhere more logical and modular, like lib/resolver.js
});
})(typeof define == 'function'
	// AMD
	? define
	// CommonJS
	: function(deps, factory) {
		module.exports = factory.apply(this, [require].concat(deps.slice(1).map(function(x) {
			return require(x);
		})));
	}
);
/** @license MIT License (c) copyright B Cavalier & J Hann */

/*jshint sub:true*/

/**
 * wire
 * Javascript IOC Container
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 0.9.4
 */
(function(global, define){
define('wire/wire', ['require', 'when/when', 'wire/lib/context'], function (require, when, createContext) {

	"use strict";

	var rootSpec, rootContext, rootOptions;

	wire.version = "0.9.4";

	rootSpec = global['wire'] || {};
	rootOptions = { require: require };

	//
	// Module API
	//

	/**
	 * The top-level wire function that wires contexts as direct children
	 * of the (possibly implicit) root context.  It ensures that the root
	 * context has been wired before wiring children.
	 *
	 * @public
	 *
	 * @param spec {Object|String|Array|Promise} can be any one of the following:
	 *  1. Object - wiring spec
	 *  2. String - module id of the wiring spec to load and then wire
	 *  3. Array - mixed array of Strings and Objects, each of which is either
	 *   a wiring spec, or the module id of a wiring spec
	 *  4. Promise - a promise for any of the above
	 *  @param options {Object} wiring options
	 *  @param [options.require] {Function} the platform loader function.  Wire will
	 *   attempt to automatically detect what loader to use (AMD, CommonJS, etc.), but
	 *   if you want to explicitly provide it, you can do so.  In some cases this can
	 *   be useful such as providing a local AMD require function so that module ids
	 *   *within the wiring spec* can be relative.
	 *  @return {Promise} a promise for the resulting wired context
	 */
	function wire(spec, options) {

		// If the root context is not yet wired, wire it first
		if (!rootContext) {
			rootContext = createContext(rootSpec, null, rootOptions);
		}

		// Use the rootContext to wire all new contexts.
		return when(rootContext,
			function (root) {
				return root.wire(spec, options);
			}
		);
	}

	/**
	 * AMD Loader plugin API
	 * @param name {String} spec module id, or comma-separated list of module ids
	 * @param require {Function} loader-provide local require function
	 * @param callback {Function} callback to call when wiring is completed. May have
	 *  and error property that a function to call to inform the AMD loader of an error.
	 *  See here: https://groups.google.com/forum/?fromgroups#!topic/amd-implement/u0f161drdJA
	 */
	wire.load = function amdLoad(name, require, callback /*, config */) {
		// If it's a string, try to split on ',' since it could be a comma-separated
		// list of spec module ids
		var errback = callback.error || function(e) {
			// Throw uncatchable exception for loaders that don't support
			// AMD error handling.  This will propagate up to the host environment
			setTimeout(function() { throw e; }, 0);
		};

		when(wire(name.split(','), { require: require }), callback, errback);
	};

	/**
	 * AMD Builder plugin API
	 */
	// pluginBuilder: './build/amd/builder'
	// cram > v0.2 will support pluginBuilder property
	wire['pluginBuilder'] = './build/amd/builder';

	return wire;

});
})(this,
	typeof define == 'function'
	// AMD
	? define
	// CommonJS
	: function(deps, factory) {
		module.exports = factory.apply(this, [require].concat(deps.slice(1).map(function(x) {
			return require(x);
		})));
	}
);

;
