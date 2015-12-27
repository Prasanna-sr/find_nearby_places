findPlaces.controller('findPlacesController', findPlacesController);
findPlacesController.inject = ['$scope', 'findPlacesService'];

function findPlacesController($scope, findPlacesService) {
  $scope.search = search;

  function search() {
    findPlacesService.getCoords($scope.nearby).then(function(response) {
      $scope.coords = response.data.results[0].geometry.location;
      findPlacesService.fetchPlaces($scope.query, $scope.coords).then(function(results) {
        $scope.places = results;
      });
    });
  }
}
