'use strict';

define(['angular'], function (angular) {
  var app = angular.module('app', []);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/todoapp.html', controller: 'TodoMVCController'});
    $routeProvider.otherwise({redirectTo: '/list'});
  }]);

  return app;
});
