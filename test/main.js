require.config({
  baseUrl: 'base/app/js',
  paths: {
    'specs': '../../test/unit',
    'angular': '../lib/angular/angular',
    'angular-mocks': '../../test/lib/angular/angular-mocks'
  },
  shim: {
    'angular': {
      exports: 'angular',
      deps: []
    },
    'angular-mocks': {
      deps: ['angular']
    }
  }
});

require(['require', 'specs/controllerSpec', 'specs/serviceSpec'], function () {
  dump('test/main.js is starting requirejs');
  window.__karma__.start();
});