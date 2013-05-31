'use strict';

define(['angular', 'angular-mocks', 'ng/controller'], function (angular) {
  describe("TodoMVC controller", function () {
    var $scope;

    beforeEach(function () {
      angular.mock.module('app');

      inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('TodoMVCController', {$scope: $scope});
      });
    });

    it("Chuchu", function () {
      expect('blabla').toBe('cocotero');
    });
  });
});