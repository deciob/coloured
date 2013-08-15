define
  
  # Load a basic theme. This is just a CSS file, and since a moduleLoader is
  # configured in run.js, curl knows to load this as CSS.
  theme: 
    module: 'theme/basic.css'

  navigationConf:
    module: "app/navigation/navigation_config"

  coloursConf:
    module: "app/colours/colours_config"

  defaultLanguage: "italian"

  audioConstructurNavigation:
    create:
      module: 'app/utils/audio_constructor'
      args:
        language: "all"
        conf: $ref: "navigationConf"

  navigation:
    render:
      template:
        module: "text!navigation/navigation_template.html"
    insert:
      at: "dom.first!header"



  navigationGetCurrentSprite:
    module: 'app/navigation/navigation_get_current_sprite'

  navigationGetAudioObject:
    module: 'app/navigation/navigation_get_audio_object'

  coloursGetCurrentSprite:
    module: 'app/colours/colours_get_current_sprite'

  coloursGetAudioObject:
    module: 'app/colours/colours_get_audio_object'


  navigationAudioController:
    create: 
      module: 'app/utils/audio_controller'
      args:
        audio: $ref: "audioConstructurNavigation"
        conf: 
          $ref: "navigationConf"
    properties: 
      getCurrentSprite: $ref: "navigationGetCurrentSprite"
      getAudioObject: $ref: "navigationGetAudioObject"
    after:
      setCurrentLanguage: 'audioController.setCurrentLanguage'


  navigationController:
    create: 
      module: 'app/navigation/navigation_controller'
    properties: 
      defaultLanguage: $ref: "defaultLanguage"
      el: $ref: "navigation"
    ready:
      initNavigation: []
      setCurrentLanguage: []
    before:
      setCurrentLanguage: 'audioController.resetAudio'
      setCurrentLanguage: 'navigationAudioController.resetAudio'
    after:
      #setCurrentLanguage: 'audioController.setCurrentLanguage'
      setCurrentLanguage: 'navigationAudioController.setCurrentLanguage'
      navigate: 'navigationAudioController.play'
      #setNavigationAudio: 'navigationAudioController.setCurrentLanguage'
      #setCurrentLanguage: 'navigationAudioController.setCurrentLanguage'
    

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
        audio:
          english: $ref: "audioConstructurEnglish"
          spanish: $ref: "audioConstructurSpanish"
          italian: $ref: "audioConstructurItalian"
        conf: 
          $ref: "coloursConf"
    #after:
    #  setCurrentLanguage: 'navigationAudioController.setCurrentLanguage'
    #mixin: $ref: "coloursGetCurrentSprite"
    properties: 
      getCurrentSprite: $ref: "coloursGetCurrentSprite"
      getAudioObject: $ref: "coloursGetAudioObject"

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
