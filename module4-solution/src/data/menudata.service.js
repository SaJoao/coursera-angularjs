(function () {
'use strict';

angular.module('data')
.constant('BaseUrl', 'https://davids-restaurant.herokuapp.com/')
.service('MenuDataService', MenuDataServiceController);

MenuDataServiceController.$inject = ['BaseUrl', '$http'];
function MenuDataServiceController(BaseUrl, $http){
  var data = this;

  data.getAllCategories = function() {
    return $http({
      method: 'GET',
      url: BaseUrl + 'categories.json'
    })
    .then(function(response){
      return response.data;
    });
  };

  data.getItemsForCategory = function(categoryShortName){
    return $http({
        method: 'GET',
        url: BaseUrl + 'menu_items.json?category=' + categoryShortName
    })
    .then(function(response){
      return response.data.menu_items;
    });
  };

}

})();
