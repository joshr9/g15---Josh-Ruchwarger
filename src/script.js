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








  });
}
