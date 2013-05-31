'use strict';

define(['angular'], function (angular) {
  var app = angular.module('app', []);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/todoapp.html', controller: 'TodoMVCController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

  return app;
});
