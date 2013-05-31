'use strict';

define(['app', 'ng/service', 'ng/directives'], function (app) {
  return app.controller('TodoMVCController',
      ['$scope', 'todoService',
        function TodoMVCController($scope, todos) {
          $scope.$on("todos.updated", function() {
            $scope.todos = todos.all();
            $scope.remainingCount = todos.incomplete().length;
            $scope.completedCount = todos.complete().length;
          });


          function addTodo() {
            if (!$scope.newTodo)
              return;
            todos.save({completed: false, title: $scope.newTodo});
            $scope.newTodo = '';
          }

          function removeTodo(todo) {
            todos.remove(todo);
          }

          function editTodo(todo) {
            $scope.editedTodo = todo;
          }

          function doneEditing(todo) {
            $scope.editedTodo = null;
            todo.title = todo.title.trim();

            if (!todo.title)
              $scope.removeTodo(todo);
            else
              todos.save(todo);
          }

          function save(todo) {
            todos.save(todo);
          }

          function markAll(completed) {
            $scope.todos.forEach(function(todo) {
              todo.completed = completed;
            });
          }

          function filterBy(status) {
            $scope.statusFilter = 'none' == status ? '' : {completed: 'completed' == status};
          }

          function clearCompletedTodos() {
            todos.removeComplete();
          }


          $scope.todos = todos.all();
          $scope.remainingCount = todos.incomplete().length;
          $scope.completedCount = todos.complete().length;
          $scope.statusFilter = '';
          $scope.addTodo = addTodo;
          $scope.removeTodo = removeTodo;
          $scope.editTodo = editTodo;
          $scope.doneEditing = doneEditing;
          $scope.save = save;
          $scope.markAll = markAll;
          $scope.filterBy = filterBy;
          $scope.clearCompletedTodos = clearCompletedTodos;

        }]);
});
