findPlaces.controller('findPlacesController', findPlacesController);
findPlacesController.inject = ['$scope', 'findPlacesService'];

function findPlacesController($scope, findPlacesService) {
  var currentPostion = {};
  $scope.search = search;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
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
