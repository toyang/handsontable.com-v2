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
    {flag: '', currencyCode: 'EUR', currency: 'Euro',	level: 0.9033, units: 'EUR per USD', asOf: '08/19/2015', onedChng: 0.0026},
    {flag: '', currencyCode: 'JPY', currency: 'Japanese Yen', level: 124.3870, units: 'JPY per USD', asOf: '08/19/2015', onedChng: 0.0001},
    {flag: '', currencyCode: 'GBP', currency: 'Pound Sterling', level: 0.6396, units: 'GBP per USD', asOf: '08/19/2015', onedChng: 0.00},
    {flag: '', currencyCode: 'CHF', currency: 'Swiss Franc',	level: 0.9775, units: 'CHF per USD', asOf: '08/19/2015', onedChng: 0.0008},
    {flag: '', currencyCode: 'CAD', currency: 'Canadian Dollar',	level: 1.3097, units: 'CAD per USD', asOf: '08/19/2015', onedChng: -0.0005},
    {flag: '', currencyCode: 'AUD', currency: 'Australian Dollar',	level: 1.3589, units: 'AUD per USD', asOf: '08/19/2015', onedChng: 0.0020},
    {flag: '', currencyCode: 'NZD', currency: 'New Zealand Dollar',	level: 1.5218, units: 'NZD per USD', asOf: '08/19/2015', onedChng: -0.0036},
    {flag: '', currencyCode: 'SEK', currency: 'Swedish Krona',	level: 8.5280, units: 'SEK per USD', asOf: '08/19/2015', onedChng: 0.0016},
    {flag: '', currencyCode: 'NOK', currency: 'Norwegian Krone',	level: 8.2433, units: 'NOK per USD', asOf: '08/19/2015', onedChng: 0.0008},
    {flag: '', currencyCode: 'BRL', currency: 'Brazilian Real',	level: 3.4806, units: 'BRL per USD', asOf: '08/19/2015', onedChng: -0.0009},
    {flag: '', currencyCode: 'CNY', currency: 'Chinese Yuan Renminbi',	level: 6.3961, units: 'CNY per USD', asOf: '08/19/2015', onedChng: 0.0004},
    {flag: '', currencyCode: 'RUB', currency: 'Russian Rouble',	level: 65.5980, units: 'RUB per USD', asOf: '08/19/2015', onedChng: 0.0059},
    {flag: '', currencyCode: 'INR', currency: 'Indian Rupee',	level: 65.3724, units: 'INR per USD', asOf: '08/19/2015', onedChng: 0.0026},
    {flag: '', currencyCode: 'TRY', currency: 'New Turkish Lira',	level: 2.8689, units: 'TRY per USD', asOf: '08/19/2015', onedChng: 0.0092},
    {flag: '', currencyCode: 'THB', currency: 'Thai Baht',	level: 35.5029, units: 'THB per USD', asOf: '08/19/2015', onedChng: 0.0044},
    {flag: '', currencyCode: 'IDR', currency: 'Indonesian Rupiah',	level: 13.83, units: 'IDR per USD', asOf: '08/19/2015', onedChng: -0.0009},
    {flag: '', currencyCode: 'MYR', currency: 'Malaysian Ringgit',	level: 4.0949, units: 'MYR per USD', asOf: '08/19/2015', onedChng: 0.0010},
    {flag: '', currencyCode: 'MXN', currency: 'Mexican New Peso',	level: 16.4309, units: 'MXN per USD', asOf: '08/19/2015', onedChng: 0.0017},
    {flag: '', currencyCode: 'ARS', currency: 'Argentinian Peso',	level: 9.2534, units: 'ARS per USD', asOf: '08/19/2015', onedChng: 0.0011},
    {flag: '', currencyCode: 'DKK', currency: 'Danish Krone',	level: 6.7417, units: 'DKK per USD', asOf: '08/19/2015', onedChng: 0.0025},
    {flag: '', currencyCode: 'ILS', currency: 'Israeli New Sheqel',	level: 3.8262, units: 'ILS per USD', asOf: '08/19/2015', onedChng: 0.0084},
    {flag: '', currencyCode: 'PHP', currency: 'Philippine Peso',	level: 46.3108, units: 'PHP per USD', asOf: '08/19/2015', onedChng: 0.0012}
  ];


  var flagRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    var currencyCode = instance.getDataAtCell(row, col + 1);
    var flagElement = document.createElement('DIV');
    flagElement.className = 'flag ' + currencyCode.toLowerCase();

    while (td.firstChild) {
      td.removeChild(td.firstChild);
    }

    td.appendChild(flagElement);
  };
  var hotElement = document.querySelector('#hot');
  var hotElementContainer = hotElement.parentNode;
  var hotSettings = {
    data: dataObject,
    columns: [
      {
        data: 'flag',
        renderer: flagRenderer,
        readOnly: true
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
    height: 441
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
        colHeaders: ['Country', 'Currency Code', 'Currency', 'Level', 'Units', 'As Of', '1D Chng']
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
          sortIndicator: true
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
              Handsontable.renderers.TextRenderer.apply(this, arguments);

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
        trimRows: true
      }
    },
    {
      name: 'filters',
      label: 'Filters',
      description: 'Allows to define the criteria to display only specific rows while hiding the others. ' +
      'Available from the dropdown menu in the header.',
      configObject: {
        filters: true
      }
    },
    {
      name: 'csv-export',
      label: 'Export to CSV',
      description: 'Adds a possibility to export the data as comma-separated values. ' +
      'In the demo above, just click a button to download the flat file.',
      configObject: {
        csvExport: true
      }
    },
    {
      name: 'select-all-button',
      label: 'Select All Button',
      description: 'Allows to trigger the selection from the function. ' +
      'In the demo above, click in the corner to select all the visible cells.',
      configObject: {
        selectAll: true
      }
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
});