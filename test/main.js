require.config({
  baseUrl: 'base/',
  paths: {
    'specs': './test/unit',
    'src': './app/js',
    'angular': './app/lib/angular/angular',
    'angular-mocks': './test/lib/angular/angular-mocks'
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

require(['require', 'specs/controllerSpec'], function () {
  dump('test/main.js is starting requirejs');
  window.__karma__.start();
});