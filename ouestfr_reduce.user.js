// ==UserScript==
// @id       ouestfr_reduce
// @name     Reduit OuestFrance-Auto
// @version  1
// @grant    none
// @author   vicnet
// @description Cache les véhicules non souhaités
// @include  https://www.ouestfrance-auto.com/voiture-occasion/*
// ==/UserScript==

;(function() {
  'use strict';
  
  function hide(text) {
    var autos = document.querySelectorAll('div.list-group-item');
    //console.log('Véhicules trouvés pour "'+text+'":', autos.length);
    for (var auto of autos) {
      var titre = auto.querySelector("a.tracking-algolia");
      //console.log('VO: trouvé:', titre.innerHTML);
      if (titre && titre.innerHTML.includes(text)) {
        //console.log('Supprime:', texte.innerHTML);
        auto.remove();
      }
    }
  }
  
  function hideAll() {
    hide('FOURGON');
    hide('L2');
    hide('FG ');
  }
  
  setTimeout(hideAll, 500);

})();
