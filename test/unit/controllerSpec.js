'use strict';
define(['angular', 'angular-mocks', 'ng/controller'], function (angular) {
  describe("El controlador TodoMVC", function () {
    var $scope;

    beforeEach(function () {
      angular.mock.module('app');

      inject(function ($controller, $rootScope, todoService) {
        spyOn(todoService, 'all').andReturn([]);
        spyOn(todoService, 'incomplete').andReturn([]);
        $scope = $rootScope.$new();
        $controller('TodoMVCController', {$scope: $scope});
      });
    });

    describe("Colabora con el servicio de ToDos", function () {
      it("Carga la lista de ToDos", inject(function (todoService) {
        // Ya estamos espiando todoService.all desde el beforeEach
        expect(todoService.all).toHaveBeenCalled();
      }));

      it("Crea nuevos ToDo", inject(function (todoService) {
        var title = "Escribir este test";
        $scope.newTodo = title;
        spyOn(todoService, 'save');
        $scope.addTodo();
        expect(todoService.save).toHaveBeenCalledWith({completed: false, title: title});
      }));

      it("Impide crear un ToDo sin título", inject(function (todoService) {
        spyOn(todoService, 'save');
        $scope.addTodo();
        expect(todoService.save).not.toHaveBeenCalled();
      }));

      it("Elimina un ToDo", inject(function (todoService) {
        var todo = {};
        spyOn(todoService, 'remove');
        $scope.removeTodo(todo);
        expect(todoService.remove).toHaveBeenCalledWith(todo);
      }));

      it("Elimina un ToDo si al editar quitamos el título", inject(function (todoService) {
        var todo = {title: ''};
        spyOn(todoService, 'remove');
        $scope.doneEditing(todo);
        expect(todoService.remove).toHaveBeenCalledWith(todo);
      }));

      it("Guarda el ToDo después de editarlo", inject(function (todoService) {
        var todo = {complete: false, title: 'chuchu'};
        spyOn(todoService, 'save');
        $scope.doneEditing(todo);
        expect(todoService.save).toHaveBeenCalledWith(todo);
      }));

      it("Guarda el ToDo después de completarlo o no completarlo", inject(function (todoService) {
        var todo = {complete: false, title: 'chuchu'};
        spyOn(todoService, 'save');
        $scope.save(todo);
        expect(todoService.save).toHaveBeenCalledWith(todo);
      }));

      it("Carga la lista de ToDos pendientes", inject(function (todoService) {
        expect(todoService.incomplete).toHaveBeenCalled();
      }));

      it("Recarga las cuentas cuando se actualizan los todos", inject(function ($rootScope, todoService) {
        // Ya hemos llamado una vez al cargar el controller
        $rootScope.$broadcast("todos.updated");
        expect(todoService.incomplete.callCount).toBe(2);
      }));

    });

    it("Vacía el input después de crear un nuevo ToDo", function () {
      $scope.newTodo = "chuchu";
      $scope.addTodo();
      expect($scope.newTodo).toBe("");
    });

    it("Permite editar el título de un ToDo", function () {
      var todo = {};
      $scope.editTodo(todo);
      expect($scope.editedTodo).toBe(todo);
    });

    it("Permite completar o no completar todos los ToDos de la lista", function () {
      $scope.todos = [
        {complete: false},
        {complete: false},
        {complete: false},
        {complete: false},
        {complete: false}
      ];
      $scope.markAll(true);
      expect($scope.todos.some(function (todo) {
        return !todo.completed;
      })).toBeFalsy();
      $scope.markAll(false);
      expect($scope.todos.some(function (todo) {
        return todo.completed;
      })).toBeFalsy();
    });

  });
});
