(function() {
  if (typeof mc !== 'undefined') {
    var orgSuccess = mc.ajaxOptions.success;

    mc.ajaxOptions.success = function(resp) {
      if (resp.result === 'success') {
        dataLayer.push({'event': 'Newsletter footer subscribe'});
      }
      orgSuccess(resp);
    }
  }

  var additionalForm = document.querySelector('#mc_embed_free form');

  if (additionalForm) {
    additionalForm.addEventListener('submit', function() {
      dataLayer.push({'event': 'Newsletter header subscribe'});
    });
  }

  var contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      dataLayer.push({'event': 'Contact form submit'});
    });
  }
}());