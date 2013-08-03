define({
  theme: {
    module: 'theme/basic.css'
  },
  audioConf: {
    audioFile: "app/colours/audio/colours.ogg",
    spriteMap: {
      red: {
        start: 0.6,
        length: 1.1
      },
      orange: {
        start: 2.3,
        length: 1.1
      },
      green: {
        start: 4.1,
        length: 1.1
      },
      purple: {
        start: 6.1,
        length: 1.1
      },
      blue: {
        start: 8.3,
        length: 1.1
      },
      yellow: {
        start: 10.3,
        length: 1.2
      }
    }
  },
  audioConstructur: {
    create: {
      module: 'app/utils/audio_constructor',
      args: {
        audioFile: {
          $ref: "audioConf.audioFile"
        }
      }
    }
  },
  audioController: {
    create: {
      module: 'app/colours/audio_controller',
      args: {
        audio: {
          $ref: "audioConstructur"
        },
        spriteMap: {
          $ref: "audioConf.spriteMap"
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
      at: "dom.first!body"
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
