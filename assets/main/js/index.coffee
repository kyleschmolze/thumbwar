socket = io.connect('/')

form = document.getElementById("user-form")
form.onsubmit = ->
  App.player = new App.Player this.elements["username"].value
  App.players.push App.player
  socket.emit "new player", { name: App.player.name }
  socket.on "enter metagame", (data) ->
    if data.metagame_id?
      #socket.disconnect()
      App.metagame = new App.Metagame
      App.metagame.clientInit(io)
      console.log "Connecting to #{data.metagame_id}"
  $("button").attr('disabled', 'disabled')
  false
