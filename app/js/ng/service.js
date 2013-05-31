'use strict';

define(['app'], function (app) {
  return app.service('todoService', ['$rootScope', function ($rootScope) {
    var storage = [];

    function all() {
      return storage.sort(function (t1, t2) {
        if (t1.when > t2.when)
          return 1;
        if (t2.when > t1.when)
          return -1;
        return 0;
      });
    }

    function titleExists(title) {
      return all().some(function (candidate) {
        return title == candidate.title;
      });
    }

    function insert(todo) {
      todo.when = todo.when || new Date();
      storage.push(todo);
    }

    function withTitle(title) {
      return storage.filter(function (candidate) {
        return candidate.title == title;
      })[0];
    }

    function update(todo) {
      var updatedTodo = withTitle(todo.title);
      updatedTodo.completed = todo.completed;
      storage = storage.filter(function (candidate) {
        return candidate.title != todo.title;
      });
      storage.push(updatedTodo);
    }

    function save(todo) {
      if (titleExists(todo.title))
        update(todo);
      else
        insert(todo);
      $rootScope.$broadcast("todos.updated");
    }

    function remove(todo) {
      storage.splice(storage.indexOf(todo), 1);
      $rootScope.$broadcast("todos.updated");
    }

    function incomplete() {
      return all().filter(function (todo) {
        return !todo.completed;
      });
    }

    function complete() {
      return all().filter(function (todo) {
        return todo.completed;
      });
    }

    function removeComplete() {
      complete().forEach(function(todo) {
        remove(todo);
      });
    }

    return {
      all: all,
      complete: complete,
      incomplete: incomplete,
      save: save,
      remove: remove,
      removeComplete: removeComplete
    }
  }]);
});