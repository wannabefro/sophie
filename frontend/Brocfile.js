/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-bootstrap': {
    'importBootstrapTheme': true,
    'importBootstrapJS': true
  }
});

app.import('vendor/scripts/eve.js');
app.import('vendor/scripts/raphael-min.js');
app.import('vendor/scripts/jquery.lazylinepainter-1.4.1.min.js');

module.exports = app.toTree();
