(function() {
    'use strict';

    angular
        .module('assignment2App')
        .controller('ChapterDetailController', ChapterDetailController);

    ChapterDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Chapter', 'Book'];

    function ChapterDetailController($scope, $rootScope, $stateParams, previousState, entity, Chapter, Book) {
        var vm = this;

        vm.chapter = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('assignment2App:chapterUpdate', function(event, result) {
            vm.chapter = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
