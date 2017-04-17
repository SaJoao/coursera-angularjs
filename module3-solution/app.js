(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])

  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['$scope','MenuSearchService'];
  function NarrowItDownController($scope, MenuSearchService) {
    var ctrl = this;

    ctrl.getMatchedMenuItems = function() {

      if($scope.searchTerm) {
        MenuSearchService.getMatchedMenuItems($scope.searchTerm)
        .then(function(items) {
          ctrl.found = items;
          if(ctrl.found.length === 0) {
            ctrl.message = "Nothing found";
          } else {
            ctrl.message = "";
          }
        },
        function(error) {
          ctrl.message = "Nothing found";
          ctrl.found = [];
        });
      } else {
        ctrl.message = "Nothing found";
        ctrl.found = [];
      }
    }

    ctrl.remove = function(index) {
      ctrl.found.splice(index, 1);
      if(ctrl.found.length === 0) {
        ctrl.message = "No items left";
      }
    }
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var url = 'https://davids-restaurant.herokuapp.com/menu_items.json';
    var getAllMenuItems = function() {
      return $http(
        {
          url: url
        });
    }

    var processItems = function(searchTerm, items) {
      var filteredItems = [];
      var searchTermLower = searchTerm ? searchTerm.toLowerCase() : "";

      items.forEach(function(item){
        if(item.description.toLowerCase().indexOf(searchTermLower) >= 0) {
          filteredItems.push(item);
        }
      }, this);

      return filteredItems;
    }


    this.getMatchedMenuItems = function(searchTerm) {
      return getAllMenuItems()
        .then(function(response){
          return processItems(searchTerm, response.data.menu_items);
        });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundTemplate.html',
      scope: {
        items: '<found',
        message: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }
})();
