(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])

  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService);

  NarrowItDownController.$inject = ['$scope','MenuSearchService'];
  function NarrowItDownController($scope, MenuSearchService) {
    var ctrl = this;

    ctrl.getMatchedMenuItems = function() {

      MenuSearchService.getMatchedMenuItems($scope.searchTerm)
      .then(function(items) {
        ctrl.found = items;
      },
      function(error) {
        ctrl.found = [];
      });
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
      items.forEach(function(item){
        if(item.description.indexOf(searchTerm) >= 0) {
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

})();
