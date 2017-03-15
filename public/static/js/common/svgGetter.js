function SvgGetter(filename) {

  if (!filename) {
    filename = 'icons';
  }

  var ajax = new XMLHttpRequest();
  ajax.open('GET', '/static/images/svg/' + filename + '.svg', true);
  ajax.send();
  ajax.onload = function(e) {
    var div = document.createElement('DIV');
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  }
}