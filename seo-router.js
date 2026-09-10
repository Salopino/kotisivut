(function () {
  "use strict";

  var base = "https://www.kuvauspalvelusalopino.fi";
  var routes = {
    etusivu: ["/", "Kuvauspalvelu Salopino Oy – 3D-, drone- ja lämpökuvaus | Pirkanmaa", "Kiinteistöjen 3D-kuvaus, drone- ja lämpökuvaus, ortokuvat ja pistepilvet yhdeltä toimijalta. Yli 110 000 m² kuvattua tilaa. Pirkanmaa ja koko Suomi."],
    matterport: ["/3d-kuvaus/", "3D-kuvaus ja virtuaalikierrokset kiinteistöille | Salopino", "Matterport Pro3 -LiDARilla toteutettu 3D-kuvaus, virtuaalikierros, dollhouse-näkymä ja pohjapiirros. Palvelu Pirkanmaalla ja koko Suomessa."],
    drone: ["/dronekuvaus/", "Dronekuvaus kiinteistöille ja työmaille | Salopino", "Ammattimainen dronekuvaus, ilmakuvat, 4K-video, tarkastuslennot ja työmaaseuranta. Vakuutettu ja Traficom-hyväksytty toimija koko Suomessa."],
    lampo: ["/lampokuvaus/", "Drone-lämpökuvaus kiinteistöille ja aurinkopaneeleille", "Radiometrinen drone-lämpökuvaus paljastaa lämpövuodot, kosteusriskit ja aurinkopaneelien viat. Palvelu taloyhtiöille ja yrityksille koko Suomessa."],
    orto: ["/ortokuvaus-ja-kartoitus/", "Ortokuvat ja RTK-kartoitus suunnitteluun | Salopino", "RTK-korjatut ortokuvat, GeoTIFF-aineistot, korkeusmallit ja pistepilvet tonttien, infran ja työmaiden suunnitteluun."],
    perehdytys: ["/virtuaaliperehdytys/", "Virtuaaliperehdytys ja turvallisuuskierrokset | Salopino", "Perehdytä henkilöstö ja alihankkijat kiinteistöön etänä. Kulkureitit, turvallisuusohjeet, videot ja dokumentit samassa 3D-ympäristössä."],
    pistepilvi: ["/pistepilvi-e57/", "Pistepilvi E57 ja BIM-valmis 3D-aineisto | Salopino", "Mittatarkka E57-pistepilvi saneeraussuunnitteluun, as-built-dokumentointiin ja CAD/BIM-työskentelyyn Matterport Pro3 -LiDARilla."],
    referenssit: ["/referenssit/", "Referenssit – 3D-, drone- ja lämpökuvaukset | Salopino", "Tutustu Kuvauspalvelu Salopino Oy:n toteutuksiin kiinteistöissä, teollisuudessa, museoissa, tapahtumatiloissa ja taloyhtiöissä."],
    blogi: ["/oppaat/", "Oppaat – 3D-kuvaus, drone, lämpö ja kartoitus", "Käytännön oppaita kiinteistöjen 3D-kuvauksesta, dronekuvauksesta, lämpökartoituksesta, ortokuvista ja pistepilviaineistoista."],
    meista: ["/meista/", "Kuvauspalvelu Salopino Oy ja Jari Salopino", "Lempääläläinen yhden yhteyshenkilön kuvaus- ja kartoituspalvelu. Yli 110 000 m² kuvattua tilaa ja toiminta-alueena koko Suomi."],
    yhteystiedot: ["/yhteystiedot/", "Yhteystiedot ja tarjouspyyntö | Kuvauspalvelu Salopino Oy", "Pyydä tarjous kiinteistön 3D-, drone- tai lämpökuvauksesta. Kuvauspalvelu Salopino Oy palvelee Pirkanmaalla ja koko Suomessa."],
    "ref-finlayson": ["/referenssit/finlayson-varma/", "Finlayson ja Varma – 3D-virtuaalimallit | Referenssi", "Finlaysonin alueen Vooningin, Terden ja kokouskeskuksen 3D-virtuaalimallit tilaesittelyihin."],
    "ref-samtek": ["/referenssit/samtek-pistepilvi/", "Samtek – E57-pistepilvi teollisuuden suunnitteluun", "Teollisen putkilinja-alueen mittatarkka 3D-dokumentointi, E57-pistepilvi ja DWG-yhteensopiva aineisto."],
    "ref-panssari": ["/referenssit/panssarimuseo/", "Panssarimuseon 3D-virtuaalimuseo | Referenssi", "Koko Panssarimuseon alueen 3D-kuvaus avasi kokoelman verkossa tietokoneelle, mobiililaitteille ja VR-laseille."],
    "ref-sointu": ["/referenssit/sointu-virtuaaliperehdytys/", "Sointu – 3D-virtuaaliperehdytys | Referenssi", "3D-mallit osana turvallisuus- ja perehdytyssuunnitelmaa auttavat työntekijöitä tutustumaan tiloihin ennakkoon."],
    "ref-asoy": ["/referenssit/as-oy-torisevankallio/", "Taloyhtiön ulkovaipan drone-lämpökuvaus | Referenssi", "As Oy Torisevankallion julkisivun, elementtisaumojen, katon ja lämpöhäviöiden kuvaus dronella."],
    "ref-tmk": ["/referenssit/tampereen-messu-ja-urheilukeskus/", "Messu- ja Urheilukeskuksen lämpökuvaus | Referenssi", "Tampereen Messu- ja Urheilukeskuksen 32 000 m² kiinteistö kuvattiin lämpökameralla kunnon arvioinnin tueksi."],
    "ref-plevna": ["/referenssit/panimoravintola-plevna/", "Panimoravintola Plevnan 3D-virtuaalikierros", "Plevnan muunneltavien tilojen 3D-kierros auttaa arvioimaan tunnelmaa, kulkureittejä ja soveltuvuutta ennen varausta."]
  };

  var byPath = {};
  Object.keys(routes).forEach(function (key) { byPath[routes[key][0]] = key; });
  var pathname = location.pathname.replace(/\/index\.html$/, "/");
  if (pathname.length > 1 && pathname.slice(-1) !== "/") pathname += "/";
  window.__INITIAL_PAGE__ = byPath[pathname] || "etusivu";

  function setMeta(selector, attribute, value) {
    var element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
  }

  window.__setSeoRoute = function (key, replace) {
    var route = routes[key] || routes.etusivu;
    document.title = route[1];
    setMeta('meta[name="description"]', "content", route[2]);
    setMeta('meta[property="og:title"]', "content", route[1]);
    setMeta('meta[property="og:description"]', "content", route[2]);
    setMeta('meta[property="og:url"]', "content", base + route[0]);
    setMeta('meta[name="twitter:title"]', "content", route[1]);
    setMeta('meta[name="twitter:description"]', "content", route[2]);
    setMeta('link[rel="canonical"]', "href", base + route[0]);
    if (location.pathname !== route[0]) {
      history[replace ? "replaceState" : "pushState"]({page: key}, "", route[0]);
    }
  };

  window.__setSeoRoute(window.__INITIAL_PAGE__, true);
  window.addEventListener("popstate", function () { location.reload(); });
})();
