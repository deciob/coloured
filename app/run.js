(function(curl) {
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
    packages: [
      {
        name: "colours",
        location: "app/colours"
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
      }
    ],
    locale: false,
    preloads: ["poly/all"]
  };
  return curl(config, ["wire!app/main"]).then(success, fail);
})(curl);
