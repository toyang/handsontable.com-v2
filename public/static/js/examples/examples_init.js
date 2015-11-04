var examples;

document.addEventListener("DOMContentLoaded", function() {
  var dataObject = [
    {price: 12, date: '01/01/2015', percent: 5,},
    {price: 33, date: '2/12/2015', percent: 3,},
    {price: 104, date: '11/20/2015', percent: 63,},
    {price: 264, date: '5/31/2016', percent: 99,},
    {price: 5, date: '2/28/2014', percent: 25,}
  ];
  var hotElement = document.querySelector('#hot');
  var hotElementContainer = hotElement.parentNode;

  var hot = new Handsontable(hotElement, {
    data: dataObject,
    width: parseInt(hotElementContainer.offsetWidth, 10),
    height: 400,
    minSpareRows: true
  });

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
        sorting: true
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

  examples.syncFeatures();

});