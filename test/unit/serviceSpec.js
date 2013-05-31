'use strict';

define(['angular', 'angular-mocks', 'ng/service'], function (angular) {
  describe("El servicio de ToDos", function () {
    var todos;
    beforeEach(function () {
      angular.mock.module('app');

      inject(function (todoService) {
        todos = todoService;
      });
    });

    it("Sabe almacenar y devolver todos los ToDo", function () {
      var todo = {completed: false, title: "Cocotero"}
      todos.save(todo);
      expect(todos.all()[0]).toBe(todo);
    });

    it("Sabe devolver solo los ToDos pendientes", function () {
      todos.save({completed: false});
      todos.save({completed: true});
      expect(todos.incomplete().length).toBe(1);
    });

    it("Sabe eliminar un ToDo", function () {
      var todo = {completed: false, title: "Cocotero"}
      todos.save(todo);
      todos.remove(todo);
      expect(todos.all().length).toBe(0);
    });
  });
});