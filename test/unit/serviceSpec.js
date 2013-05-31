'use strict';

define(['angular', 'angular-mocks', 'ng/service'], function (angular) {
  describe("El servicio de ToDos", function () {
    var todos;
    beforeEach(function () {
      angular.mock.module('app');

      inject(function (todoService, $window) {
        todos = todoService;
        $window.sessionStorage.clear();
      });
    });

    it("Sabe almacenar y devolver todos los ToDo", function () {
      var todo = {completed: false, title: "Cocotero"}
      todos.save(todo);
      expect(todos.all()[0]).toBe(todo);
    });

    it("Sabe actualizar un mismo ToDo", function() {
      var todo = {completed: false, title: "Cocotero"}
      todos.save(todo);
      todo.completed = true;
      todos.save(todo);
      expect(todos.all().length).toBe(1);
      expect(todos.all()[0].completed).toBe(true);
    });

    it("Sabe devolver solo los ToDos pendientes", function () {
      todos.save({completed: false, title: 'chuchu'});
      todos.save({completed: true, title: 'blabla'});
      expect(todos.incomplete().length).toBe(1);
    });

    it("Sabe eliminar un ToDo", function () {
      var todo = {completed: false, title: "Cocotero"}
      todos.save(todo);
      todos.remove(todo);
      expect(todos.all().length).toBe(0);
    });

    it("Emite un evento cuando se guarda un ToDo", inject(function($rootScope) {
      var called = false;
      $rootScope.$on("todos.updated", function() {
        called = true;
      });
      todos.save({});
      expect(called).toBeTruthy();
    }));

    it("Siempre devuelve la lista en el orden de entrada", function() {
      var todo1 = {completed: false, title: 'chuchu', when: new Date(new Date() - 24*3600*1000)};
      var todo2 = {completed: false, title: 'blabla'};
      todos.save(todo1);
      todos.save(todo2);
      todo1.completed = true;
      todos.save(todo1);
      expect(todos.all()[0]).toBe(todo1);
      expect(todos.all()[1]).toBe(todo2);
    })
  });
});