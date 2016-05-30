(function() {
  var d = document;
  var search = location.search;
  var TEST = true;

  var INTERNATIONALIZED_PRICES = [
    {
      countryCode: ['en-ca', 'fr-ca'],
      currency: 'CAD',
      formatCode: 'en',
      appendCurrencyCode: true,
      ratio: 1.3,
    },
    {
      countryCode: ['en-ie', 'cs', 'da', 'nl', 'fr', 'de', 'el', 'hu', 'it', 'la', 'lt', 'lb', 'no', 'nb', 'pl', 'pt', 'ro',
        'ru', 'sk', 'sl', 'sv', 'uk'],
      currency: 'EUR',
      formatCode: 'de',
      appendCurrencyCode: false,
      ratio: 0.9,
    },
    {
      countryCode: ['en-gb'],
      currency: 'GBP',
      formatCode: 'en-gb',
      appendCurrencyCode: false,
      ratio: 0.7,
    },
    {
      countryCode: ['ja'],
      currency: 'JPY',
      formatCode: 'ja',
      appendCurrencyCode: false,
      ratio: 110,
    },
    {
      countryCode: ['*'],
      currency: 'USD',
      formatCode: 'en',
      appendCurrencyCode: false,
      ratio: 1,
    },
  ];

  var DEVELOPER_LICENSE_PRICE = 490;
  var SUPPORT_DEVELOPER_PRICE = 720;
  var SUPPORT_RENEWAL_PRICE = 300;
  var SINGLE_WEBSITE_PRICE = 149;
  // var PAYMENTS_BASE_URL = 'https://sites.fastspring.com/handsontable/api/order';
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
        discount: 0,
        saves: 420,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 1,
        discount: 0,
        saves: 420,
        support: true,
      },
    },
    '5-developers': {
      basic: {
        name: '/developer-with-basic-support',
        quantity: 5,
        discount: 0.1,
        saves: 2100,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 5,
        discount: 0.1,
        saves: 2100,
        support: true,
      },
    },
    '10-developers': {
      basic: {
        name: '/developer-with-basic-support',
        quantity: 10,
        discount: 0.15,
        saves: 4200,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 10,
        discount: 0.15,
        saves: 4200,
        support: true,
      },
    },
  };

  var valueCarrier;

  function init() {
    var forms = d.querySelectorAll('form[data-product-type]');
    var currencyElements = d.querySelectorAll('a[data-currency]');
    var compareLicenses = d.querySelector('#compare-licenses');
    var compareLicensesExpander = d.querySelector('#compare-licenses-expander');

    var developerLicensePrice = d.querySelectorAll('.developer-license');
    var supportDeveloperPrice = d.querySelectorAll('.support-developer-price');
    var supportRenewalPrice = d.querySelectorAll('.support-renewal-price');
    var sibgleWebsitePrice = d.querySelectorAll('.single-website-price');

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
          form.appendChild(createInput('hidden', 'currency', valueCarrier.getCurrency()));
          form.appendChild(createInput('hidden', 'sessionOption', 'new'));
          // form.appendChild(createInput('hidden', 'member', 'new'));

          form.appendChild(submit);
          submit.click();

          event.preventDefault();
        };
      }(form));
    }

    forEachElements(currencyElements, function(element) {
      var currency = element.dataset.currency;

      if (currency === valueCarrier.getCurrency()) {
        element.classList.add('active');
      }
    });
    forEachElements(developerLicensePrice, function(element) {
      element.textContent = valueCarrier.formatPrice(DEVELOPER_LICENSE_PRICE);
    });
    forEachElements(supportDeveloperPrice, function(element) {
      element.textContent = valueCarrier.formatPrice(SUPPORT_DEVELOPER_PRICE);
    });
    forEachElements(supportRenewalPrice, function(element) {
      element.textContent = valueCarrier.formatPrice(SUPPORT_RENEWAL_PRICE);
    });
    forEachElements(sibgleWebsitePrice, function(element) {
      element.textContent = valueCarrier.formatPrice(SINGLE_WEBSITE_PRICE);
    });

    compareLicenses.addEventListener('click', function(event) {
      compareLicensesExpander.classList.toggle('closed');
      compareLicensesExpander.classList.toggle('opened');
      event.preventDefault();
    });
  }

  function onSubmitListener(form) {
    var productType = form.dataset.productType;
    var savesElement = form.querySelector('.saves');
    var priceElement = form.parentNode.parentNode.querySelector('.price');
    var supportTypeElement = form.querySelector('[name=extended_support]');
    var productPathElement = form.querySelector('[name=product_1_path]');
    var productInfo = PRODUCTS[productType][getSupportTypeFromElement()];

    valueCarrier = createValueCarrier(productInfo, getPriceInfo(getCurrency()));

    if (supportTypeElement) {
      supportTypeElement.addEventListener('click', function() {
        productInfo = PRODUCTS[productType][getSupportTypeFromElement()];
        valueCarrier = createValueCarrier(productInfo, getPriceInfo(getCurrency()));
        updatePrice();
      });
    }
    updatePrice();

    function getSupportTypeFromElement() {
      return (supportTypeElement || {}).checked ? 'extended' : 'basic';
    }

    function updatePrice() {
      if (priceElement) {
        priceElement.textContent = valueCarrier.getPrice();
      }
      if (savesElement) {
        savesElement.textContent = valueCarrier.getSavedPrice();
      }
    }

    return function() {
      productPathElement.value = productInfo.name;

      // form.action = PAYMENTS_BASE_URL + productInfo.name + '?member=new';
    };
  }

  function createInput(type, name, value) {
    var input = document.createElement('input');

    input.type = type || 'hidden';
    input.name = name || 'name';
    input.value = value === void 0 ? '' : value;

    return input;
  }

  function getCurrency() {
    var currency = search.match(/currency=([A-Z]{3})/);

    if (Array.isArray(currency)) {
      currency = currency[1];
    } else {
      currency = INTERNATIONALIZED_PRICES[INTERNATIONALIZED_PRICES.length - 1].currency;
    }

    return currency;
  }

  function getPriceInfo(currency) {
    var price = INTERNATIONALIZED_PRICES.filter(function(price) {
      return price.currency === currency;
    })[0];

    return {
      formatCode: price.formatCode,
      ratio: price.ratio,
      currency: price.currency,
      appendCurrencyCode: price.appendCurrencyCode,
    };
  }

  function createValueCarrier(productInfo, priceInfo) {
    numeral.language(priceInfo.formatCode);

    return {
      getPrice: function() {
        var base = DEVELOPER_LICENSE_PRICE;
        var support = 0;

        base = base * priceInfo.ratio;
        base = Math.ceil(base - (base * productInfo.discount));

        if (productInfo.support) {
          support = (SUPPORT_RENEWAL_PRICE * priceInfo.ratio) * productInfo.quantity;
        }

        return this._formatPrice((base * productInfo.quantity) + support);
      },

      getSavedPrice: function() {
        return this.formatPrice(productInfo.saves);
      },

      formatPrice(price) {
        return this._formatPrice(Math.ceil(price * priceInfo.ratio));
      },

      getCurrency: function() {
        return priceInfo.currency;
      },

      _formatPrice(price) {
        price = numeral(price).format('$0,0');

        if (priceInfo.appendCurrencyCode) {
          price += ' ' + this.getCurrency();
        }

        return price;
      },
    };
  }

  function forEachElements(elements, func) {
    return Array.prototype.forEach.call(elements, func);
  }

  init();
}());