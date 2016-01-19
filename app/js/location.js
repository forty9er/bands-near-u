'use strict';

var positionData = {};

function getLocation() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(function(position) {
      positionData.latitude = position.coords.latitude;
      positionData.longitude = position.coords.longitude;
      resolve(position);
    });
  });
}

function searchLocation() {
  return new Promise(function(resolve, reject) {
    var geocoder = new google.maps.Geocoder();
    var searchTerms = $('#searchVal').val();
    geocoder.geocode( { 'address': searchTerms}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          positionData.latitude = results[0].geometry.location.lat();
          positionData.longitude = results[0].geometry.location.lng();
          resolve(positionData);
        } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  });
}

function showPosition() {
  return new Promise(function(resolve, reject) {
    var cityName;
    var countryCode;
    var latitude = positionData.latitude;
    var longitude = positionData.longitude;
    var geolocUrl = 'https://maps.googleapis.com/maps/api/geocode/json?&language=en&latlng=' + latitude + ',' + longitude;
    $.get(geolocUrl, function(response) {
      var results = response.results;
      var country = results[results.length-1].address_components[0].long_name;
      if (country === 'United Kingdom') {
        for (var result = 0; result < results.length; result++) {
          for (var component = 0; component < results[result].address_components.length; component++) {
            if(results[result].address_components[component].types.includes('postal_town')) {
              cityName = convToParam(results[result].address_components[component].long_name);
            }
            if (results[result].address_components[component].types.includes('administrative_area_level_1')) {
              country = convToParam(results[result].address_components[component].long_name);
            }
          }
        }
      } else {
        for (var result = 0; result < results.length; result++) {
          for (var component = 0; component < results[result].address_components.length; component++) {
            if(results[result].address_components[component].types.includes('locality')) {
              cityName = convToParam(results[result].address_components[component].long_name);
            }
          }
        }
        country = convToParam(results[results.length-1].address_components[0].long_name);
      }
      countryCode = results[results.length-1].address_components[0].short_name;
      positionData.cityName = cityName;
      positionData.country = country;
      positionData.countryCode = countryCode;
      positionData.latitude = latitude;
      positionData.longitude = longitude;
      resolve(positionData);
    });
  });
}

function convToParam(words) {
  var result = words.split(' ');
  result = result.join('+');
  return result;
}