define({
  theme: {
    module: 'theme/basic.css'
  },
  coloursConf: {
    module: "app/colours/colours_config"
  },
  defaultLanguage: "italian",
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
  navigationController: {
    create: {
      module: 'app/navigation/navigation_controller',
      args: {
        defaultLanguage: {
          $ref: "defaultLanguage"
        }
      }
    },
    properties: {
      defaultLanguage: {
        $ref: "defaultLanguage"
      },
      el: {
        $ref: "navigation"
      }
    },
    ready: {
      setCurrentLanguage: [],
      initNavigation: []
    },
    before: {
      setCurrentLanguage: 'audioController.resetAudio'
    },
    after: {
      setCurrentLanguage: 'audioController.setCurrentLanguage'
    }
  },
  audioConstructurEnglish: {
    create: {
      module: 'app/utils/audio_constructor',
      args: {
        language: "english",
        conf: {
          $ref: "coloursConf"
        }
      }
    }
  },
  audioConstructurSpanish: {
    create: {
      module: 'app/utils/audio_constructor',
      args: {
        language: "spanish",
        conf: {
          $ref: "coloursConf"
        }
      }
    }
  },
  audioConstructurItalian: {
    create: {
      module: 'app/utils/audio_constructor',
      args: {
        language: "italian",
        conf: {
          $ref: "coloursConf"
        }
      }
    }
  },
  audioController: {
    create: {
      module: 'app/utils/audio_controller',
      args: {
        defaultLanguage: {
          $ref: "defaultLanguage"
        },
        audio: {
          english: {
            $ref: "audioConstructurEnglish"
          },
          spanish: {
            $ref: "audioConstructurSpanish"
          },
          italian: {
            $ref: "audioConstructurItalian"
          }
        },
        conf: {
          $ref: "coloursConf"
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
    }, {
      module: 'wire/aop'
    }
  ]
});
