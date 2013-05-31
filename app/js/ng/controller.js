'use strict';

define(['app', 'ng/service'], function (app) {
  return app.controller('TodoMVCController',
      ['$scope', 'todoService',
        function TodoMVCController($scope, todos) {
          function addTodo() {
            if (!$scope.newTodo)
              return;
            todos.save({completed: false, title: $scope.newTodo});
            $scope.newTodo = '';
          }

          function removeTodo(todo) {
            todos.remove(todo);
          }

          $scope.todos = todos.all();
          $scope.remainingCount = todos.incomplete().length;
          $scope.addTodo = addTodo;
          $scope.removeTodo = removeTodo;
        }]);
});
