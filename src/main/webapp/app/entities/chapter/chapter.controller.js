(function() {
    'use strict';

    angular
        .module('assignment2App')
        .controller('ChapterController', ChapterController);

    ChapterController.$inject = ['$scope', '$state', 'Chapter'];

    function ChapterController ($scope, $state, Chapter) {
        var vm = this;

        vm.chapters = [];

        loadAll();

        function loadAll() {
            Chapter.query(function(result) {
                vm.chapters = result;
                vm.searchQuery = null;
            });
        }
    }
})();
