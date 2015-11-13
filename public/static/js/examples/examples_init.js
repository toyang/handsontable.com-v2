var examples;

document.addEventListener("DOMContentLoaded", function() {

  var bindMenuHeaderEvents = function() {
    var accordionHeaders = document.querySelectorAll('div[aria-expanded] h5');
    for (var i in accordionHeaders) {
      if (accordionHeaders.hasOwnProperty(i)) {
        accordionHeaders[i].addEventListener('click', function(event) {
          var section = event.target.parentNode;
          section.setAttribute('aria-expanded', section.getAttribute('aria-expanded') !== 'true');
        });
      }
    }
  }();

  var bindTabChangingEvents = function() {
    var tabButtons = document.querySelectorAll('.code-box ul li:not(.action-link) a');
    Handsontable.helper.arrayEach(tabButtons, function(tabButton) {
      tabButton.addEventListener('click', function(event) {
        var target = event.target;
        var tab = document.getElementById(target.id.replace('-link',''));

        target.setAttribute('aria-selected', 'true');
        tab.setAttribute('aria-hidden', 'false');

        Handsontable.helper.arrayEach(tabButtons, function(tb) {
          if (tb !== tabButton) {
            var tab = document.getElementById(tb.id.replace('-link',''));

            tb.setAttribute('aria-selected', 'false');
            tab.setAttribute('aria-hidden', 'true');
          }
        });

      });
    });
  }();



  //var dataObject = [
  //  {price: 12, date: '01/01/2015', percent: 5,},
  //  {price: 33, date: '2/12/2015', percent: 3,},
  //  {price: 104, date: '11/20/2015', percent: 63,},
  //  {price: 264, date: '5/31/2016', percent: 99,},
  //  {price: 5, date: '2/28/2014', percent: 25,}
  //];
  var hotElement = document.querySelector('#hot');
  var hotElementContainer = hotElement.parentNode;
  var hotSettings = {
    //data: dataObject,
    data: Handsontable.helper.createSpreadsheetData(40,40),
    width: parseInt(hotElementContainer.offsetWidth, 10),
    height: 400
  };

  var hot = new Handsontable(hotElement, hotSettings);

  examples = new Examples(hot, [
    {
      name: 'headers',
      label: 'Headers',
      description: 'Enable the table headers.',
      configObject: {
        rowHeaders: true,
        colHeaders: true
      }
    },
    {
      name: 'fixed',
      label: 'Fixed rows/columns',
      description: 'Add fixed rows on the top and fixed columns on the left-side of the table.',
      configObject: {
        fixedRowsTop: 2,
        fixedColumnsLeft: 2
      }
    },
    {
      name: 'sorting',
      label: 'Sorting',
      description: 'Enable sorting for the column data.',
      configObject: {
        columnSorting: true
      },
      dependencies: [
        'headers'
      ]
    }
  ], [
    {
      name: 'fixed-bottom',
      label: 'Fixed bottom rows',
      description: 'Add fixed rows on the bottom of the table.',
      configObject: {
        fixedRowsBottom: 2
      }
    },
    {
      name: 'calculations',
      label: 'Basic calculations',
      description: 'Allow making some simple calculations, such as sum, avarage (...).',
      configObject: {
        whatever: true
      }
    },
    {
      name: 'nested',
      label: 'Nested Headers',
      description: 'Allow creating a nested header structure.',
      configObject: {
        nestedHeaders: true
      }
    }
  ]);

  examples.setHOTsettings(hotSettings);
  examples.syncFeatures();
  examples.bindEvents();

  document.querySelector('#data-tab p').textContent = JSON.stringify(hot.getSettings().data);
});