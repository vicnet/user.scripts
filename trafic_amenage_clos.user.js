// ==UserScript==
// @id       trafic_amenage_clos
// @name     Clos forum Trafic
// @version  1
// @grant    none
// @author   vicnet
// @description Cache les véhicules non souhaités
// @include  http://www.trafic-amenage.com/forum/search.php?search_id=newposts*
// ==/UserScript==

;(function() {
  'use strict';

  var navs = document.querySelectorAll("td span.nav");
  var nav = navs[navs.length-1];
  if (nav.innerHTML!=="") {
    var parent = nav.parentNode;
    var br = document.createElement("br");
    parent.prepend(br);
    nav = document.createElement("span");
    parent.prepend(nav);
  }
  nav.className="gensmall";
  
  var a = document.createElement("a");
  a.textContent = "Marquer tous les forums comme lus";
  a.href = "index.php?mark=forums";
  nav.appendChild(a);
    
})();
