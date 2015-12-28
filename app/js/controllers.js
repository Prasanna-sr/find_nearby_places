'use strict';

findPlaces.controller('findPlacesController', findPlacesController);
findPlacesController.inject = ['findPlacesService'];

function findPlacesController(findPlacesService) {
  var currentPostion = {};
  var vm = this;
  vm.search = search;
  vm.generateList = generateList;
  vm.places = [];
  initialize();

  function initialize() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        currentPostion.lat = position.coords.latitude;
        currentPostion.lng = position.coords.longitude;
      });
    }
  }

  function search() {
    var coords;
    if (!vm.nearby) {
      vm.coords = currentPostion;
      findPlacesService.fetchPlaces(vm.query, vm.coords).then(function(results) {
        vm.places = results;
      });
    } else {
      findPlacesService.getCoords(vm.nearby).then(function(response) {
        vm.coords = response.data.results[0].geometry.location;
        findPlacesService.fetchPlaces(vm.query, vm.coords).then(function(results) {
          vm.places = results;
        });
      });
    }
  }

  function generateList(num) {
    if (num) {
      return new Array(Math.round(num));
    } else {
      return [];
    }

  }
}
