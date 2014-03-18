(function (angular) {
   'use strict';

   var taxData = {
      "1": { qiTax : 1, initPay: 30 },
      "2": { qiTax : 3, initPay: 70 },
      "3": { qiTax : 3, initPay: 100 }
   };

   function cal (price, inputs, normalHouse) {
      var subTotal = 0,
          result = {};
      angular.forEach(['initPay', 'qiTax', 'yingYeTax', 'geTax'], function (type) {
         result[type] = (price * inputs[type] / 100);

         if (type === 'yingYeTax' && _useMarginYingYeTax(inputs.overFiveYear, normalHouse)) {
            var ov = !!inputs.originalValue ? inputs.originalValue : 0;
            result.yingYeTax = inputs.yingYeTax * (price - ov) / 100;
         }
         if (type.match(/Tax$/)) {
            subTotal += result[type];
         }
      });

      result.middleManFee = inputs.price * inputs.middleManFee / 100;
      result.diff = !!normalHouse ? (inputs.price - inputs.normalHouseValue) : 0;
      result.taxSubTotal = subTotal;
      result.firstPayTotal = result.initPay +
         subTotal +
         result.middleManFee +
         result.diff;
      result.load = price * (100 - inputs.initPay) / 100;
      result.total = result.firstPayTotal + result.load;

      return result;

   }


   function _doNotNeedYingYeTax (overFiveYear, normalHouse) {
      return !!overFiveYear && !! normalHouse;
   }

   function _useMarginYingYeTax (overFiveYear, normalHouse) {
      return overFiveYear && !normalHouse;
   }

   function _getGeTax (overFiveYear, onlyOneHouse) {
      var r = 2;
      if (overFiveYear && onlyOneHouse) {
         r = 0;
      } else if (overFiveYear && !onlyOneHouse) {
         r = 1;
      }
      return r;
   }

   function _updateGeTax ($scope) {
      $scope.input.geTax = _getGeTax($scope.input.overFiveYear, $scope.input.onlyOneHouse);
   }

   angular.module('purchaseHouseApp')
      .controller('MainCtrl', function ($scope) {

         $scope.result = {};

         $scope.input = {};
         $scope.input.middleManFee = 2;
         $scope.input.yingYeTax = 5.65;
         $scope.input.normalHouseValue = 160; // 普通住宅阙值


         //$scope.needShowOriginalValue = function () {
         //   var inputs = $scope.input;
         //   return _useMarginYingYeTax(inputs.overFiveYear, inputs.normalHouse);
         //};

         // TODO: watch the whole model?
         //
         $scope.$watch('input.howManyHouses', function () {
            if ($scope.input && $scope.input.howManyHouses) {
               var d = taxData[''+$scope.input.howManyHouses];
               !!d || (d = taxData['3']);
               $scope.input.qiTax = d.qiTax;
               $scope.input.initPay = d.initPay;
            }
         });

         $scope.$watch('input.onlyOneHouse', function () {
            _updateGeTax($scope);

         });
         $scope.$watch('input.overFiveYear', function () {
            _updateGeTax($scope);
         });

         angular.forEach(['input.price', 'input.initPay', 'input.qiTax', 'input.originalValue',
                          'input.yingYeTax', 'input.geTax', 'input.middleManFee',
                          'input.normalHouseValue', 'input.normalHouse'], function (field) {
            $scope.$watch(field, function () {
               var inputs = angular.copy($scope.input);

               if (!!inputs && inputs.price) {

                  $scope.result = cal(inputs.price, inputs, false);

                  if (inputs.normalHouse) {
                     inputs.geTax = inputs.geTax > 0 ? 1 : 0; // 唯一房无需个税

                     inputs.yingYeTax = _doNotNeedYingYeTax(inputs.overFiveYear, inputs.normalHouse) ? 0 : 5.65;

                     $scope.cheating = cal(inputs.normalHouseValue, inputs, inputs.normalHouse);
                  }

               }
            });
         });

         $scope.cal = function () {
            var result = {},
                price = $scope.price,
                subTotal = 0;

            result.price = price;


            result.subTotal = subTotal;
         };

      });

})(angular);
