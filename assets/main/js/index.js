// Generated by CoffeeScript 1.4.0
(function() {
  var socket;

  window.App = {
    players: [],
    Minigames: {}
  };

  socket = io.connect('/');

  $("#user-form").submit(function() {
    socket.emit('server: new player');
    socket.on("server: enter metagame", function(data) {
      if (data.metagame_id != null) {
        App.metagame = new App.Metagame(data.metagame_id);
        console.log("Connecting to " + data.metagame_id);
        return App.metagame.init(io, $(".username").val());
      }
    });
    $("button").attr('disabled', 'disabled');
    return false;
  });

  App.Utilities = {
    checkOrientation: function() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) && $(window).width() > $(window).height()) {
        return alert('To play Mobile Party, you should use portrait orientation on your phone. (You may want to lock your phone in this orientation!)');
      }
    }
  };

}).call(this);
