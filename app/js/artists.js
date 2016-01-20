'use strict';

var artistInfoDisplayed = false;

function getArtists(positionData, familiarity) {
  return new Promise(function(resolve, reject) {
    var familiarityTerm = familiarity || '0.5';
    var cityName = positionData.cityName;
    var country = positionData.country;
    var echonestUrl = 'https://developer.echonest.com/api/v4/artist/search?api_key=BG6IJZJJYOKNETBX8' +
                  '&format=json' +
                  '&artist_location=' + cityName + '+' + country +
                  '&max_familiarity=' + familiarityTerm +
                  '&sort=familiarity-desc&results=35' +
                  '&bucket=id:spotify' +
                  '&bucket=biographies' +
                  '&bucket=artist_location' +
                  '&bucket=news';
    $.get(echonestUrl, function(data){
      resolve(data);
    });
  });
}

function findBestBio(biographies) {
  var result;
  biographies.forEach(function(i) {
    if(i.truncated !== true) {
      result = i;
    }
  });
  if(result) {
    return result;
  } else {
    return {text: 'No biography available'};
  }
}

function displayArtistInfoIfNotAlreadyDisplayed(artist, title, poster, bio, news){
  if (!artistInfoDisplayed) {
    artistInfoDisplayed = true;
    displayCurrentArtist(document, artist, title, poster, bio, news);
    updateAllNewsModal(news);
  }
}

function spotifyArtistId(artist) {
  var foreignId = artist.foreign_ids[0].foreign_id;
  return foreignId.slice(15);
}

function updateCurrentArtistFromPlaylist() {
  var artist = myPlaylist.playlist[0].artist;
  var title = myPlaylist.playlist[0].title;
  var poster = myPlaylist.playlist[0].poster;
  var bio = myPlaylist.playlist[0].bio;
  var news = myPlaylist.playlist[0].news;
  displayCurrentArtist(document, artist, title, poster, bio, news);
}