'use strict';

describe('Filter: filterWithOr', function () {

  // load the filter's module
  beforeEach(module('clientApp'));

  // initialize a new instance of the filter before each test
  var filterWithOr;
  beforeEach(inject(function ($filter) {
    filterWithOr = $filter('filterWithOr');
  }));

  it('should return the input prefixed with "filterWithOr filter:"', function () {
    var text = 'angularjs';
    expect(filterWithOr(text)).toBe('filterWithOr filter: ' + text);
  });

});
