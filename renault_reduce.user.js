// ==UserScript==
// @id       renault_occas_reduce
// @name     Reduit Occas Renault
// @version  0.1
// @grant    none
// @author   vicnet
// @description Cache les véhicules non souhaités
// @include https://occasion.renault.fr/vehicules.html*
// ==/UserScript==

;(function() {
  'use strict';
  
  function hide(text) {
    var vehicules = document.querySelectorAll('.VehicleList__item');
    for (var vehicule of vehicules) {
        if (!vehicule) continue;
        var title = vehicule.querySelectorAll('.VehicleItem__subTitle')[0];
        if (!title) continue;
//        console.log('title ' + title);
        if (title.innerHTML.includes(text)) {
        vehicule.remove();
        }
    }
  }
  
  function hideAll() {
    console.log('---------------hideAll--------------');
    hide('FOURGON');
    hide('L2');
    hide('FG ');
  }
  
  setTimeout(hideAll, 500);

})();
