((curl) ->
  
  # baseUrl: '',
  #paths: {
  # Configure paths here
  #},
  
  # Define application-level packages
  
  # Define a theme package, and configure it to always use the css module
  # loader. No need to use AMD 'css!' plugin to load things in this package, 
  # it will happen automatigally.
  # WARNING: The moduleLoader config syntax will be changing in an upcoming 
  # version of curl.
  
  # Add third-party packages here
  
  # Turn off i18n locale sniffing. Change or remove this line if you want
  # to test specific locales or try automatic locale-sniffing.
  
  # Polyfill everything ES5-ish
  
  # Or, select individual polyfills if you prefer
  #preloads: ['poly/array', 'poly/function', 'poly/json', 'poly/object', 
  #  'poly/string', 'poly/xhr']
  
  # Success! curl.js indicates that your app loaded successfully!
  success = ->
    msg = undefined
    # When using wire, the success callback is typically not needed since
    # wire will compose and initialize the app from the main spec.
    # However, this callback can be useful for executing startup tasks
    # you don't want inside of a wire spec, such as this:
    msg = "Looking good!"
    console.log msg
  
  # Oops. curl.js indicates that your app failed to load correctly.
  fail = (ex) ->
    el = undefined
    msg = undefined
    # There are many ways to handle errors. This is just a simple example.
    # Note: you cannot rely on any specific library or shim to be
    # loaded at this point.  Therefore, you must use standard DOM
    # manipulation and legacy IE equivalents.
    console.log "an error happened during loading :'("
    console.log ex.message
    console.log ex.stack  if ex.stack
    el = document.getElementById("errout")
    msg = "An error occurred while loading: " + 
      ex.message + ". See the console for more information."
    if el
      # inject the error message
      if "textContent" of el
        el.textContent = msg
      else
        el.innerText = msg
      # clear styling that may be hiding the error message
      el.style.display = ""
      document.documentElement.className = ""
    else
      throw msg
      
  config =
    packages: [
      name: "colours"
      location: "app/colours"
    ,
    #  name: "theme"
    #  location: "theme"
    #  config:
    #    moduleLoader: "curl/plugin/css"
    #,
      name: "curl"
      location: "lib/curl/src/curl"
    ,
      name: "wire"
      location: "lib/wire"
      main: "wire"
    ,
      name: "cola"
      location: "lib/cola"
      main: "cola"
    ,
      name: "when"
      location: "lib/when"
      main: "when"
    ,
      name: "meld"
      location: "lib/meld"
      main: "meld"
    #,
    #  name: "poly"
    #  location: "lib/poly"
    ]
    locale: false
    #preloads: ["poly/all"]

  curl(config, ["wire!app/main"]).then success, fail
) curl