findPlaces.factory('findPlacesService', findPlacesService);
findPlacesService.inject = ['$http', '$q', 'APP_CONSTANT'];

function findPlacesService($http, $q, APP_CONSTANT) {
  var findPlacesServiceObj = {};
  findPlacesServiceObj.fetchPlaces = fetchPlaces;
  findPlacesServiceObj.getCoords = getCoords;
  return findPlacesServiceObj;

  function fetchPlaces(query, coords) {
    var deferred = $q.defer();
    var location = new google.maps.LatLng(coords.lat, coords.lng);
    var request = {
      location: location,
      radius: '500',
      query: query
    };
    var service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        deferred.resolve(results);
      } else {
        deferred.reject('error');
      }
    });
    return deferred.promise;
  }

  function getCoords(place) {
    return $http({
      method: 'GET',
      url: APP_CONSTANT.geocodeURL,
      params: {
        address: place,
        key: APP_CONSTANT.APIKey
      }
    });
  }

}
