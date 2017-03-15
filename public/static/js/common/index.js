(function() {
  var d = document;
  var w = window;
  var signedInBar = lazyQuerySelector('#login_menu_signed_on');
  var signedOffBar = lazyQuerySelector('#login_menu_signed_off');
  var logoutButton = lazyQuerySelector('#logout');
  var nameHolder = lazyQuerySelector('#login_menu_name');
  var data = {
    loaded: false,
    logged: false
  };
  var markedAsUpdated = false;

  function init() {
    axios('//my.handsontable.com/api/identity-checker', {withCredentials: true, method: 'get'})
        .then(onIdentitySuccess);
  }

  function onIdentitySuccess(response) {
    data = response.data;
    data.loaded = true;

    if (markedAsUpdated) {
      update();
    }
  }

  function onLogoutClick(event) {
    event.preventDefault();
    axios('//my.handsontable.com/api/sign-out', {withCredentials: true, method: 'get'});
    data.logged = false;
    update();
  }

  function update() {
    if (data.loaded) {
      nameHolder().textContent = data.firstName;

      if (data.logged) {
        signedOffBar().classList.add('hide');
        signedInBar().classList.remove('hide');
      } else {
        signedOffBar().classList.remove('hide');
        signedInBar().classList.add('hide');
      }
    }
    markedAsUpdated = true;
  }

  function lazyQuerySelector(selector) {
    return function() {
      return d.querySelector(selector);
    }
  }

  init();
  w.LoginBar = {update: update};

  d.addEventListener('DOMContentLoaded', function() {
    logoutButton().addEventListener('click', onLogoutClick);

    // click on external iframe snippet (https://gist.github.com/jaydson/1780598)
    var iframeMouseOver = false;

    window.addEventListener('blur', function() {
      if (iframeMouseOver) {
        dataLayer.push({'event': 'Github iframe click'});
      }
    });

    document.getElementById('github-star').addEventListener('mouseover', function() {
      iframeMouseOver = true;
    });
    document.getElementById('github-star').addEventListener('mouseout', function() {
      iframeMouseOver = false;
    });
    // end
  })
}());