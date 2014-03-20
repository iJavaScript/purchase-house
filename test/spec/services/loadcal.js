'use strict';

describe('Service: Loadcal', function () {

  // load the service's module
  beforeEach(module('purchaseHouseApp'));

  // instantiate service
  var Loadcal,
      loadCalService;
  beforeEach(inject(function (_Loadcal_) {
     Loadcal = _Loadcal_;
     loadCalService = new Loadcal();
  }));

  it('should be able to calculate Deng E Ben Xi repayment', function () {
    expect(loadCalService.dengEBenXi).toBeDefined();
  });

});
