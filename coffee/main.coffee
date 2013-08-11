define
  
  # Load a basic theme. This is just a CSS file, and since a moduleLoader is
  # configured in run.js, curl knows to load this as CSS.
  theme: 
    module: 'theme/basic.css'

  coloursConf:
    module: "app/colours/colours_config"

  defaultLanguage: "english"

  navigation:
    render:
      template:
        module: "text!navigation/navigation_template.html"
    insert:
      at: "dom.first!header"

  navigationController:
    create: 
      module: 'app/navigation/navigation_controller'
      args:
        defaultLanguage: $ref: "defaultLanguage"
    on:
      navigation: 
        'click:div.nav': 'navigate'
    ready: "setCurrentLanguage"
    before:
      setCurrentLanguage: 'audioController.resetAudio'
    after:
      setCurrentLanguage: 'audioController.setCurrentLanguage'

  # It simply returns an HTML5 new Audio instance
  audioConstructurEnglish:
    create:
      module: 'app/utils/audio_constructor'
      args:
        language: "english"
        conf: $ref: "coloursConf"

  audioConstructurSpanish:
    create:
      module: 'app/utils/audio_constructor'
      args:
        language: "spanish"
        conf: $ref: "coloursConf"

  audioConstructurItalian:
    create:
      module: 'app/utils/audio_constructor'
      args:
        language: "italian"
        conf: $ref: "coloursConf"

  audioController:
    create: 
      module: 'app/utils/audio_controller'
      args:
        defaultLanguage: $ref: "defaultLanguage"
        audio:
          english: $ref: "audioConstructurEnglish"
          spanish: $ref: "audioConstructurSpanish"
          italian: $ref: "audioConstructurItalian"
        conf: 
          $ref: "coloursConf"
    #init: "setCurrentLanguage"

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
        #replace: 
        #  module: 'i18n!colours/strings'
      css:
        module: "css!colours/colours_structure.css"

    insert:
      at: "dom.first!section"

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
  ,
    module: 'wire/aop'
  ]
