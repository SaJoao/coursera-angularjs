(function(){
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', [ '$scope', function($scope) {

    $scope.checkIfToMuch = function() {

      if($scope.lunchItems.length == 0) {
        $scope.message = "Please enter data first";
      } else {
        var lunchItemsArray = $scope.lunchItems.split(",");
        if(lunchItemsArray.length <= 3) {
          $scope.message = "Enjoy!";
        } else {
          $scope.message = "Too much!";
        }
      }
    }

    $scope.clear = function() {
      $scope.lunchItems = "";
      $scope.message = "";
    }

    $scope.clear();

  } ])
})();
