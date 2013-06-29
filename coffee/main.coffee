define
  
  # Load a basic theme. This is just a CSS file, and since a moduleLoader is
  # configured in run.js, curl knows to load this as CSS.
  #theme:
  #  module: "theme/basic.css"

  controller:
    create: 'app/colours/colours_controller',
    #properties: {
    #  node: { $ref: 'first!span', at: 'view' }
    #},
    on:
      colours: 
        #'click:div.box': 'play'
        'touchstart:div.box': 'play'

  
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
