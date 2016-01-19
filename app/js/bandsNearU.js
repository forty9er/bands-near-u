'use strict';

$(document).ready(function() {

  $('#searchBar').submit(function() {
    searchByLocation();
  });

  myPlaylist.remove();
  getLocation().then(function(getLocPromise) {
    showPosition().then(function(positionPromise) {
      positionData = positionPromise;
      document.getElementById('currentLocation').innerHTML = positionData.cityName;
      getArtists(positionData).then(function(artistsObjectPromise) {
        getArtistTopTracks(artistsObjectPromise, positionData).then(function(topTracksPromise) {
          $('.spinner').fadeOut('slow');
        });
      });
    });
    getSongKickMetroID(positionData).then(function(metroAreaIDPromise) {
      getUpcomingEvents(metroAreaIDPromise);
    });
  });

  function searchByLocation() {
    myPlaylist.remove();
    $('.spinner').fadeIn('slow');
    artistInfoDisplayed = false;
    searchLocation().then(function(getLocPromise) {
      showPosition().then(function(positionPromise) {
        positionData = positionPromise;
        document.getElementById('currentLocation').innerHTML = positionData.cityName;
        getArtists(positionData).then(function(artistsObjectPromise) {
          getArtistTopTracks(artistsObjectPromise, positionData).then(function(topTracksPromise) {
             $('.spinner').fadeOut('slow');
          });
        });
      });
      getSongKickMetroID(positionData).then(function(metroAreaIDPromise) {
        getUpcomingEvents(metroAreaIDPromise);
      });
    });
  }
});