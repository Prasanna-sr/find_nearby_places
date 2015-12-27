findPlaces.directive('placesMap', placesMap);
placesMap.inject = [];

function placesMap() {
  function link(scope, element, attrs) {
    var map;
    var infowindow;
    scope.$watch('places', function(newValue, oldValue) {
      var results = newValue;
      var coords;
      var location;
      if (results) {
        coords = scope.coords;
        location = new google.maps.LatLng(coords.lat, coords.lng);
        map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 15
        });
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }

    });

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: placeLoc
      });

      // google.maps.event.addListener(marker, 'click', function() {
      //   infowindow.setContent(place.name);
      //   infowindow.open(map, this);
      // });
    }
  }

  return {
    link: link,
    restrict: 'A'
  };
}
