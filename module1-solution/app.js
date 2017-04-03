(function(){
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', [ '$scope', function($scope) {

    $scope.checkIfToMuch = function() {

      if($scope.lunchItems.length == 0) {
        $scope.message = "Please enter data first";
      } else {
        var itemsObj = processItems($scope.lunchItems);
        $scope.emptyItems = itemsObj.emptyItems;

        if(itemsObj.items.length <= 3) {
          $scope.message = "Enjoy!";
        } else {
          $scope.message = "Too much!";
        }
      }
    }

    $scope.clear = function() {
      $scope.lunchItems = "";
      $scope.message = "";
      $scope.emptyItems = false;
    }

    function myTrim(x) {
        return x.replace(/^\s+|\s+$/gm,'');
    }

    function processItems(items) {

      var ret = {};
      ret.emptyItems = false;
      ret.items = [];

      var itemsArray = $scope.lunchItems.split(",");
      itemsArray.forEach(function(item, idx) {
        var tItem = item.trim();
        if( tItem === "" || tItem === " " ) {
          ret.emptyItems = true;
        } else {
          ret.items.push(item);
        }
      })

      return ret;
    }

    
    $scope.clear();

  } ])
})();
