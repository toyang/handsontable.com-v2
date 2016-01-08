var examples;

document.addEventListener("DOMContentLoaded", function() {

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
    {id: 1, flag: 'EUR', currencyCode: 'EUR', currency: 'Euro',	level: 0.9033, units: 'EUR / USD', asOf: '08/19/2015', onedChng: 0.0026},
    {id: 2, flag: 'JPY', currencyCode: 'JPY', currency: 'Japanese Yen', level: 124.3870, units: 'JPY / USD', asOf: '08/19/2015', onedChng: 0.0001},
    {id: 3, flag: 'GBP', currencyCode: 'GBP', currency: 'Pound Sterling', level: 0.6396, units: 'GBP / USD', asOf: '08/19/2015', onedChng: 0.00},
    {id: 4, flag: 'CHF', currencyCode: 'CHF', currency: 'Swiss Franc',	level: 0.9775, units: 'CHF / USD', asOf: '08/19/2015', onedChng: 0.0008},
    {id: 5, flag: 'CAD', currencyCode: 'CAD', currency: 'Canadian Dollar',	level: 1.3097, units: 'CAD / USD', asOf: '08/19/2015', onedChng: -0.0005},
    {id: 6, flag: 'AUD', currencyCode: 'AUD', currency: 'Australian Dollar',	level: 1.3589, units: 'AUD / USD', asOf: '08/19/2015', onedChng: 0.0020},
    {id: 7, flag: 'NZD', currencyCode: 'NZD', currency: 'New Zealand Dollar',	level: 1.5218, units: 'NZD / USD', asOf: '08/19/2015', onedChng: -0.0036},
    {id: 8, flag: 'SEK', currencyCode: 'SEK', currency: 'Swedish Krona',	level: 8.5280, units: 'SEK / USD', asOf: '08/19/2015', onedChng: 0.0016},
    {id: 9, flag: 'NOK', currencyCode: 'NOK', currency: 'Norwegian Krone',	level: 8.2433, units: 'NOK / USD', asOf: '08/19/2015', onedChng: 0.0008},
    {id: 10, flag: 'BRL', currencyCode: 'BRL', currency: 'Brazilian Real',	level: 3.4806, units: 'BRL / USD', asOf: '08/19/2015', onedChng: -0.0009},
    {id: 11, flag: 'CNY', currencyCode: 'CNY', currency: 'Chinese Yuan',	level: 6.3961, units: 'CNY / USD', asOf: '08/19/2015', onedChng: 0.0004},
    {id: 12, flag: 'RUB', currencyCode: 'RUB', currency: 'Russian Rouble',	level: 65.5980, units: 'RUB / USD', asOf: '08/19/2015', onedChng: 0.0059},
    {id: 13, flag: 'INR', currencyCode: 'INR', currency: 'Indian Rupee',	level: 65.3724, units: 'INR / USD', asOf: '08/19/2015', onedChng: 0.0026},
    {id: 14, flag: 'TRY', currencyCode: 'TRY', currency: 'New Turkish Lira',	level: 2.8689, units: 'TRY / USD', asOf: '08/19/2015', onedChng: 0.0092},
    {id: 15, flag: 'THB', currencyCode: 'THB', currency: 'Thai Baht',	level: 35.5029, units: 'THB / USD', asOf: '08/19/2015', onedChng: 0.0044},
    {id: 16, flag: 'IDR', currencyCode: 'IDR', currency: 'Indonesian Rupiah',	level: 13.83, units: 'IDR / USD', asOf: '08/19/2015', onedChng: -0.0009},
    {id: 17, flag: 'MYR', currencyCode: 'MYR', currency: 'Malaysian Ringgit',	level: 4.0949, units: 'MYR / USD', asOf: '08/19/2015', onedChng: 0.0010},
    {id: 18, flag: 'MXN', currencyCode: 'MXN', currency: 'Mexican New Peso',	level: 16.4309, units: 'MXN / USD', asOf: '08/19/2015', onedChng: 0.0017},
    {id: 19, flag: 'ARS', currencyCode: 'ARS', currency: 'Argentinian Peso',	level: 9.2534, units: 'ARS / USD', asOf: '08/19/2015', onedChng: 0.0011},
    {id: 20, flag: 'DKK', currencyCode: 'DKK', currency: 'Danish Krone',	level: 6.7417, units: 'DKK / USD', asOf: '08/19/2015', onedChng: 0.0025},
    {id: 21, flag: 'ILS', currencyCode: 'ILS', currency: 'Israeli New Sheqel',	level: 3.8262, units: 'ILS / USD', asOf: '08/19/2015', onedChng: 0.0084},
    {id: 22, flag: 'PHP', currencyCode: 'PHP', currency: 'Philippine Peso',	level: 46.3108, units: 'PHP / USD', asOf: '08/19/2015', onedChng: 0.0012}
  ];
  var currencyCodes = ['EUR', 'JPY', 'GBP', 'CHF', 'CAD', 'AUD', 'NZD', 'SEK', 'NOK', 'BRL', 'CNY', 'RUB', 'INR', 'TRY', 'THB', 'IDR', 'MYR', 'MXN', 'ARS', 'DKK', 'ILS', 'PHP'];


  var flagRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    var currencyCode = value;

    while (td.firstChild) {
      td.removeChild(td.firstChild);
    }

    if (currencyCodes.indexOf(currencyCode) > -1) {
      var flagElement = document.createElement('DIV');
      flagElement.className = 'flag ' + currencyCode.toLowerCase();
      td.appendChild(flagElement);

    } else {
      var textNode = document.createTextNode(value === null ? '' : value);
      td.appendChild(textNode);
    }
  };
  var hotElement = document.querySelector('#hot');
  var hotElementContainer = hotElement.parentNode;
  var hotSettings = {
    data: dataObject,
    columns: [
      {
        data: 'id',
        type: 'numeric',
        width: 20
      },
      {
        data: 'flag',
        renderer: flagRenderer
      },
      {
        data: 'currencyCode',
        type: 'text'
      },
      {
        data: 'currency',
        type: 'text'
      },
      {
        data: 'level',
        type: 'numeric',
        format: '0.0000'
      },
      {
        data: 'units',
        type: 'text'
      },
      {
        data: 'asOf',
        type: 'date',
        dateFormat: 'MM/DD/YYYY'
      },
      {
        data: 'onedChng',
        type: 'numeric',
        format: '0.00%'
      }
    ],
    stretchH: 'all',
    width: parseInt(hotElementContainer.offsetWidth, 10),
    autoWrapRow: true,
    height: 441,
    maxRows: 22
  };



  var hot = new Handsontable(hotElement, hotSettings);

  examples = new Examples(hot, [
    {
      name: 'headers',
      label: 'Headers',
      description: 'Adds rows or column headings to the spreadsheet. You can assign a letter to each ' +
      'column automatically or enter your own custom name or even HTML elements.',

      configObject: {
        rowHeaders: true,
        colHeaders: ['ID', 'Country', 'Code', 'Currency', 'Level', 'Units', 'Date', 'Change']
      },
      enabled: true
    },
    {
      name: 'fixed',
      label: 'Fixed rows/columns',
      description: 'Keeps the top rows or left-hand side columns visible while scrolling down or across the table.',
      configObject: {
        fixedRowsTop: 2,
        fixedColumnsLeft: 2
      }
    },
    {
      name: 'sorting',
      label: 'Sorting',
      description: 'Sorts data in ascending or descending order throughout the column. You can optionally ' +
      'add an arrow indicating the sorting order.',
      configObject: {
        columnSorting: true,
        sortIndicator: true,
        autoColumnSize: {
          samplingRatio: 23
        }
      },
      dependencies: [
        'headers'
      ]
    },
    {
      name: 'merge-cells',
      label: 'Merge Cells',
      description: 'Creates a larger, single cell by merging multiple cells. It keeps the content of ' +
      'the upper-left cell and removes the contents of all other cells.',
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
      description: 'Allows to manually modify the size of the rows or columns. The sizing handle ' +
      'appears in the right part of the column header or at the bottom of the row header.',
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
      description: 'Allows to manually swap the rows or columns within the table. The moving handle ' +
      'appears in the left part of the column header or at the top of the row header.',
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
      description: 'Defines how the specific cells are formatted depending on their content. ' +
      'For instance, in this demo all negative values are marked red and the positive are green.',
      configObject: {
        cells: function (row, col, prop) {
          var cellProperties = {};

          if (col === this.instance.countCols() - 1) {
            cellProperties.renderer = function (instance, td, row, col, prop, value, cellProperties) {
              Handsontable.cellTypes[cellProperties.type].renderer.apply(this, arguments);

              if (parseFloat(value) > 0) {
                td.style.color = '#10D22B';
              } else if (parseFloat(value) < 0) {
                td.style.color = '#BB2424';
              } else {
                td.style.color = '';
              }
            }
          }

          return cellProperties;
        }
      }
    },
    {
      name: 'context-menu',
      label: 'Context Menu',
      description: 'Opens a pop-up menu that provides a list of items to choose. ' +
      'Right-click anywhere inside the table to invoke it.',
      configObject: {
        contextMenu: true
      }
    }
  ], [
    {
      name: 'fixed-bottom',
      label: 'Fixed bottom rows',
      description: 'Keeps the bottom rows visible while scrolling down or across the table.',
      configObject: {
        fixedRowsBottom: 2
      }
    },
    {
      name: 'column-summary',
      label: 'Basic calculations',
      description: 'Displays the total numeric values for the specific range. ' +
      'It also calculates min, max, average, count and handles custom functions.',
      configObject: {
        columnSummary: [
          {
            destinationColumn: 4,
            destinationRow: 0,
            type: 'average',
            forceNumeric: true,
            suppressDataTypeErrors: true,
            readOnly: true
          }
        ]
      }
    },
    {
      name: 'nested-headers',
      label: 'Nested Headers',
      description: 'Allows to create a multi-level, nested structure of the column headers.',
      configObject: {
        nestedHeaders: [
          [{label: 'A', colspan: 2}, {label: 'B', colspan: 4}, 'C'],
          [{label: 'D', colspan: 2}, {label: 'E', colspan: 2}, {label: 'F', colspan: 2}, 'H'],
          ['I', 'J', 'K', 'L', 'M', 'N', 'O']
        ]
      }
    },
    {
      name: 'collapsible-columns',
      label: 'Collapsible Columns',
      description: 'Allows to visually collapse and expand specific columns. ' +
      'It works together with the Nested Headers plugin.',
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
      description: 'Allows to skip the specific rows while rendering the table.',
      configObject: {
        trimRows: [1, 2, 5]
      }
    },
    {
      name: 'dropdown-menu',
      label: 'Dropdown Menu',
      description: 'Allows creating a dropdown menu, available in the column headers.',
      configObject: {
        dropdownMenu: true
      }
    },
    {
      name: 'filters',
      label: 'Filters',
      description: 'Allows to define the criteria to display only specific rows while hiding the others. ' +
      'Available from the dropdown menu in the header.',
      configObject: {
        filters: true
      },
      dependencies: [
        'dropdown-menu'
      ]
    },
    {
      name: 'csv-export',
      label: 'Export to CSV',
      description: 'Adds a possibility to export the data as comma-separated values. ' +
      'In the demo above, just click a button to download the flat file.',
      configObject: {}
    }
  ]);

  examples.setHOTsettings(hotSettings);
  examples.setupJavascriptTab();
  examples.setupDataTab();
  examples.syncFeatures();
  examples.bindEvents();

  var jsFiddleExporter = new JsfiddleExporter(examples);

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

  var bindCsvExportButtons = function () {
    var toggleCsvButtons = function () {
      var buttonPanel = document.getElementById('export-buttons');
      if (window.location.href.indexOf('csv-export') > -1) {
        buttonPanel.className = ' visible';
      } else {
        buttonPanel.className = buttonPanel.className.replace(' visible', '');
      }
    };

    document.getElementById('feature_csv-export').addEventListener('change', toggleCsvButtons);
    toggleCsvButtons();

    document.getElementById('export-csv').addEventListener('click', function() {
      examples.hotInstance.getPlugin('exportFile').downloadFile('csv', {filename: 'Handsontable CSV Export example'});
    });

    document.getElementById('export-string').addEventListener('click', function() {
      console.log(examples.hotInstance.getPlugin('exportFile').exportAsString('csv'));
    });
  }();

  // Highlight.js
  hljs.initHighlightingOnLoad();

});