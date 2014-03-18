(function (angular) {
   'use strict';

   var taxData = {
      "1": { qiTax : 1, initPay: 30 },
      "2": { qiTax : 3, initPay: 70 },
      "3": { qiTax : 3, initPay: 100 }
   };

   function cal (price, inputs, cheating) {
      var subTotal = 0,
          result = {};
      angular.forEach(['initPay', 'qiTax', 'yingYeTax', 'geTax'], function (type) {
         result[type] = (price * inputs[type] / 100);

         if (type.match(/Tax$/)) {
            subTotal += result[type];
         }
      });

      result.middleManFee = inputs.price * inputs.middleManFee / 100;
      result.diff = !!cheating ? (inputs.price - inputs.cheatingValue) : 0;
      result.taxSubTotal = subTotal;
      result.firstPayTotal = result.initPay +
         subTotal +
         result.middleManFee +
         result.diff;
      result.load = price * (100 - inputs.initPay) / 100;
      result.total = result.firstPayTotal + result.load;

      return result;

   }


   angular.module('purchaseHouseApp')
      .controller('MainCtrl', function ($scope) {

         $scope.result = {};

         $scope.input = {};
         $scope.input.geTax = 2;
         $scope.input.middleManFee = 2;
         $scope.input.yingYeTax = 5.65;
         $scope.input.cheatingValue = 160; // 普通住宅阙值

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

         $scope.$watch('input.overFiveYear', function () {
            //if ($scope.input && $scope.input.overFiveYear) {
            //   $scope.input.yingYeTax = 0;
            //} else {
            //   $scope.input.yingYeTax = 5.65;
            //}
         });

         angular.forEach(['input.price', 'input.initPay', 'input.qiTax', 'input.yingYeTax', 'input.geTax', 'input.middleManFee', 'input.cheating'], function (field) {
            $scope.$watch(field, function () {
               var inputs = angular.copy($scope.input);

               if (!!inputs && inputs.price) {
                  $scope.result = cal(inputs.price, inputs);

                  if (inputs.cheating) {
                     inputs.geTax = 1;
                     $scope.cheating = cal(inputs.cheatingValue, inputs, inputs.cheating);
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
            console.log(result);
         };

      });

})(angular);
