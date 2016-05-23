(function() {
  var d = document;
  var TEST = true;
  var PRODUCTS = {
    'single-website': {
      basic: {
        name: '/single-website-with-basic-support',
        quantity: 1,
      },
    },
    'single-developer': {
      basic: {
        name: '/developer-with-basic-support',
        quantity: 1,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 1,
      }
    },
    '5-developers': {
      basic: {
        name: '/developer-with-basic-support',
        quantity: 5,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 5,
      }
    },
    '10-developers': {
      basic: {
        name: '/developer-with-basic-support',
        quantity: 10,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 10,
      }
    },
  };

  function init() {
    var forms = d.querySelectorAll('form[data-product-type]');
    var compareLicenses = d.querySelector('#compare-licenses');
    var compareTables = d.querySelector('#compare-tables');

    for (var i = 0, len = forms.length; i < len; i++) {
      var form = forms[i];

      form.addEventListener('submit', onSubmitListener(form));

      d.querySelector('a[data-product-type="' + form.dataset.productType + '"]').addEventListener('click', function(form) {
        return function(event) {
          var submit = createInput('submit');

          submit.style.display = 'none';

          if (TEST) {
            form.appendChild(createInput('hidden', 'mode', 'test'));
          }
          form.appendChild(submit);
          submit.click();

          event.preventDefault();
        };
      }(form));
    }

    compareLicenses.addEventListener('click', function(event) {
      compareTables.classList.toggle('expand');
      event.preventDefault();
    });

    function onSubmitListener(form) {
      var productType = form.dataset.productType;
      var quantityElement = form.querySelector('[name=product_1_quantity]');
      var productPathElement = form.querySelector('[name=product_1_path]');

      return function() {
        var supportType = (form.querySelector('[name=extended_support]') || {}).checked ? 'extended' : 'basic';
        var productInfo = PRODUCTS[productType][supportType];

        quantityElement.value = productInfo.quantity;
        productPathElement.value = productInfo.name;
      };
    }

    function createInput(type, name, value) {
      var input = document.createElement('input');

      input.type = type || 'hidden';
      input.name = name || 'name';
      input.value = value === void 0 ? '' : value;

      return input;
    }
  }

  init();
}());