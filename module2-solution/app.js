(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])

  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .factory('ShoppingListFactory', ShoppingListFactory)

  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function ToBuyController($scope, ShoppingListCheckOffService)   {
    $scope.buyList = ShoppingListCheckOffService.buyList;
    $scope.buy = ShoppingListCheckOffService.buy;
  }

  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function AlreadyBoughtController($scope, ShoppingListCheckOffService)   {
    $scope.boughtList = ShoppingListCheckOffService.boughtList;
    $scope.cancel = ShoppingListCheckOffService.cancel;
  }

  ShoppingListCheckOffService.$inject = ['ShoppingListFactory'];
  function ShoppingListCheckOffService(ShoppingListFactory) {
    var service = this;

    var buyListService = ShoppingListFactory();
    buyListService.addItem('Cookies', 10)
      .addItem('Tea', 3)
      .addItem('Bread', 2)
      .addItem('Oranges', 10)
      .addItem('Iogurt', 6)
      .addItem('Eggs', 12);

    service.buyList = buyListService.getItemsList();

    var boughtListService = ShoppingListFactory();
    service.boughtList = boughtListService.getItemsList()

    service.buy = function(index) {
      var item = buyListService.getItem(index);
      boughtListService.addItem(item.name, item.quantity);
      buyListService.removeItem(index);
    }

    service.cancel = function(index) {
      var item = boughtListService.getItem(index);
      buyListService.addItem(item.name, item.quantity);
      boughtListService.removeItem(index);
    }
  }


  function ShoppingList() {
    var itemList = [];

    this.addItem = function(name, quantity) {
      var item = {'name': name, 'quantity': quantity };
      itemList.push(item);
      return this;
    }

    this.getItem = function(index) {
      return itemList[index];
    }

    this.removeItem = function(index) {
      itemList.splice(index, 1);
    }

    this.getItemsList = function() {
      return itemList;
    }
  }

  function ShoppingListFactory() {
    var factory = function() {
      return new ShoppingList();
    };
    return factory;
  }

})();
