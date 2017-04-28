(function(){
"use strict";

angular.module('public')

.controller('SignController', SignController)

.directive('favoriteValidator', FavoriteValidator);

SignController.$inject = ['MenuService', 'InfoService'];
function SignController(MenuService, InfoService){
  var ctrl = this;

  ctrl.user = InfoService.getInfo();
  ctrl.invalidItem = false;
  ctrl.saved = false;

  this.submit = function(){

    if(ctrl.user.favorite) {
      ctrl.invalidItem = false;
      ctrl.user.menuItem = {};
      MenuService.getMenuItem(ctrl.user.favorite)
      .then(function(data){
        ctrl.user.menuItem = data;
      }, function(){
        ctrl.invalidItem = true;
        ctrl.user.menuItem = undefined;
      });
    }

    InfoService.saveInfo(ctrl.user);
    ctrl.saved = true;
  };

}

FavoriteValidator.$inject = ['MenuService', 'InfoService', '$q'];
function FavoriteValidator(MenuService,InfoService, $q){
return{
  require:'ngModel',
  link: function($scope, element, attrs, ngModel){
    ngModel.$asyncValidators.favorite =
      function(modelValue, viewValue) {
       var value = modelValue || viewValue;
       return MenuService.getMenuItem(value)
         .then(function(data){
           InfoService.setMenuItem(data);
           return true;
         }, function(){
             return $q.deferred().reject('ko');
         });
      }
    }
  }
};

})()
