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
    document.querySelector('#mc_embed_free form').addEventListener('submit', function() {
      dataLayer.push({'event': 'Newsletter header subscribe'});
    });
  }
}());