define ->

  update: (e) ->
    #@node.innerHTML = e.target.value
    colour = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
    e.target.style.background = colour