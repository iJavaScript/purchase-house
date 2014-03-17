(function (angular) {
   'use strict';

   var taxData = {
      "1": { qiTax : 1, initPay: 30 },
      "2": { qiTax : 3, initPay: 70 },
      "3": { qiTax : 3, initPay: 100 }
   };

   angular.module('purchaseHouseApp')
      .controller('MainCtrl', function ($scope) {

         $scope.howManyHouses = 2;
         $scope.yingYeTax = 5.65;
         $scope.geTax = 2;
         $scope.middleManFee = 2;


         $scope.$watch('howManyHouses', function () {
            var d = taxData[''+$scope.howManyHouses];
            !!d || (d = taxData['3']);
            $scope.qiTax = d.qiTax;
            $scope.initPay = d.initPay;
         });

         $scope.cal = function () {
            var result = {},
                price = $scope.price,
                subTotal = 0;

            result.price = price;
            angular.forEach(['qiTax', 'yingYeTax', 'geTax', 'middleManFee'], function (type) {
               result[type] = price * $scope[type] / 100;
               subTotal += result[type];
            });

            result.subTotal = subTotal;
            console.log(result);
         };

      });

})(angular);
