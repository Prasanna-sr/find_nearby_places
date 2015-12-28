'use strict';

describe('findPlacesController', function() {
  var scope, ctrl, $httpBackend, vm;
  var $rootScope;
  beforeEach(module('findPlaces'));

  beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller, $q) {
    $rootScope = _$rootScope_;

    var mockCoordsResponse = {
      data: {
        results: [{
          geometry: {
            location: {
              lat: 1,
              lng: 1
            }
          }
        }]
      }
    };
    var findPlacesService = {
      fetchPlaces: function() {
        var deferred = $q.defer();
        deferred.resolve([1, 2, 3, 4, 5]);
        return deferred.promise;
      },
      getCoords: function() {
        var deferred = $q.defer();
        deferred.resolve(mockCoordsResponse);
        return deferred.promise;

      }
    };
    scope = $rootScope.$new();
    ctrl = $controller('findPlacesController', {
      findPlacesService: findPlacesService
    });
  }));

  it('generateList fn should return correct array size', function() {
    var arrList = ctrl.generateList(5);
    expect(arrList.length).toBe(5);
  });

  it('generateList fn should return empty array when num is falsy', function() {
    var arrList = ctrl.generateList(null);
    expect(arrList.length).toBe(0);
  });

  it('search fn should return correct results, when no nearby is set', function() {
    ctrl.coords = {};
    ctrl.query = 'food';
    ctrl.nearby = null;
    ctrl.search();
    $rootScope.$digest();
    expect(ctrl.places.length).toBe(5);
  });

  it('search fn should return correct results, when nearby is set', function() {
    ctrl.coords = {};
    ctrl.query = 'food';
    ctrl.nearby = 'san francisco';
    ctrl.search();
    $rootScope.$digest();
    expect(ctrl.places.length).toBe(5);
  });

  it('search fn should set correct coords, when nearby is set', function() {
    ctrl.coords = {};
    ctrl.query = 'food';
    ctrl.nearby = 'san francisco';
    ctrl.search();
    $rootScope.$digest();
    expect(ctrl.coords).toEqual({
      lat: 1,
      lng: 1
    });
  });

});
