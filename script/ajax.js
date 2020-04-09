export default class ajax {
  static get = (url, async) => {
    var xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", url, async);
    xmlhttp.send(null);
    return xmlhttp.response;
  }
};


/* 
setInterval( () => {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("GET", "http://davos.science.upm.ro/~traian/web_curs/ap_electric.php", false);
  xmlhttp.send(null);
  var xmlDoc = new DOMParser().parseFromString(xmlhttp.response, "text/xml");
  console.log(xmlDoc);
  var responseValue = xmlDoc.documentElement.childNodes[21].textContent;
  console.log(responseValue);
}, 1000);
*/