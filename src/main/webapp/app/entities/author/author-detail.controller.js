(function() {
    'use strict';

    angular
        .module('assignment2App')
        .controller('AuthorDetailController', AuthorDetailController);

    AuthorDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Author', 'Book'];

    function AuthorDetailController($scope, $rootScope, $stateParams, previousState, entity, Author, Book) {
        var vm = this;

        vm.author = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('assignment2App:authorUpdate', function(event, result) {
            vm.author = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
