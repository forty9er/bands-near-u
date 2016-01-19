'use strict';

// ADD SLIDEDOWN ANIMATION TO DROPDOWN //
$('.dropdown').on('show.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

// ADD SLIDEUP ANIMATION TO DROPDOWN //
$('.dropdown').on('hide.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});

$('#familiarityLow').click(function() {
  updateFamiliarity('0.1');
});

$('#familiarityMedium').click(function() {
  updateFamiliarity('0.5');
});

$('#familiarityHigh').click(function() {
  updateFamiliarity('0.9');
});

$('#familiarityMedium').prop('checked', true);

function updateFamiliarity(f) {
  myPlaylist.remove();
  artistInfoDisplayed = false;
  getArtists(positionData, f).then(function(artistsObjectPromise) {
    console.log('Updated Familiarity Artists: (see object below)');
    console.log(artistsObjectPromise);
    getArtistTopTracks(artistsObjectPromise, positionData).then(function(topTracksPromise) {
      console.log('Update MyPlaylist (see below)');
      console.log(myPlaylist);
      myPlaylist.play();
    });
  });
}