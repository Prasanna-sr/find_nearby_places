findPlaces.controller('findPlacesController', findPlacesController);
findPlacesController.inject = ['$scope', 'findPlacesService'];

function findPlacesController($scope, findPlacesService) {
  var currentPostion = {};
  $scope.search = search;
  $scope.generateList = generateList;
  function generateList(num) {
    if(num) {
        return new Array(Math.round(num));
    } else {
      return [];
    }

  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentPostion.lat = position.coords.latitude;
      currentPostion.lng = position.coords.longitude;
    });
  }

  function search() {
    var coords;
    if (!$scope.nearby) {
      $scope.coords = currentPostion;
      findPlacesService.fetchPlaces($scope.query, $scope.coords).then(function(results) {
        $scope.places = results;
      });
    } else {
      findPlacesService.getCoords($scope.nearby).then(function(response) {
        $scope.coords = response.data.results[0].geometry.location;
        findPlacesService.fetchPlaces($scope.query, $scope.coords).then(function(results) {
          $scope.places = results;
        });
      });
    }
  }
}
