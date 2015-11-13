/*
 TODO:
 - data tab
 - jsfiddle
 */

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
  //TODO: docs
  this.standardHOTsettings = null;
  //TODO: docs
  this.currentlyEnabledFeatures = null;

  /**
   * Add features of the provided type, from the feature array to the proper object.
   *
   * @param {String} type 'basic' or 'pro'
   * @param {Array} featureArray Array of objects containing feature data.
   */
  this.addFeatures = function(type, featureArray) {
    var _this = this;

    Handsontable.helper.arrayEach(featureArray, function(feature) {
      _this.addFeature(type, feature);
    });
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
   * Get all the enabled features.
   *
   * @param {String|undefined} type 'basic', 'pro' or leave empty.
   * @returns {Array} Array of enabled features.
   */
  this.getEnabledFeatures = function(type) {
    var featureContainers = [];
    var enabledFeatures = [];

    switch (type) {
      case 'basic':
        featureContainers.push(this.basicFeatures);
        break;
      case 'pro':
        featureContainers.push(this.proFeatures);
        break;
      default:
        featureContainers.push(this.basicFeatures);
        featureContainers.push(this.proFeatures);
    }

    Handsontable.helper.arrayEach(featureContainers, function(featureContainer) {
      Handsontable.helper.objectEach(featureContainer, function(feature) {

        if (feature.isEnabled()) {
          enabledFeatures.push(feature);
        }

      });
    });

    return enabledFeatures;
  };

  /**
   * Set the initial HOT settings.
   *
   * @param {Object} hotSettings
   */
  this.setHOTsettings = function(hotSettings) {
    this.standardHOTsettings = hotSettings;
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

  /**
   * Fill the form element with P elements for the provided features.
   *
   * @param {Element} form
   * @param {Object} features Features object.
   * @param {String} remainingElementId Id of the element that needs to stay in the form.
   */
  this.fillFormWithFeatures = function(form, features, remainingElementId) {
    var _this = this;
    var feature;
    var tempEntry;
    var featureEntryObject = this.featureEntryObject || this.fetchFeatureEntryObject();

    var entry = form.querySelector('p:not(#' + remainingElementId + ')');
    while (entry) {
      form.removeChild(entry);
      entry = form.querySelector('p:not(#' + remainingElementId + ')');
    }

    Handsontable.helper.objectEach(features, function(feature) {
      tempEntry = featureEntryObject.cloneNode(true);
      _this.fillEntryElement(tempEntry, feature);

      form.insertBefore(tempEntry, document.getElementById(remainingElementId));

      feature.domElement = tempEntry;
    });
  };

  /**
   * Sync all the provided features with the DOM elements.
   */
  this.syncFeatures = function() {

    this.fillFormWithFeatures(this.basicFeaturesForm, this.basicFeatures, 'see_all_basic');
    this.fillFormWithFeatures(this.proFeaturesForm, this.proFeatures, 'see_pricing');
  };

  /**
   * Set the checkbox to be enabled as a dependency.
   *
   * @param {Feature} feature
   */
  this.enableAsDependency = function(feature) {
    var featureCheckbox = document.querySelector('input[type=checkbox]#feature_' + feature.name);
    featureCheckbox.checked = true;
    Handsontable.Dom.addClass(featureCheckbox, 'dependency');
  };

  /**
   * Set the checkbox to be a disabled dependency.
   *
   * @param {Feature} feature
   */
  this.disableAsDependency = function(feature) {
    var featureCheckbox = document.querySelector('input[type=checkbox]#feature_' + feature.name);
    featureCheckbox.checked = false;
    Handsontable.Dom.removeClass(featureCheckbox, 'dependency');
  };

  /**
   * Update (reinitialize) the Handsontable instance with the new settings.
   */
  this.updateHOT = function() {
    var newSettings = Handsontable.helper.deepClone(this.standardHOTsettings);
    var addedSettings = {};
    this.currentlyEnabledFeatures = this.getEnabledFeatures();

    this.hotInstance.destroy();

    if (this.currentlyEnabledFeatures.length > 0) {
      Handsontable.helper.arrayEach(this.currentlyEnabledFeatures, function(feature) {
        Handsontable.helper.deepExtend(addedSettings, feature.configObject);
      });

      Handsontable.helper.deepExtend(newSettings, addedSettings);
    }

    this.initHOT(newSettings);
  };

  /**
   * Initialize a new Handsontable instance with the provided settings.
   *
   * @param {Object} settings New settings.
   */
  this.initHOT = function(settings) {
    var hotElement = document.querySelector('#hot');
    this.hotInstance = new Handsontable(hotElement, settings);
  };

  /**
   * Update tabs with the provided feature info.
   *
   * @param {Feature} feature Feature object.
   * @param {Boolean} remove True if the feature is being removed.
   */
  this.updateTabs = function(feature, remove) {
    this.updateJavascriptTab(feature, remove);
    //this.updateDataTab(feature, remove);
    this.updateEnabledFeaturesTab(feature, remove);
  };

  /**
   * Update the JavaScript tab.
   *
   * @param {Feature} feature Feature object.
   * @param {Boolean} remove True if the feature is being removed.
   */
  this.updateJavascriptTab = function(feature, remove) {
    var _this = this;
    var spanPrefix = 'js_feature_';
    var spanElem = document.getElementById('additional-code');
    var featureSpan = document.getElementById(spanPrefix + feature.name);

    Handsontable.helper.arrayEach(feature.dependencies, function(dependency) {
      var feature = _this.basicFeatures[dependency] || _this.proFeatures[dependency];

      if (!feature) {
        return;
      }

      _this.updateJavascriptTab(feature, remove);
    });

    if (remove) {
      if (featureSpan) {
        featureSpan.parentNode.removeChild(featureSpan);
      }
      return;
    }

    if (featureSpan) {
      return;
    }

    featureSpan = document.createElement('SPAN');

    featureSpan.id = spanPrefix + feature.name;

    Handsontable.helper.objectEach(feature.configObject, function(value, prop, obj) {
      featureSpan.textContent += '    ' + prop.replace(/"/g, '') + ': ';
      featureSpan.textContent += JSON.stringify(value, null, 4) + '\n';
    });

    spanElem.appendChild(featureSpan);
  };

  //TODO: docs
  this.updateDataTab = function(feature, remove) {

  };

  /**
   * Update the EnabledFeatures tab with the provided feature.
   *
   * @param {Feature} feature Feature object.
   * @param {Boolean} remove True if the feature is being removed.
   */
  this.updateEnabledFeaturesTab = function(feature, remove) {
    Handsontable.helper.objectEach(this.basicFeatures, function(featureEntry) {
      if (featureEntry.name === feature.name) {
        found = true;
        return false;
      }
      i++;
    });

    if (!found) {
      Handsontable.helper.objectEach(this.proFeatures, function(featureEntry) {
        if (featureEntry.name === feature.name) {
          found = true;
          return false;
        }
        i++;
      });
    }

    if (remove) {
      var toBeRemoved = document.querySelector('li[data-feature-index', i);
      toBeRemoved.parentNode.removeChild(toBeRemoved);
      return ;
    }

    var baseEntry = document.querySelector('li[data-enabled-feature="hidden"]');
    var entryParent = baseEntry.parentNode;
    var newEntry = baseEntry.cloneNode(true);
    var i = 0;
    var found = false;
    var closestEntry;

    newEntry.setAttribute('data-feature-index', i);
    newEntry.setAttribute('data-enabled-feature', 'visible');

    newEntry.querySelector('h4').textContent = feature.label;
    newEntry.querySelector('p').textContent = feature.description;

    i--;
    while(i >= 0) {
      closestEntry = entryParent.querySelector('li[data-feature-index', i);
      i--;
    }

    if (closestEntry) {
      entryParent.insertBefore(newEntry, closestEntry.nextSibling);
    } else {
      entryParent.insertBefore(newEntry, entryParent.childNodes[0]);
    }
  };

  /**
   * Bind the feature selecting events.
   */
  this.bindEvents = function() {
    var _this = this;
    var sections = [this.basicFeatures, this.proFeatures];

    Handsontable.helper.objectEach(sections, function(section) {
      Handsontable.helper.objectEach(section, function(featureElement) {

        featureElement.domElement.getElementsByTagName('label')[0].addEventListener('click', function(event) {
          var target = event.target;

          while (target.tagName.toLowerCase() !== 'label') {
            target = target.parentNode;
          }

          var featureName = target.getAttribute('for').split('_')[1];
          var currentFeatureElement = _this.basicFeatures[featureName] || _this.proFeatures[featureName];
          var dependencyFeatures = [];

          Handsontable.helper.arrayEach(currentFeatureElement.dependencies, function(dependency) {
            var dependencyFeature = _this.basicFeatures[dependency] || _this.proFeatures[dependency];

            dependencyFeatures.push(dependencyFeature);
          });

          if (currentFeatureElement.isEnabled()) {
            Handsontable.helper.arrayEach(dependencyFeatures, function(dependency) {
              if (dependency.isEnabledAsDependency()) {
                dependency.disableFeature.call(dependency);
                _this.disableAsDependency(dependency);
              }
            });

            currentFeatureElement.disableFeature.call(currentFeatureElement);
            _this.updateTabs(currentFeatureElement, true);

          } else {
            Handsontable.helper.arrayEach(dependencyFeatures, function(dependency) {
              if (!dependency.isEnabled()) {
                dependency.enableFeature.call(dependency, true);
                _this.enableAsDependency(dependency);
              }
            });

            currentFeatureElement.enableFeature.call(currentFeatureElement);
            _this.updateTabs(currentFeatureElement);
          }

          _this.updateHOT();

        });
      });
    });
  };

  this.addFeatures('basic', basicFeatures);
  this.addFeatures('pro', proFeatures);
}