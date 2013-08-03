define({
  theme: {
    module: 'theme/basic.css'
  },
  coloursConf: {
    module: "app/colours/colours_config"
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
