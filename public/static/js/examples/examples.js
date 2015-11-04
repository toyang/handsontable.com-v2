function Examples(hotInstance, basicFeatures, proFeatures) {
  /**
   * Handsontable instance.
   *
   * @type {Object}
   */
  this.hotInstance = hotInstance;
  /**
   * Object containing the basic features data.
   *
   * @type {Object}
   */
  this.basicFeatures = {};
  /**
   * Object containing the pro features data.
   *
   * @type {Object}
   */
  this.proFeatures = {};
  /**
   * Basic features form.
   *
   * @type {Element}
   */
  this.basicFeaturesForm = document.getElementById('basic_features');
  /**
   * Pro features form.
   *
   * @type {Element}
   */
  this.proFeaturesForm = document.getElementById('pro_features');
  /**
   * Cloned feature form's entry element.
   *
   * @type {Element}
   */
  this.featureEntryObject = null;

  /**
   * Add features of the provided type, from the feature array to the proper object.
   *
   * @param {String} type 'basic' or 'pro'
   * @param {Array} featureArray Array of objects containing feature data.
   */
  this.addFeatures = function(type, featureArray) {
    for (var i = 0; i < featureArray.length; i++) {
      this.addFeature(type, featureArray[i]);
    }
  };

  /**
   * Add a Feature object to the proper features object.
   *
   * @param {String} type 'basic' or 'pro'
   * @param featureDataObject
   */
  this.addFeature = function(type, featureDataObject) {
    this[type + 'Features'][featureDataObject.name] = new Feature(featureDataObject);
  };

  /**
   * Add a basic feature to the features object.
   *
   * @param {Object} featureDataObject Object containing the feature data.
   */
  this.addBasicFeature = function(featureDataObject) {
    this.addFeature('basic', featureDataObject);
  };

  /**
   * Add a pro feature to the features object.
   *
   * @param {Object} featureDataObject Object containing the feature data.
   */
  this.addProFeature = function(featureDataObject) {
    this.addFeature('pro', featureDataObject);
  };

  /**
   * Fetch, clone and delete the feature form's entry element.
   *
   * @returns {Element} Cloned element.
   */
  this.fetchFeatureEntryObject = function() {
    var domObj = document.querySelector('.feature_entry');

    this.featureEntryObject = domObj.cloneNode(true);
    domObj.parentNode.removeChild(domObj);

    return this.featureEntryObject;
  };

  /**
   * Fill the menu entry element.
   *
   * @param {Element} element Cloned element.
   * @param {Feature} dataObj Feature object.
   */
  this.fillEntryElement = function(element, dataObj) {
    var input = element.getElementsByTagName('input')[0];
    var label = element.getElementsByTagName('label')[0];
    var labelTextNode = document.createTextNode(dataObj.label);

    input.id = input.id + dataObj.name;
    input.checked = dataObj.enabled;
    label.setAttribute('for', input.id);

    label.insertBefore(labelTextNode, label.childNodes[0]);
  };

  this.fillFormWithFeatures = function(form, features, remainingElementId) {
    var feature;
    var tempEntry;
    var featureEntryObject = this.featureEntryObject || this.fetchFeatureEntryObject();

    var entry = form.querySelector('p:not(#' + remainingElementId + ')');
    while (entry) {
      form.removeChild(entry);
      entry = form.querySelector('p:not(#' + remainingElementId + ')');
    }

    for (feature in features) {
      if (features.hasOwnProperty(feature)) {
        tempEntry = featureEntryObject.cloneNode(true);
        this.fillEntryElement(tempEntry, features[feature])/**/;

        form.insertBefore(tempEntry, document.getElementById(remainingElementId));
      }
    }
  };

  /**
   * Sync all the provided features with the DOM elements.
   */
  this.syncFeatures = function() {

    this.fillFormWithFeatures(this.basicFeaturesForm, this.basicFeatures, 'see_all_basic');
    this.fillFormWithFeatures(this.proFeaturesForm, this.proFeatures, 'see_pricing');
  };


  this.addFeatures('basic', basicFeatures);
  this.addFeatures('pro', proFeatures);
}