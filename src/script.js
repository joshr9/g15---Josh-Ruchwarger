var $url_playerStats = 'https://probasketballapi.com/stats/players';
var $url_players = 'https://probasketballapi.com/players';
var $url_playerBox = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/boxscore/player';
var $api_key = 'gtmH3IX75iwz4h98UEjFfuCSLkGl2QNs';
var $button = $('#player1btn');
var $button2 = $('#player2btn');
var $input = $('#player1');
var input2 = $('#player2');
var $stats;
var bearer_token = "AAAAAAAAAAAAAAAAAAAAAOe2iwAAAAAAM4gf3jlXRHNx4AxYunXOwG7BOhw%3Dcp2rPBFkKZ9AWGZo3buGNKGtJ734OiqxneFMahlgMiyvUIGBio";
var comparePlayers = {};
// var Codebird = require("codebird");
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");

var cb = new Codebird;
cb.setBearerToken(bearer_token);


$("#compare").click(function(){
  if($input.val() && input2.val()){
    $button.click();
    $button2.click();
  }else{
    alert("You must enter both names!");
  }


});
//name 1
$button.click(function(event){
  event.preventDefault();
  var $names = $input.val().split(/\s+/);
  $("#name-p1").text($names);
  var first = $names[0];
  var last = $names[1];
  console.log(first, last);
  $stats = $('.stats-p1');
  getPlayer(first, last, 1);
  return false;

});

$button2.click(function(event){
  event.preventDefault();
  var $names = input2.val().split(/\s+/);
  $("#name-p2").text($names);
  var first = $names[0];
  var last = $names[1];
  console.log(first, last);
  $stats = $('.stats-p2');
  getPlayer(first, last, 2);
  return false;

});

function getPlayer(first, last, playerNumber){
  $.post($url_players + '?api_key=' + $api_key + '&first_name=' + first + '&last_name=' + last, function(player){
    getStats(player, playerNumber);
  });

}

function getPlayers(){
  if(localStorage.getItem("players") === null){
    $.post($url_players + '?api_key=' + $api_key).done(function(players){
      players = JSON.parse(players);
      var playerNames = [];
      for(var k = 0; k < players.length; k++){
        playerNames.push(players[k].player_name);
      }
      localStorage.setItem("players", JSON.stringify(playerNames));
      autoComplete(playerNames);

    });

  }else{
    var playerString = localStorage.getItem("players");
    var playerNames = JSON.parse(playerString);
    autoComplete(playerNames);
  }


}
getPlayers();

function autoComplete(playerNames){
  var bplayerNames = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    // `states` is an array of state names defined in "The Basics"
    local: playerNames
  });

  $('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'players',
    source: bplayerNames
  });
}

function betterStats(){
  var statNames = Object.keys(comparePlayers["1"]);
  console.log(statNames);
  for(var i = 0; i < statNames.length; i++){
    var statName = statNames[i];
    if(comparePlayers["1"][statName] > comparePlayers["2"][statName]){
      console.log("player 1");
      $("#" + statName + "-p1").css("color", "green");
    }else{
      $("#" + statName + "-p2").css("color", "green");
      console.log("player 2");

    }
  }
}
function getStats(player, playerNumber) {
  player = JSON.parse(player);
  $.post($url_playerBox + '?api_key=' + $api_key +  '&player_id=' + (player)[0].player_id + '&season=2015', function(d){

    var assist = 0;
    var block = 0;
    var fgAttempts = 0;
    var fgMade = 0;
    var threeAttempts = 0;
    var threeMade = 0;
    var ftAttempt = 0;
    var ftMade = 0;
    var points = 0;
    var minutes = 0;

    for(i = 0; i < d.length; i++){
      assist = d[i].ast + assist;
      block = d[i].blk + block;
      fgAttempts = d[i].fga + fgAttempts;
      fgMade = d[i].fgm + fgMade;
      threeAttempts = d[i].fg3a + threeAttempts;
      threeMade = d[i].fg3m + threeMade;
      ftAttempt = d[i].fta + ftAttempt;
      ftMade = d[i].ftm + ftMade;
      points = d[i].pts + points;
      minutes = d[i].min + minutes;
    }

    var avgAssist = assist / d.length;
    var avgBlock = block / d.length;
    var avgfgAttempts = fgAttempts / d.length;
    var avgfgMade = fgMade / d.length;
    var avgthreeAttempts = threeAttempts / d.length;
    var avgthreeMade = threeMade / d.length;
    var avgftAttempts = ftAttempt / d.length;
    var avgftMade = ftMade / d.length;
    var avgPoints = points / d.length;

    $('#stats-p' + playerNumber).empty();

    var source = $("#playerStats" + playerNumber).html();
    var template = Handlebars.compile(source);
    var context = {
      AvgAssist: avgAssist.toFixed(2),
      AvgBlock: avgBlock.toFixed(2),
      AvgfgAttempts: avgfgAttempts.toFixed(2),
      AvgfgMade: avgfgMade.toFixed(2),
      AvgthreeAttempts: avgthreeAttempts.toFixed(2),
      AvgthreeMade: avgthreeMade.toFixed(2),
      AvgftAttempts: avgftAttempts.toFixed(2),
      AvgftMade: avgftMade.toFixed(2),
      AvgPoints: avgPoints.toFixed(2)
    };

    comparePlayers[playerNumber] = {
      AvgAssist: avgAssist,
      AvgBlock: avgBlock,
      AvgfgAttempts: avgfgAttempts,
      AvgfgMade: avgfgMade,
      AvgthreeAttempts: avgthreeAttempts,
      AvgthreeMade: avgthreeMade,
      AvgftAttempts: avgftAttempts,
      AvgftMade: avgftMade,
      AvgPoints: avgPoints
    };

    var html = template(context);
    console.log(html);
    $("#stats-p" + playerNumber).append(html).hide().fadeIn(800);

    if(comparePlayers["1"] && comparePlayers["2"]){
      betterStats();
    }
    console.log(player);

    cb.__call(
    "search_tweets",
    "f=news&q=" + player[0].player_name,
    function (reply) {
      $("#mentions-p" + playerNumber).empty();
      for(j=0; j < reply.statuses.length; j++){

        var source = $("#playerMentions").html();
        var template = Handlebars.compile(source);
        var html = template(reply.statuses[j]);

        $("#mentions-p" + playerNumber).append(html).hide().fadeIn(800);

      }
      console.log(reply);
    },
    true // this parameter required
);




  });
}
