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

      it("Elimina un ToDo", inject(function(todoService) {
        var todo = {};
        spyOn(todoService, 'remove');
        $scope.removeTodo(todo);
        expect(todoService.remove).toHaveBeenCalledWith(todo);
      }));

      it("Carga la lista de ToDos pendientes", inject(function (todoService) {
        expect(todoService.incomplete).toHaveBeenCalled();
      }));
    });

    it("Vacía el input después de crear un nuevo ToDo", function () {
      $scope.newTodo = "chuchu";
      $scope.addTodo();
      expect($scope.newTodo).toBe("");
    });

  });
});
