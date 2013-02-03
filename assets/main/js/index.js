// Generated by CoffeeScript 1.4.0
(function() {
  var socket;

  window.App = {
    players: [],
    Minigames: {},
    Templates: {}
  };

  socket = io.connect('/');

  socket.on("player: your id", function(data) {
    return App.player_id = data.id;
  });

  socket.on("disconnect", function(data) {
    $('#disconnected').fadeIn(500);
    $('#overlay').fadeIn(500).css('z-index', 9999);
    return setTimeout("location.href = '/'", 6000);
  });

  $("#user-form").submit(function() {
    $("button").attr('disabled', 'disabled').text("Connecting...");
    $(".username").blur();
    $("#music-player")[0].play();
    socket.emit('server: new player');
    socket.on("server: enter metagame", function(data) {
      if (data.metagame_id != null) {
        App.metagame = new App.Metagame(data.metagame_id);
        console.log("Connecting to " + data.metagame_id);
        return App.metagame.init(io, $(".username").val());
      }
    });
    return false;
  });

  App.Utilities = {
    warningGiven: false,
    checkOrientation: function() {
      if (!App.Utilities.warningGiven && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) && $(window).width() > $(window).height()) {
        alert('To play Thumb War, you should use portrait orientation on your phone. (You may want to lock your phone in this orientation!)');
        return App.Utilities.warningGiven = true;
      }
    }
  };

}).call(this);
