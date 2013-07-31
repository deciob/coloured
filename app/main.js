define({
  theme: {
    module: 'theme/basic.css'
  },
  controller: {
    create: {
      module: 'app/colours/audio_controller',
      args: {
        audioFile: "app/colours/audio/colours.ogg"
      }
    },
    properties: {
      audioSprite: {
        $ref: 'dom.first!audio',
        at: 'colours'
      }
    },
    init: {
      init: [1, 2, 3]
    },
    on: {
      colours: {
        'click:div.box': 'log'
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
