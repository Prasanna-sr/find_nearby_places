'use strict';

findPlaces.filter('pricesFilter', pricesFilter);
findPlaces.filter('openNowFilter', openNowFilter);

function openNowFilter() {
  return function(inputArr, openNow) {
    if(openNow) {
      var filterArr = inputArr.filter(function(item) {
        if (item.opening_hours && item.opening_hours.open_now === true) {
          return true;
        }
      });
      return filterArr;
    } else {
      return inputArr;
    }

  }
}
function pricesFilter() {
  return function(inputArr, price1, price2, price3, price4) {
    if (price1 || price2 || price3 || price4) {
      var filterArr = inputArr.filter(function(item) {
        if (price1 && item.price_level === 1) {
          return true;
        }
        if (price2 && item.price_level === 2) {
          return true;
        }
        if (price3 && item.price_level === 3) {
          return true;
        }
        if (price4 && item.price_level === 4) {
          return true;
        }
      });
      return filterArr;
    } else {
      return inputArr;
    }

  }
}
