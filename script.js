var $url = 'http://probasketballapi.com/stats/players';
var $api_key = 'gtmH3IX75iwz4h98UEjFfuCSLkGl2QNs';
//https://probasketballapi.com/stats/players?api_key=gtmH3IX75iwz4h98UEjFfuCSLkGl2QNs&opponent_id=1610612753&player_id=202331
$.post('https://probasketballapi.com/players?api_key='+ $api_key, function(data){
  console.log(data);
});

$.post('https://probasketballapi.com/stats/players?api_key='+ $api_key + "&opponent_id=1610612753&player_id=202331", function(data){
  console.log(data);
});
