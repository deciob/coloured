define
  
  # Load a basic theme. This is just a CSS file, and since a moduleLoader is
  # configured in run.js, curl knows to load this as CSS.
  theme: 
    module: 'theme/basic.css'

  controller:
    create: 
      module: 'app/colours/audio_controller'
      args:
        audioFile: "app/colours/audio/colours.ogg"
        spriteMap:
          red:
            start: 0.6
            length: 1.1
          orange:
            start: 2.3
            length: 1.1
          green:
            start: 4.1
            length: 1.1
          purple:
            start: 6.1
            length: 1.1
          blue:
            start: 8.3
            length: 1.1
          yellow:
            start: 10.3
            length: 1.2

    properties:
      audioSprite: {$ref: 'dom.first!audio', at: 'colours'}
    #init:
    #  init: ["I am an init function argument"]
    on:
      colours: 
        'click:div.box': 'play'
        #'touchstart:div.box': 'play'

  
  # Create a simple view by rendering html, replacing some i18n strings
  # and loading CSS.  Then, insert into the DOM
  colours:
    render:
      template:
        module: "text!colours/colours_template.html"
      css:
        module: "css!colours/colours_structure.css"

    insert:
      at: "dom.first!body"

    #on:
    #  # Whenever the user clicks a link or a <button>
    #  # within domNode, call component1.doSomething
    #  'click:div.box': 'component1.doSomething'

  
  # Wire.js plugins
  plugins: [
    module: "wire/dom"
    classes:
      init: "loading"
  ,
    module: "wire/dom/render"
  ,
    module: "wire/on"
  ]
