var examples;

document.addEventListener("DOMContentLoaded", function() {
  var jsFiddleExporter = new JsfiddleExporter();

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

  var bindJsFiddleButton = function() {
    var link = document.getElementById('jsfiddle-link');
    link.addEventListener('click', function(event) {
      jsFiddleExporter.export(true);
    });
  }();

  var bindTabChangingEvents = function() {
    var tabButtons = document.querySelectorAll('.code-box ul li:not(.action-link) a');
    Handsontable.helper.arrayEach(tabButtons, function(tabButton) {
      tabButton.addEventListener('click', function(event) {
        var target = event.target;
        var tab = document.getElementById(target.id.replace('-link', ''));

        target.setAttribute('aria-selected', 'true');
        tab.setAttribute('aria-hidden', 'false');

        Handsontable.helper.arrayEach(tabButtons, function(tb) {
          if (tb !== tabButton) {
            var tab = document.getElementById(tb.id.replace('-link', ''));

            tb.setAttribute('aria-selected', 'false');
            tab.setAttribute('aria-hidden', 'true');
          }
        });

      });
    });
  }();


  var dataObject = [
    {flag: '', currencyCode: 'EUR', currency: 'Euro',	level: 0.9033, units: 'EUR per USD', asOf: '19-Aug-2015', onedChg: '0.26%'},
    {flag: '', currencyCode: 'JPY', currency: 'Japanese Yen', level: 124.3870, units: 'JPY per USD', asOf: '19-Aug-2015', onedChg: '0.01%'},
    {flag: '', currencyCode: 'GBP', currency: 'Pound Sterling', level: 0.6396, units: 'GBP per USD', asOf: '19-Aug-2015', onedChg: '0.00%'},
    {flag: '', currencyCode: 'CHF', currency: 'Swiss Franc',	level: 0.9775, units: 'CHF per USD', asOf: '19-Aug-2015', onedChg: '0.08%'},
    {flag: '', currencyCode: 'CAD', currency: 'Canadian Dollar',	level: 1.3097, units: 'CAD per USD', asOf: '19-Aug-2015', onedChg: '-0.0'},
    {flag: '', currencyCode: 'AUD', currency: 'Australian Dollar',	level: 1.3589, units: 'AUD per USD', asOf: '19-Aug-2015', onedChg: '0.20%'},
    {flag: '', currencyCode: 'NZD', currency: 'New Zealand Dollar',	level: 1.5218, units: 'NZD per USD', asOf: '19-Aug-2015', onedChg: '-0.3'},
    {flag: '', currencyCode: 'SEK', currency: 'Swedish Krona',	level: 8.5280, units: 'SEK per USD', asOf: '19-Aug-2015', onedChg: '0.16%'},
    {flag: '', currencyCode: 'NOK', currency: 'Norwegian Krone',	level: 8.2433, units: 'NOK per USD', asOf: '19-Aug-2015', onedChg: '0.08%'},
    {flag: '', currencyCode: 'BRL', currency: 'Brazilian Real',	level: 3.4806, units: 'BRL per USD', asOf: '19-Aug-2015', onedChg: '-0.0%'},
    {flag: '', currencyCode: 'CNY', currency: 'Chinese Yuan Renminbi',	level: 6.3961, units: 'CNY per USD', asOf: '19-Aug-2015', onedChg: '0.04%'},
    {flag: '', currencyCode: 'RUB', currency: 'Russian Rouble',	level: 65.5980, units: 'RUB per USD', asOf: '19-Aug-2015', onedChg: '0.59%'},
    {flag: '', currencyCode: 'INR', currency: 'Indian Rupee',	level: 65.3724, units: 'INR per USD', asOf: '19-Aug-2015', onedChg: '0.26%'},
    {flag: '', currencyCode: 'TRY', currency: 'New Turkish Lira',	level: 2.8689, units: 'TRY per USD', asOf: '19-Aug-2015', onedChg: '0.92%'},
    {flag: '', currencyCode: 'THB', currency: 'Thai Baht',	level: 35.5029, units: 'THB per USD', asOf: '19-Aug-2015', onedChg: '0.44%'},
    {flag: '', currencyCode: 'IDR', currency: 'Indonesian Rupiah',	level: 13.83, units: 'IDR per USD', asOf: '19-Aug-2015', onedChg: '-0.10%'},
    {flag: '', currencyCode: 'MYR', currency: 'Malaysian Ringgit',	level: 4.0949, units: 'MYR per USD', asOf: '19-Aug-2015', onedChg: '0.10%'},
    {flag: '', currencyCode: 'MXN', currency: 'Mexican New Peso',	level: 16.4309, units: 'MXN per USD', asOf: '19-Aug-2015', onedChg: '0.17%'},
    {flag: '', currencyCode: 'ARS', currency: 'Argentinian Peso',	level: 9.2534, units: 'ARS per USD', asOf: '19-Aug-2015', onedChg: '0.11%'},
    {flag: '', currencyCode: 'DKK', currency: 'Danish Krone',	level: 6.7417, units: 'DKK per USD', asOf: '19-Aug-2015', onedChg: '0.25%'},
    {flag: '', currencyCode: 'ILS', currency: 'Israeli New Sheqel',	level: 3.8262, units: 'ILS per USD', asOf: '19-Aug-2015', onedChg: '0.84%'},
    {flag: '', currencyCode: 'PHP', currency: 'Philippine Peso',	level: 46.3108, units: 'PHP per USD', asOf: '19-Aug-2015', onedChg: '0.12%'}
  ];
  var hotElement = document.querySelector('#hot');
  var hotElementContainer = hotElement.parentNode;
  var hotSettings = {
    data: dataObject,
    //data: Handsontable.helper.createSpreadsheetData(40, 40),
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
        colHeaders: ['Country', 'Currency Code', 'Currency', 'Level', 'Units', 'As Of', '1D Chng']
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
    },
    {
      name: 'merge-cells',
      label: 'Merge Cells',
      description: 'Enable possibility to merge cells.',
      configObject: {
        mergeCells: true
      },
      dependencies: [
        'context-menu'
      ]
    },
    {
      name: 'manual-resize',
      label: 'Row/Column Resize',
      description: 'Allow resizing of rows and/or columns.',
      configObject: {
        manualRowResize: true,
        manualColumnResize: true
      },
      dependencies: [
        'headers'
      ]
    },
    {
      name: 'manual-move',
      label: 'Row/Column Move',
      description: 'Allow moving of rows and/or columns.',
      configObject: {
        manualRowMove: true,
        manualColumnMove: true
      },
      dependencies: [
        'headers'
      ]
    },
    {
      name: 'conditional-formatting',
      label: 'Conditional Formatting',
      description: 'Allow conditional cell formatting.',
      configObject: {
        afterChange: function() {
          console.log('wat');
        }
      }
    },
    {
      name: 'context-menu',
      label: 'Context Menu',
      description: 'Enable the context menu.',
      configObject: {
        contextMenu: true
      }
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
      name: 'column-summary',
      label: 'Basic calculations',
      description: 'Allow making some simple calculations, such as sum, average (...).',
      configObject: {
        columnSummary: [
          {
            destinationColumn: 2,
            destinationRow: 2,
            reversedRowCoords: true,
            type: 'min',
            forceNumeric: true,
            suppressDataTypeErrors: true
          },
          {
            destinationColumn: 2,
            destinationRow: 1,
            reversedRowCoords: true,
            type: 'max',
            forceNumeric: true,
            suppressDataTypeErrors: true
          },
          {
            destinationColumn: 2,
            destinationRow: 52,
            type: 'sum',
            forceNumeric: true,
            suppressDataTypeErrors: true
          }]
      }
    },
    {
      name: 'nested-headers',
      label: 'Nested Headers',
      description: 'Allow creating a nested header structure.',
      configObject: {
        nestedHeaders: [
          ['A', {label: 'B', colspan: 8}, 'C'],
          ['D', {label: 'E', colspan: 4}, {label: 'F', colspan: 4}, 'G'],
          [
            'H', {label: 'I', colspan: 2}, {label: 'J', colspan: 2}, {label: 'K', colspan: 2}, {
            label: 'L',
            colspan: 2
          }, 'M'],
          ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
        ]
      }
    },
    {
      name: 'collapsible-columns',
      label: 'Collapsible Columns',
      description: 'Allow collapsing extended columns.',
      configObject: {
        collapsibleColumns: true,
        hiddenColumns: true
      },
      dependencies: [
        'nested-headers'
      ]
    },
    {
      name: 'trim-rows',
      label: 'Trim Rows',
      description: 'TRIM ROWS DESCRIPTION',
      configObject: {
        trimRows: true
      }
    },
    {
      name: 'filters',
      label: 'Filters',
      description: 'FILTERS DESCRIPTION',
      configObject: {
        filters: true
      }
    },
    {
      name: 'csv-export',
      label: 'Export to CSV',
      description: 'CSV EXPORT DESCRIPTION',
      configObject: {
        csvExport: true
      }
    },
    {
      name: 'select-all-button',
      label: 'Select All Button',
      description: 'SELECT ALL BUTTON DESCRIPTION',
      configObject: {
        selectAll: true
      }
    }
  ]);

  examples.setHOTsettings(hotSettings);
  examples.syncFeatures();
  examples.bindEvents();

  document.querySelector('#data-tab p').textContent = JSON.stringify(hot.getSettings().data);
});