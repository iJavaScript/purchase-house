(function (angular) {
   'use strict';

   var taxData = {
      "1": { qiTax : 1, initPay: 30 },
      "2": { qiTax : 3, initPay: 70 },
      "3": { qiTax : 3, initPay: 100 }
   };

   angular.module('purchaseHouseApp')
      .controller('MainCtrl', function ($scope) {

         $scope.result = {};

         $scope.input = {};
         $scope.input.geTax = 2;
         $scope.input.middleManFee = 2;

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
            if ($scope.input && $scope.input.overFiveYear) {
               $scope.input.yingYeTax = 0;
            } else {
               $scope.input.yingYeTax = 5.65;
            }
         });

         angular.forEach(['input.price', 'input.initPay', 'input.qiTax', 'input.yingYeTax', 'input.geTax', 'input.middleManFee'], function (field) {
            $scope.$watch(field, function () {
               var inputs = $scope.input;
               //console.log($scope.input);

               if (!!inputs) {
                  var subTotal = 0;
                  angular.forEach(['initPay', 'qiTax', 'yingYeTax', 'geTax', 'middleManFee'], function (type) {
                     $scope.result[type] = inputs.price * inputs[type] / 100;
                     if (type.match(/Tax$/)) {
                        subTotal += $scope.result[type];
                     }
                  });

                  $scope.result.taxSubTotal = subTotal;
                  $scope.result.total = $scope.result.initPay +
                                        subTotal +
                                        $scope.result.middleManFee;

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
