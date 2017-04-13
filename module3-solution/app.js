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

      MenuSearchService.getMatchedMenuItems($scope.searchTerm)
      .then(function(items) {
        ctrl.found = items;
      },
      function(error) {
        ctrl.message = "Nothing found";
        ctrl.found = [];
      });
    }

    ctrl.remove = function(index) {
      ctrl.found.splice(index, 1);
      if(ctrl.found.length === 0) {
        ctrl.message = "No items left";
      }
    }
  }

  MenuSearchService.$inject = ['$http', '$q'];
  function MenuSearchService($http, $q) {
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

      var defer = $q.defer();
      if(!searchTerm) {
        defer.reject();
      }

      getAllMenuItems()
        .then(function(response){
          defer.resolve(processItems(searchTerm, response.data.menu_items));
        });

      return defer.promise;
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
