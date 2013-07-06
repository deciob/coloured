define({
  theme: {
    module: 'theme/basic.css'
  },
  controller: {
    create: 'app/colours/colours_controller',
    properties: {
      audioSprite: {
        $ref: 'dom.first!audio',
        at: 'colours'
      },
      boxes: {
        $ref: 'dom.all!div.pure-g-r',
        at: 'colours'
      }
    },
    init: {
      init: []
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
