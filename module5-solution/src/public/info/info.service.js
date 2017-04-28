(function(){
"use strict";

angular.module('public')
.service('InfoService', InfoService);

function InfoService() {
  var infoServ = this;
  var info = {};

  infoServ.saveInfo = function(infoIn) {
      info = infoIn;
  }

  infoServ.getInfo = function() {
      return info;
  }
}
})();
