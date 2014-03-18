'use strict';

angular.module('purchaseHouseApp')
  .filter('naValue', function () {
    return function (input) {
      return !!input ? input : '-';
    };
  });
