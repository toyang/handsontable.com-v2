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
   * Initial HOT settings.
   *
   * @type {Object}
   */
  this.initialHOTsettings = null;
  /**
   * Initial HOT data.
   *
   * @type {null}
   */
  this.initialHOTdata = null;
  /**
   * Array of currently enabled features.
   *
   * @type {Array}
   */
  this.currentlyEnabledFeatures = null;
  /**
   * Flag enabled when user clicks a UI element (checkbox) and disabled on state change event.
   *
   * @type {Boolean}
   */
  var UIclick = false;
  /**
   * Reference to the ExampleCodeGenerator.
   *
   * @type {ExampleCodeGenerator}
   */
  this.exampleCodeGenerator = new ExampleCodeGenerator();


  /**
   * Generates the sample dataset;
   *
   * @type {null}
   */
  this.generateData = function() {
    var data = [];

    for (var i = 0; i < this.initialHOTdata.length; i++) {
      data[i] = Handsontable.helper.clone(this.initialHOTdata[i]);
    }

    return data;
  };
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
    this.initialHOTsettings = hotSettings;
    this.initialHOTdata = function() {
      var data = [];

      for (var i = 0; i < hotSettings.data.length; i++) {
        data[i] = Handsontable.helper.clone(hotSettings.data[i]);
      }

      return data;
    }();
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

    if (dataObj.enabled) {
      this.enableFeature(dataObj);
    }

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
   * Add a state regarding the enabled/disabled features.
   *
   * @param {Object} feature Enabled/disable feature.
   * @param {Boolean} [enable=true] Pass 'false' to disable the feature.
   */
  this.addState = function(feature, enable) {
    if (enable !== false) {
      enable = true;
    }

    var currentUrl = window.location.href;
    var enabledQuery = feature.name;
    var queryString = '';

    if (enable && currentUrl.indexOf(enabledQuery) === -1) {
      var questionMarkIndex = currentUrl.indexOf('?');

      queryString = questionMarkIndex > -1 ? currentUrl.substr(questionMarkIndex, currentUrl.length - 1) + '&' : '?';
      History.pushState(feature, document.title, queryString + enabledQuery);

    } else if (!enable && currentUrl.indexOf(enabledQuery) > -1) {

      if (currentUrl.indexOf('&') > -1) {
        if (currentUrl.indexOf('?' + enabledQuery) > -1) {
          queryString = currentUrl.replace(enabledQuery + '&', '');
        } else {
          queryString = currentUrl.replace('&' + enabledQuery, '');
        }
      } else {
        queryString = currentUrl.replace('?' + enabledQuery, '');
      }
      History.pushState(feature, document.title, queryString);
    }
  };


  /**
   * Sync all the provided features with the DOM elements.
   */
  this.syncFeatures = function() {
    this.fillFormWithFeatures(this.basicFeaturesForm, this.basicFeatures, 'see_all_basic');
    this.fillFormWithFeatures(this.proFeaturesForm, this.proFeatures, 'see_pricing');
  };

  /**
   * Enable the provided feature.
   *
   * @param {Feature} feature
   */
  this.enableFeature = function(feature) {
    var _this = this;
    var dependencies = this.getDependencies(feature);

    this.updateEnabledFeaturesTab(feature);
    feature.enableFeature.call(feature);

    Handsontable.helper.arrayEach(dependencies, function(dependency) {
      if (!dependency.isEnabled()) {
        dependency.enableFeature.call(dependency, true);
        _this.enableAsDependency(dependency);
      }
    });

    this.addState(feature);

    this.updateHOT();
  };

  /**
   * Disable the provided feature.
   *
   * @param {Feature} feature
   * @param {MouseEvent} [event] Mouse event object.
   */
  this.disableFeature = function(feature, event) {
    var _this = this;
    var dependencies = this.getDependencies(feature);
    
    this.updateEnabledFeaturesTab(feature, true);

    if (feature.isEnabledAsDependency()) {
      this.disableAsDependency(feature);

      if (event) {
        event.preventDefault();
      }
    }
    feature.disableFeature.call(feature);

    Handsontable.helper.arrayEach(dependencies, function(dependency) {
      if (dependency.isEnabledAsDependency()) {
        dependency.disableFeature.call(dependency);
        _this.disableAsDependency(dependency);
      }
    });

    this.addState(feature, false);

    this.updateHOT();
  };

  /**
   * Get dependencies for the provided feature.
   *
   * @param {Feature} feature
   * @returns {Array} Array of Feature objects.
   */
  this.getDependencies = function(feature) {
    var _this = this;
    var dependencies = [];

    Handsontable.helper.arrayEach(feature.dependencies, function(name) {
      dependencies.push(_this.basicFeatures[name] || _this.proFeatures[name])
    });

    return dependencies;
  };

  /**
   * Set the checkbox to be enabled as a dependency.
   *
   * @param {Feature} feature
   */
  this.enableAsDependency = function(feature) {
    var featureCheckbox = document.querySelector('input[type=checkbox]#feature_' + feature.name);
    var interval = null;
    var checks = 0;

    if (featureCheckbox) {
      check();
    } else {
      interval = setInterval(function() {
        checks++;

        if (checks < 10) {
          featureCheckbox = document.querySelector('input[type=checkbox]#feature_' + feature.name);

          if (featureCheckbox) {
            check();
            window.clearInterval(interval);
          }

        } else {
          window.clearInterval(interval);
        }
      }, 50);
    }

    function check() {
      featureCheckbox.checked = true;
      Handsontable.Dom.addClass(featureCheckbox, 'dependency');
    }
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
    var newSettings = Handsontable.helper.clone(this.initialHOTsettings);
    var addedSettings = {};
    var _this = this;

    this.currentlyEnabledFeatures = this.getEnabledFeatures();

    this.hotInstance.destroy();

    if (this.currentlyEnabledFeatures.length > 0) {
      Handsontable.helper.arrayEach(this.currentlyEnabledFeatures, function(feature) {
        Handsontable.helper.deepExtend(addedSettings, feature.configObject);
        Handsontable.helper.deepExtend(addedSettings, {data: _this.generateData()});
      });

      Handsontable.helper.deepExtend(newSettings, addedSettings);
    }

    this.initHOT(newSettings);
    this.updateCodeTab(newSettings);
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

  this.clearCodeTab = function() {
    var codeTabElement = document.getElementById('code-tab');
    while (codeTabElement.firstChild) {
      codeTabElement.removeChild(codeTabElement.firstChild);
    }
  };

  /**
   * Initial setup of the Code tab.
   */
  this.setupCodeTab = function() {
    this.clearCodeTab();

    var codeTabElement = document.getElementById('code-tab');
    var preElement = document.createElement('PRE');
    var codeElement = document.createElement('CODE');

    codeElement.textContent = this.exampleCodeGenerator.getHtml();
    codeElement.className = 'language-html';

    preElement.appendChild(codeElement);
    codeTabElement.appendChild(preElement);
  };

  /**
   * Update the Code tab.
   *
   * @param {Object} settings New Handsontable settings.
   */
  this.updateCodeTab = function(settings) {
    var settingsToDisplay = Handsontable.helper.clone(settings);
    settingsToDisplay.data = 'getDataPlaceholder';

    this.exampleCodeGenerator.updateHotSettings(settingsToDisplay);
    this.setupCodeTab();

    if (Prism) {
      Prism.highlightAll();
    }
  };

  /**
   * Update the EnabledFeatures tab with the provided feature.
   *
   * @param {Feature} feature Feature object.
   * @param {Boolean} remove True if the feature is being removed.
   * @param {Boolean} dependency True if method triggered for a dependency.
   */
  this.updateEnabledFeaturesTab = function(feature, remove, dependency) {
    var _this = this;

    Handsontable.helper.arrayEach(feature.dependencies, function(dependency) {
      var dependencyFeature = _this.basicFeatures[dependency] || _this.proFeatures[dependency];
      _this.updateEnabledFeaturesTab(dependencyFeature, remove, true);
    });

    var i = 0;
    var found = false;
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

    if (remove && (!dependency || (dependency && feature.isEnabledAsDependency()))) {
      var toBeRemoved = document.querySelector('li[data-feature-index="' + i + '"]');
      toBeRemoved.parentNode.removeChild(toBeRemoved);
      return;
    }

    if (document.querySelector('li[data-feature-index="' + i + '"]')) {
      return;
    }

    var baseEntry = document.querySelector('li[data-enabled-feature="hidden"]');
    var entryParent = baseEntry.parentNode;
    var newEntry = baseEntry.cloneNode(true);
    var closestEntry;

    newEntry.setAttribute('data-feature-index', i);
    newEntry.setAttribute('data-enabled-feature', 'visible');

    newEntry.querySelector('h4').textContent = feature.label;
    newEntry.querySelector('p').textContent = feature.description;

    i--;
    while (i >= 0) {
      closestEntry = entryParent.querySelector('li[data-feature-index="' + i + '"]');
      if (closestEntry) {
        break;
      }
      i--;
    }

    if (closestEntry) {
      entryParent.insertBefore(newEntry, closestEntry.nextSibling);
    } else {
      entryParent.insertBefore(newEntry, entryParent.childNodes[0]);
    }
  };

  this.updateState = function() {
    var _this = this;
    var state = History.getState();
    var urlFeatureList = state.url;
    var feature;
    var featureInputElement;
    urlFeatureList = urlFeatureList.split('?')[1].split('&');

    Handsontable.helper.arrayEach(urlFeatureList, function(featureName) {
      feature = _this.basicFeatures[featureName] || _this.proFeatures[featureName];

      if (!feature.isEnabled()) {
        _this.enableFeature(feature);

        featureInputElement = document.getElementById('feature_' + feature.name);
        featureInputElement.checked = !featureInputElement.checked;
      }
    });

    Handsontable.helper.objectEach(this.currentlyEnabledFeatures, function(feature) {
      if (urlFeatureList.indexOf(feature.name) === -1) {
        if (feature.isEnabled() && !feature.isEnabledAsDependency()) {
          _this.disableFeature(feature);

          featureInputElement = document.getElementById('feature_' + feature.name);
          featureInputElement.checked = !featureInputElement.checked;
        }
      }
    });
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

          UIclick = true;

          while (target.tagName.toLowerCase() !== 'label') {
            target = target.parentNode;
          }

          var featureName = target.getAttribute('for').split('_')[1];
          var currentFeatureElement = _this.basicFeatures[featureName] || _this.proFeatures[featureName];


          if (currentFeatureElement.isEnabled()) {
            _this.disableFeature(currentFeatureElement, event);
          } else {
            _this.enableFeature(currentFeatureElement);
          }

          return false;
        });
      });
    });

    if (History) {
      History.Adapter.bind(window, 'statechange', function() {
        if (UIclick) {
          UIclick = false;
          return;
        }
        _this.updateState.call(_this);
      });
    }
  };

  this.addFeatures('basic', basicFeatures);
  this.addFeatures('pro', proFeatures);
}
