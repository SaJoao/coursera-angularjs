(function(){
"use strict";

angular.module('public')

.controller('SignController', SignController);

SignController.$inject = ['MenuService', 'InfoService'];
function SignController(MenuService, InfoService){
  var ctrl = this;

  ctrl.user = {};
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
      });
    }

    InfoService.saveInfo(ctrl.user);
    ctrl.saved = true;
  };

}

})()
