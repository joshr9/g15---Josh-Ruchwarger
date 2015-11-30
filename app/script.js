var $url_playerStats = 'https://probasketballapi.com/stats/players';
var $url_shotChart = 'https://probasketballapi.com/shotcharts';
var $url_players = 'https://probasketballapi.com/players';
var $url_playerBox = 'https://cors-anywhere.herokuapp.com/http://api.probasketballapi.com/boxscore/player';
var $api_key = 'gtmH3IX75iwz4h98UEjFfuCSLkGl2QNs';
var $button = $('button');
var $input = $('.player_name');
var $stats = $('.stats');


//name 1
$button.click(function(event){
  event.preventDefault();
  var $names = $input.val().split(/\s+/);
  var first = $names[0];
  var last = $names[1];
  console.log(first, last);
  getPlayer(first, last);
  return false;

});

function getPlayer(first, last){
  $.post($url_players + '?api_key=' + $api_key + '&first_name=' + first + '&last_name=' + last, getStats);

}

// function shotChart(player) {
//   $.post($url_playerBox + '?api_key=' + $api_key + '&player_id=' + JSON.parse(player)[0].player_id, function(d){
//     console.log(d);
//
//   });
// }

function getStats(player) {
  console.log(JSON.parse(player));
  $.post($url_playerBox + '?api_key=' + $api_key +  '&player_id=' + JSON.parse(player)[0].player_id + '&season=2015', function(d){

    console.log(d);

    var data = JSON.parse(d);
    var boxAssist = 0;
    var boxBlock = 0;
    var boxRebounds = 0;
    var threeAttempts = 0;
    var threeMade = 0;
    var fgMade = 0;
    var fgAttempts = 0;
    var ftAttempts = 0;
    var ftMade = 0;
    var points = 0;
    var steals = 0;
    var turnovers = 0;

    for(i = 0; i < data.length; i++){

      boxAssist = data[i].box_ast + boxAssist;
      boxBlock = data[i].box_blk + boxBlock;
      boxRebounds = data[i].box_dreb + boxRebounds;
      threeAttempts = data[i].box_fg3a + threeAttempts;
      threeMade = data[i].box_fg3m + threeMade;
      fgMade = data[i].box_fgm + fgMade;
      fgAttempts = data[i].box_fga + fgAttempts;
      ftAttempts = data[i].box_fta + ftAttempts;
      ftMade = data[i].box_ftm + ftMade;
      points = data[i].box_pts + points;
      steals = data[i].box_stl + steals;
      turnovers = data[i].box_to + turnovers;

      console.log(data[i]);
    }
    var avgAssist = boxAssist / data.length;
    var avgBlock = boxBlock / data.length;
    var avgRebounds = boxRebounds / data.length;
    var avgthreeMade = threeMade / data.length;
    var avgfgMade = fgMade / data.length;
    var avgftMade = ftMade / data.length;
    var avgPoints = points / data.length;
    var avgSteals = steals / data.length;
    var avgTurnovers = turnovers / data.length;


    // console.log(avgAssist);
    // console.log(avgBlock);
    // console.log(avgRebounds);
    // console.log(avgthreeMade);
    // console.log(avgfgMade);
    // console.log(avgftMade);
    // console.log(avgPoints);
    // console.log(avgSteals);
    // console.log(avgTurnovers);

    $stats.append('<p> assists:'  + avgAssist +'</p>');






  });
}
