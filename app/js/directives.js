findPlaces.directive('placesMap', placesMap);
findPlaces.inject = ['$filter'];

function placesMap($filter) {
  var markerList = [];

  function link(scope, element, attrs, vm) {
    var map;
    var coords;
    var location;
    var infowindow;
    var watchList = ['fpCont.places', 'fpCont.openNow',
      'fpCont.price1', 'fpCont.price2', 'fpCont.price3',
      'fpCont.price4'
    ];
    scope.$watchGroup(watchList, function(newValues, oldValues) {
      markerList = [];
      var filteredResults = $filter('openNowFilter')(newValues[0], vm.openNow);
      var results = $filter('pricesFilter')(filteredResults, vm.price1, vm.price2, vm.price3, vm.price4);

      if (results.length) {
        coords = vm.coords;
        location = new google.maps.LatLng(coords.lat, coords.lng);
        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 13
        });
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      } else if (newValues[0].length && !results.length) {
        //when filtered results are zero, shows map with no places
        coords = vm.coords;
        location = new google.maps.LatLng(coords.lat, coords.lng);
        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom: 13
        });
      }
    });

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: placeLoc
      });
      markerList.push({
        id: place.place_id,
        marker: marker
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
  }

  angular.element(document).on('mousemove', '.place-finder .list li', function() {
    var placeid = angular.element(this).children('div').attr('data-placeid');
    markerList.forEach(function(obj) {
      var marker = obj.marker;
      if (obj.id === placeid) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 500);
      } else {

      }
    });
  });

  angular.element(document).scroll(function() {
    var top = angular.element(document).scrollTop();
    var map = angular.element('.map-wrapper');
    var header = angular.element('header').outerHeight(true);
    var mapOffset = map.offset().top;
    var mapOffsetWindow = mapOffset - top;
    if (mapOffsetWindow <= 2) {
      map.removeClass('map-container');
      map.addClass('map-container-fixed');
    }
    if (mapOffsetWindow <= 2 && top < header) {
      map.removeClass('map-container-fixed');
      map.addClass('map-container');
    }
  });

  return {
    link: link,
    controller: 'findPlacesController',
    controllerAs: 'fpCont',
    restrict: 'A'
  };
}
