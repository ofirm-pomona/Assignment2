(function() {
    'use strict';

    angular
        .module('assignment2App')
        .controller('BookDetailController', BookDetailController);

    BookDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Book', 'Chapter', 'Author'];

    function BookDetailController($scope, $rootScope, $stateParams, previousState, entity, Book, Chapter, Author) {
        var vm = this;

        vm.book = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('assignment2App:bookUpdate', function(event, result) {
            vm.book = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
