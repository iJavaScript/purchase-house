'use strict';

describe('Filter: naValue', function () {

  // load the filter's module
  beforeEach(module('purchaseHouseApp'));

  // initialize a new instance of the filter before each test
  var naValue;
  beforeEach(inject(function ($filter) {
    naValue = $filter('naValue');
  }));

  it('should return the input prefixed with "naValue filter:"', function () {
    var text = 'angularjs';
    expect(naValue(text)).toBe('naValue filter: ' + text);
  });

});
