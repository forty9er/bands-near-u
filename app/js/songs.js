'use strict';

// MAKES SPOTIFY API CALL BASED ON THE ARTIST ID AND SETS PROPERTY topTracks AND A randomTrack
// THIS SHOULD BE REFRACTORED INTO TWO METHODS: 1) getTopTracksForAllArtists 2) addTracksToPlaylist
// IF POSSIBLE playIfNotPlaying SHOULD BE CALLED FROM OUTSIDE OF THIS FUNCTION
// function getArtistTopTracks(artist) {
function getArtistTopTracks(artistsObject, positionData) {
  return new Promise(function(resolve, reject) {
  artistsObject.response.artists.forEach(function(artist) {
      var spotifyId = spotifyArtistId(artist);
      var countryCode = positionData.countryCode;
      var topTracksUrl = 'https://api.spotify.com/v1/artists/' + spotifyId + '/top-tracks?country=' + countryCode;
      $.get(topTracksUrl, function(response){
        if(response.tracks.length > 0) {
          var randomNum = Math.floor(Math.random() * response.tracks.length);
          var randomTrack = response.tracks[randomNum];
          var title = randomTrack.name;
          var artistName = randomTrack.artists[0].name;
          var mp3 =randomTrack.preview_url;
          var poster = randomTrack.album.images[0].url;
          var bio = findBestBio(artist.biographies);
          var news = artist.news;
          myPlaylist.add({ title: title, artist: artistName, mp3: mp3, poster: poster, bio: bio, news: news });
          displayArtistInfoIfNotAlreadyDisplayed(artistName, title, poster, bio, news);
        }
      });
    });
    resolve('No data to return');
  });
}