'use strict';

function getSongKickMetroID(positionData) {
  return new Promise(function(resolve, reject) {
    var eventUrl = 'https://api.songkick.com/api/3.0/search/locations.json?location=geo:'+
      positionData.latitude + ',' + positionData.longitude +
      '&apikey=qMMmyACVKOgL3Kgb' + '&jsoncallback=?';
    $.getJSON(eventUrl, function(data){
        var metroAreaID = data.resultsPage.results.location[0].metroArea.id;
        resolve(metroAreaID);
    });
  });
}

function getUpcomingEvents(metroAreaID) {
  $('#localEventsList').html('');
  var eventUrl = 'https://api.songkick.com/api/3.0/metro_areas/' +
  metroAreaID +
  '/calendar.json?apikey=qMMmyACVKOgL3Kgb' + '&jsoncallback=?';
  $.getJSON(eventUrl, function(data){
    if($.isEmptyObject(data.resultsPage.results)) {
      $("#localEventsList").append("<a class=\"list-group-item\" href=\"#\">No events near you...</a>");
    } else {
      $.each(data.resultsPage.results.event, function (i, event) {
        var uri = event.uri;
        var displayName = event.displayName;
        $("#localEventsList").append("<a class=\"list-group-item\" href="+"\""+uri+"\""+
          "onClick=\"return popup(this, 'popup')\">"+displayName+"</a>");
        return i<7;
      });
    }
  });
}