'use strict';

define(['app'], function(app) {

  app.directive('todoFocus', function todoFocus($timeout) {
    return function (scope, elem, attrs) {
      scope.$watch(attrs.todoFocus, function (newVal) {
        if (newVal) {
          $timeout(function () {
            elem[0].focus();
          }, 0, false);
        }
      });
    };
  });

  app.directive('todoBlur', function () {
    return function (scope, elem, attrs) {
      elem.bind('blur', function () {
        scope.$apply(attrs.todoBlur);
      });
    };
  });

  return app;
})