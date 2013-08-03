define({
  theme: {
    module: 'theme/basic.css'
  },
  navigation: {
    render: {
      template: {
        module: "text!navigation/navigation_template.html"
      }
    },
    insert: {
      at: "dom.first!header"
    }
  },
  coloursConf: {
    module: "app/colours/colours_config"
  },
  navigationController: {
    create: {
      module: 'app/navigation/navigation_controller'
    },
    on: {
      navigation: {
        'click:div.nav': 'navigate'
      }
    }
  },
  audioConstructur: {
    create: {
      module: 'app/utils/audio_constructor',
      args: {
        audioFile: {
          $ref: "coloursConf.audioFile"
        }
      }
    }
  },
  audioController: {
    create: {
      module: 'app/utils/audio_controller',
      args: {
        audio: {
          $ref: "audioConstructur"
        },
        spriteMap: {
          $ref: "coloursConf.spriteMap"
        }
      }
    },
    on: {
      colours: {
        'click:div.box': 'play'
      }
    }
  },
  colours: {
    render: {
      template: {
        module: "text!colours/colours_template.html"
      },
      css: {
        module: "css!colours/colours_structure.css"
      }
    },
    insert: {
      at: "dom.first!section"
    }
  },
  plugins: [
    {
      module: "wire/dom",
      classes: {
        init: "loading"
      }
    }, {
      module: "wire/dom/render"
    }, {
      module: "wire/on"
    }
  ]
});
