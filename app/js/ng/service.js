'use strict';

define(['app'], function (app) {
  return app.service('todoService', [function () {
    var storage = [];

    function all() {
      return storage;
    }

    function save(todo) {
      storage.push(todo);
    }

    function remove(todo) {
      storage.splice(storage.indexOf(todo), 1);
    }

    function incomplete() {
      return all().filter(function (todo) {
        return !todo.completed;
      });
    }

    return {
      all: all,
      incomplete: incomplete,
      save: save,
      remove: remove
    }
  }]);
});