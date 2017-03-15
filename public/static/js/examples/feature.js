function Feature(featureObject) {
  /**
   * Feature name.
   *
   * @type {String|null}
   */
  this.name = featureObject.name || null;
  /**
   * Feature label.
   *
   * @type {String|null}
   */
  this.label = featureObject.label || null;
  /**
   * Feature description.
   *
   * @type {String|null}
   */
  this.description = featureObject.description || null;
  /**
   * Feature's Handsontable configuration object.
   *
   * @type {String|null}
   */
  this.configObject = featureObject.configObject || null;
  /**
   * Feature's enable indicator.
   *
   * @type {Boolean}
   */
  this.enabled = featureObject.enabled || (window.location.href.indexOf(featureObject.name) > -1);
  /**
   * List of dependent features.
   *
   * @type {Array}
   */
  this.dependencies = featureObject.dependencies || [];
  /**
   * Indicator if the feature is enabled as a dependency.
   *
   * @type {Boolean}
   */
  this.enabledAsDependency = false;

  this.enableFeature = function(asDependency) {
    if (asDependency) {
      this.enabledAsDependency = true;
    }

    this.enabled = true;
  };

  this.disableFeature = function() {
    this.enabled = false;
    this.enabledAsDependency = false;
  };

  this.isEnabled = function() {
    return this.enabled;
  };

  this.isEnabledAsDependency = function() {
    return this.enabledAsDependency;
  };
}
