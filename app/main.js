define({
  message: {
    render: {
      template: {
        module: "text!colours/colours_template.html"
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
    }
  ]
});
