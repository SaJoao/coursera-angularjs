(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/home/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/categories/categories.template.html',
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categories.items', {
    //url: '/item-detail/{categoryId}',
    templateUrl: 'src/items/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      items: ['$stateParams', 'MenuDataService','categories',
        function ($stateParams, MenuDataService, categories) {
          return MenuDataService.getItemsForCategory(
            categories[$stateParams.categoryId].short_name)
            then(function(result){
              return result.menu_items;
            });
      }]
    },
    params: {
      categoryId: null
    }
  });
}

})();
