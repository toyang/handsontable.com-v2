function JsfiddleExporter(hotInstance) {
  this.html = '';
  this.css = '';
  this.js = '';
  this.hot = hotInstance;
  this.urlEndIndex = window.location.href.lastIndexOf("/");
  this.baseUrl = window.location.href.substr(0, this.urlEndIndex);

  /**
   * Prepare the HTML part for JsFiddle.
   */
  this.prepareHtml = function() {
    this.html = '<div id="hot"></div>';
  };

  /**
   * Prepare the JS part for JsFiddle.
   */
  this.prepareJs = function() {
    var jstab = document.getElementById('js-tab');
    var preElem = jstab.querySelector('pre');
    var datatab = document.getElementById('data-tab');

    this.js += 'document.addEventListener("DOMContentLoaded", function() {\n\n';
    this.js += 'var dataObj = ' + datatab.textContent + ';\n';
    //this.js += 'var flagRenderer = ' + this.hot.getSettings().columns[0].renderer.toString() + ';\n\n';
    this.js += preElem.textContent;
    this.js += '\n});';
  };

  /**
   * Prepare the CSS part for JsFiddle.
   */
  this.prepareCss = function() {
    var _this = this;
    var scriptTags = document.getElementsByTagName('script');
    var linkTags = document.getElementsByTagName('link');
    var tags = [];
    var html = '';

    this.css += '#hot {overflow: hidden; width: 500px; height: 300px;}\n\n';
    this.css += '</style><!-- Ugly Hack due to jsFiddle issue -->\n';

    Handsontable.helper.arrayEach(scriptTags, function(tag) {
      if (tag.getAttribute('src').indexOf('handsontable.full') > -1) {
        tags.push(tag);
      }
    });

    Handsontable.helper.arrayEach(linkTags, function(tag) {
      if (tag.getAttribute('href').indexOf('handsontable.full') > -1) {
        tags.push(tag);
      }
    });


    Handsontable.helper.arrayEach(tags, function(tag) {
        html = tag.outerHTML;

      if (html.indexOf('href="http') === -1 && html.indexOf('href="//') === -1 && html.indexOf('src="http') === -1 && html.indexOf('src="//') === -1) {
          html = html.replace('href="', 'href="' + _this.baseUrl);
          html = html.replace('src="', 'src="' + _this.baseUrl);
          html = html.replace('demo/../', '');
        }

        _this.css += html + '\n';

      html = '';
    });
  };

  /**
   * Export the example's data to JsFiddle.
   */
  this.export = function(submit) {
    this.prepareHtml();
    this.prepareJs();
    this.prepareCss();

    if (submit) {
      this.submit();

      this.css = '';
      this.js = '';
      this.html = '';
    }
  };

  /**
   * Create a temporary form and send data to JsFiddle.
   */
  this.submit = function() {
    var form = document.createElement('FORM');
    form.action = 'http://jsfiddle.net/api/post/library/pure/';
    form.method = 'POST';
    form.target = '_blank';
    form.innerHTML = '<input type="text" name="title" value="Handsontable example">' +
      '<textarea name="html">' + this.html.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>' +
      '<textarea name="js">' + this.js.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>' +
      '<textarea name="css">' + this.css.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>';

    form.style.visibility = 'hidden';

    document.body.appendChild(form);
    form.submit();
    form.parentNode.removeChild(form);
  }
}