var $url_playerStats = 'https://probasketballapi.com/stats/players';
var $url_shotChart = 'https://probasketballapi.com/shotcharts';
var $url_players = 'https://probasketballapi.com/players';
var $url_playerBox = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/boxscore/player';
var $api_key = 'gtmH3IX75iwz4h98UEjFfuCSLkGl2QNs';
var $button = $('#player1btn');
var $button2 = $('#player2btn');
var $input = $('#player1');
var input2 = $('#player2');
var $stats;


//name 1
$button.click(function(event){
  event.preventDefault();
  var $names = $input.val().split(/\s+/);
  var first = $names[0];
  var last = $names[1];
  console.log(first, last);
  $stats = $('.stats-p1');
  getPlayer(first, last);
  return false;

});

$button2.click(function(event){
  event.preventDefault();
  var $names = input2.val().split(/\s+/);
  var first = $names[0];
  var last = $names[1];
  console.log(first, last);
  $stats = $('.stats-p2');
  getPlayer(first, last);
  return false;

});

function getPlayer(first, last){
  $.post($url_players + '?api_key=' + $api_key + '&first_name=' + first + '&last_name=' + last, getStats);

}

function getStats(player) {
  console.log(JSON.parse(player));
  $.post($url_playerBox + '?api_key=' + $api_key +  '&player_id=' + JSON.parse(player)[0].player_id + '&season=2015', function(d){

    console.log(d);

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

    console.log(avgAssist);
    console.log(avgBlock);
    console.log(avgfgAttempts);
    console.log(avgfgMade);
    console.log(avgthreeAttempts);
    console.log(avgthreeMade);
    console.log(avgftAttempts);
    console.log(avgftMade);
    console.log(avgPoints);


    $('.stats').empty();

    var source = $("#playerStats").html();
    var template = Handlebars.compile(source);
    var context = {
      //api: d,
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

    var html = template(context);
    console.log(html);
    $stats.append(html).hide().fadeIn(800);

  });
}
