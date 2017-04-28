(function(){
"strict"

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['info', 'ApiPath'];
function InfoController(info, ApiPath){
  var ctrl = this;

  ctrl.info = info;
  ctrl.basePath = ApiPath;
}



})();
