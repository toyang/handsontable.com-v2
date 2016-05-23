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
        price: 490,
        saves: 420,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 1,
        price: 790,
        saves: 420,
      },
    },
    '5-developers': {
      basic: {
        name: '/developer-with-basic-support',
        quantity: 5,
        price: 2205,
        saves: 2100,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 5,
        price: 3705,
        saves: 2100,
      },
    },
    '10-developers': {
      basic: {
        name: '/developer-with-basic-support',
        quantity: 10,
        price: 4165,
        saves: 4200,
      },
      extended: {
        name: '/developer-with-extended-support',
        quantity: 10,
        price: 7165,
        saves: 4200,
      },
    },
  };

  var valueCarrier;

  function init() {
    var forms = d.querySelectorAll('form[data-product-type]');
    var currencyElements = d.querySelectorAll('a[data-currency]');
    var compareLicenses = d.querySelector('#compare-licenses');

    var developerLicensePrice = d.querySelectorAll('.developer-license');
    var supportDeveloperPrice = d.querySelectorAll('.support-developer-price');
    var supportRenewalPrice = d.querySelectorAll('.support-renewal-price');

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

    compareLicenses.addEventListener('click', function(event) {
      compareLicenses.classList.toggle('closed');
      compareLicenses.classList.toggle('opened');
      event.preventDefault();
    });
  }

  function onSubmitListener(form) {
    var productType = form.dataset.productType;
    var quantityElement = form.querySelector('[name=product_1_quantity]');
    var productPathElement = form.querySelector('[name=product_1_path]');
    var savesElement = form.querySelector('.saves');
    var priceElement = form.parentNode.parentNode.querySelector('.price');
    var supportTypeElement = form.querySelector('[name=extended_support]');
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

  function getCurrency() {
    var currency = search.match(/currency=([A-Z]{3})/);
    var lang = (navigator.language || 'en').toLowerCase();

    if (Array.isArray(currency)) {
      currency = currency[1];
    } else {
      currency = INTERNATIONALIZED_PRICES.filter(function(price) {
        return isLanguageMatches(price.countryCode, lang);
      })[0].currency;
    }

    return currency;
  }

  function isLanguageMatches(languages, langToMatch) {
    return languages.some(function(lang) {
      if (lang === '*') {
        return true;
      }
      var globalSearch = lang.indexOf('-') === -1;

      return langToMatch === lang || (globalSearch ? langToMatch.replace(/\-\w+/, '') === lang : false);
    });
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
        return this.formatPrice(productInfo.price);
      },

      getSavedPrice: function() {
        return this.formatPrice(productInfo.saves);
      },

      formatPrice(price) {
        price = numeral(price * priceInfo.ratio).format('$0,0');

        if (priceInfo.appendCurrencyCode) {
          price += ' ' + this.getCurrency();
        }

        return price;
      },

      getCurrency: function() {
        return priceInfo.currency;
      }
    };
  }

  function forEachElements(elements, func) {
    return Array.prototype.forEach.call(elements, func);
  }

  init();
}());