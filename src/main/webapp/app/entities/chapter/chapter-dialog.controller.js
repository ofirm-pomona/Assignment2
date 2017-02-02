(function() {
    'use strict';

    angular
        .module('assignment2App')
        .controller('ChapterDialogController', ChapterDialogController);

    ChapterDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Chapter', 'Book'];

    function ChapterDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Chapter, Book) {
        var vm = this;

        vm.chapter = entity;
        vm.clear = clear;
        vm.save = save;
        vm.books = Book.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.chapter.id !== null) {
                Chapter.update(vm.chapter, onSaveSuccess, onSaveError);
            } else {
                Chapter.save(vm.chapter, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('assignment2App:chapterUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
