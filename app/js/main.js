require.config({
  paths: {
    'angular': '/app/lib/angular/angular'
  },
  shim: {
    'angular': {
      exports: 'angular',
      deps: []
    }
  }
});

/**
 * NOTA: si usas la directiva ng-app en el index.html, esto se rompe
 */
require(['angular', 'app', 'ng/controller'], function (angular) {
  'use strict';
  return angular.bootstrap(document, ['app']);
});