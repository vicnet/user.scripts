// ==UserScript==
// @id       lacentrale_reduce
// @name     Reduit LaCentrale
// @version  1
// @grant    none
// @author   vicnet
// @description Cache les véhicules non souhaités
// @include  https://www.lacentrale.fr/listing?*
// ==/UserScript==

;(function() {
  'use strict';
  
  function hide(text) {
    var ads = document.querySelectorAll('div.adLineContainer');
    //console.log('VO: trouvé pour "'+text+'":', ads.length);
    for (var ad of ads) {
      var span = ad.querySelector("span.searchCard__version");
      //console.log('VO: trouvé:', span.innerHTML);
      if (span && span.innerHTML.includes(text)) {
        //console.log('VO: remove:', span.innerHTML);
        ad.remove();
      }
    }
  }
  
  function hideAll() {
    hide('FOURGON');
    hide('L2');
    hide('FG ');
  }
  
  setTimeout(hideAll, 3000);

})();
