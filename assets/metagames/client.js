// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Metagame = (function() {

    Metagame.TEMPLATES = "/assets/metagames/default/templates/templates.js";

    Metagame.STYLESHEET = "/assets/metagames/default/css/metagame.css";

    function Metagame(id) {
      this.id = id;
      this.minigameLoad = __bind(this.minigameLoad, this);

      this.drawPlayerList = __bind(this.drawPlayerList, this);

      this.init = __bind(this.init, this);

      this.getPlayer = __bind(this.getPlayer, this);

    }

    Metagame.prototype.getPlayer = function(id) {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.id === id) {
          return player;
        }
      }
      return null;
    };

    Metagame.prototype.minigames = [];

    Metagame.prototype.init = function(io, name) {
      var _this = this;
      $('head').append("<link rel='stylesheet' href='" + this.constructor.STYLESHEET + "'>");
      return $.getScript(this.constructor.TEMPLATES).done(function(script, textStatus) {
        console.log("New metagame with id " + _this.id);
        _this.el = $("<div>").addClass('active view').attr("id", "metagame");
        $('.active.view').removeClass('active').hide();
        $('body').append(_this.el);
        _this.socket = io.connect("/" + _this.id);
        _this.socket.emit('players: player joining', {
          name: name
        });
        console.log('sending JOINING');
        _this.socket.on('players: list updated', function(players) {
          _this.players = players;
          _this.drawPlayerList();
          if (_this.currentMinigame != null) {
            return _this.currentMinigame.playersUpdated();
          }
        });
        _this.socket.on('minigame: load', _this.minigameLoad);
        _this.socket.on('minigame: start', function() {
          setTimeout(_this.currentMinigame.start, 5000);
          return console.log("Starting " + _this.currentMinigame.constructor.NAME + " in 5 seconds!");
        });
        return _this.socket.on('broadcast', function(data) {
          if (_this.currentMinigame != null) {
            return _this.currentMinigame.receiveBroadcast(data);
          }
        });
      });
    };

    Metagame.prototype.drawPlayerList = function() {
      console.log(this.players);
      return this.el.html(_.template(App.Metagame.Default.Templates.main_view, {
        players: this.players
      }));
    };

    Metagame.prototype.minigameLoad = function(data) {
      var _this = this;
      console.log(data);
      if (this.minigames[data.minigame.name]) {
        this.currentMinigame = new this.minigames[data.minigame.name];
        this.el.find("#instructions").html(this.currentMinigame.constructor.INSTRUCTIONS);
        return this.playerReady();
      } else {
        return $.getScript(data.minigame.src).done(function(script, textStatus) {
          _this.currentMinigame = new _this.minigames[data.minigame.name];
          _this.el.find("#instructions").html(_this.currentMinigame.constructor.INSTRUCTIONS);
          return _this.playerReady();
        });
      }
    };

    Metagame.prototype.addMinigame = function(minigame) {
      return this.minigames[minigame.NAME] = minigame;
    };

    Metagame.prototype.playerReady = function() {
      this.ready = true;
      return this.socket.emit('metagame: player ready');
    };

    Metagame.prototype.gameover = function(minigame) {
      return this.socket.emit('minigame: gameover', {
        score: minigame.score
      });
    };

    Metagame.prototype.broadcast = function(data) {
      data.player_id = this.socket.id;
      console.log("bcing " + data);
      return this.socket.emit('broadcast', data);
    };

    Metagame.prototype.refreshPlayers = Metagame.socket.emit("players: refresh");

    return Metagame;

  })();

}).call(this);
