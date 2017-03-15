document.addEventListener("DOMContentLoaded", function() {

  var versionLinks = document.querySelectorAll('.choose-version ul li');

  for (var i = 0; i < versionLinks.length; i++) {
    var link = versionLinks[i].getElementsByTagName('a')[0];

    link.addEventListener('click', function(event) {
      if (event.target.className.indexOf('active') > -1) {
        return;
      }

      event.target.className += ' active';

      var featureList = document.getElementById('feature-list');
      if (event.target.className.indexOf('pro') === 0) {
        featureList.className += ' pro-enabled';
      } else {
        featureList.className = featureList.className.replace('pro-enabled', '').replace('  ',' ');
      }

      for (var j = 0; j < versionLinks.length; j++) {
        var link = versionLinks[j].getElementsByTagName('a')[0];

        if (link !== event.target) {
          link.className = link.className.replace('active', '').replace('  ',' ');
        }
      }
    });
  }

});