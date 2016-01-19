'use strict';

$(document).ready(function() {

  $('#searchBar').submit(function() {
    searchByLocation();
  });

  // CALLING THE FUNCTIONS IN A CHAIN
  myPlaylist.remove();
  getLocation().then(function(getLocPromise) {
    console.log('THE FIRST PROMISE: (see object below)');
    console.log(getLocPromise);
    showPosition().then(function(positionPromise) {
      positionData = positionPromise;
      console.log('THE SECOND PROMISE: (see object below)');
      console.log(positionData);
      document.getElementById('currentLocation').innerHTML = positionData.cityName;
      getArtists(positionData).then(function(artistsObjectPromise) {
        console.log('THE THIRD PROMISE: (see object below)');
        console.log(artistsObjectPromise);
        getArtistTopTracks(artistsObjectPromise, positionData).then(function(topTracksPromise) {
          console.log('THE FOURTH PROMISE: ' + topTracksPromise);
          console.log('MyPlaylist (see below)');
          console.log(myPlaylist);
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
      console.log('THE FIRST PROMISE: (see object below)');
      console.log(getLocPromise);
      showPosition().then(function(positionPromise) {
        positionData = positionPromise;
        console.log('THE SECOND PROMISE: (see object below)');
        console.log(positionData);
        document.getElementById('currentLocation').innerHTML = positionData.cityName;
        getArtists(positionData).then(function(artistsObjectPromise) {
          console.log('THE THIRD PROMISE: (see object below)');
          console.log(artistsObjectPromise);
          getArtistTopTracks(artistsObjectPromise, positionData).then(function(topTracksPromise) {
            console.log('THE FOURTH PROMISE: ' + topTracksPromise);
            console.log('MyPlaylist (see below)');
            console.log(myPlaylist);
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