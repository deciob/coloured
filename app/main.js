define({
  theme: {
    module: 'theme/basic.css'
  },
  defaultLanguage: "italian",
  navigationConf: {
    module: "app/navigation/navigation_config"
  },
  navigationGetCurrentSprite: {
    module: 'app/navigation/navigation_get_current_sprite'
  },
  navigationGetAudioObject: {
    module: 'app/navigation/navigation_get_audio_object'
  },
  navigationGetAudioConf: {
    module: 'app/navigation/navigation_get_audio_conf'
  },
  navigationGetCurrentNode: {
    module: 'app/navigation/navigation_get_current_node'
  },
  navigationGetNodeConf: {
    module: 'app/navigation/navigation_get_node_conf'
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
  audioConstructurNavigation: {
    create: {
      module: 'app/utils/audio_constructor',
      args: {
        language: "all",
        conf: {
          $ref: "navigationConf"
        }
      }
    }
  },
  navigationAudioController: {
    create: {
      module: 'app/utils/audio_controller',
      args: {
        audio: {
          $ref: "audioConstructurNavigation"
        },
        conf: {
          $ref: "navigationConf"
        }
      }
    },
    after: {
      setCurrentLanguage: 'coloursAudioController.setCurrentLanguage'
    },
    on: {
      navigation: {
        'click:button': 'navigationGetAudioConf | play'
      }
    }
  },
  navigationController: {
    create: {
      module: 'app/navigation/navigation_controller'
    },
    properties: {
      defaultLanguage: {
        $ref: "defaultLanguage"
      },
      getCurrentNode: {
        $ref: "navigationGetCurrentNode"
      }
    },
    ready: {
      initNavigation: [],
      setCurrentLanguage: []
    },
    after: {
      setCurrentLanguage: 'navigationAudioController.setCurrentLanguage'
    },
    on: {
      navigation: {
        'click:button': 'navigationGetNodeConf | navigate'
      }
    }
  },
  coloursConf: {
    module: "app/colours/colours_config"
  },
  coloursGetCurrentSprite: {
    module: 'app/colours/colours_get_current_sprite'
  },
  coloursGetAudioObject: {
    module: 'app/colours/colours_get_audio_object'
  },
  coloursGetAudioConf: {
    module: 'app/colours/colours_get_audio_conf'
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
  coloursAudioController: {
    create: {
      module: 'app/utils/audio_controller',
      args: {
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
        'click:div.box': 'coloursGetAudioConf | play'
      }
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
