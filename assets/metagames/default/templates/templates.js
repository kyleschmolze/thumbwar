// Generated by CoffeeScript 1.4.0
(function() {

  App.Metagame.Default = {};

  App.Metagame.Default.Templates = {
    main_view: '<h1><%= players.length %> player<%= players.length > 1 ? "s" : "" %> in your party</h1>\n<ul>\n  <% _.each(players, function(player){ %>\n    <li><%= player.name %>: <%= player.score %> points</li>\n  <% }) %>\n</ul>'
  };

}).call(this);
