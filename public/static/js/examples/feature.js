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
  this.enabled = featureObject.enabled || false;

  this.enableFeature = function() {
    this.enabled = true;
  };

  this.disableFeature = function() {
    this.enabled = false;
  };
}
