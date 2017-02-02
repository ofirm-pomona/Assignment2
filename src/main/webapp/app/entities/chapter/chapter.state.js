(function() {
    'use strict';

    angular
        .module('assignment2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('chapter', {
            parent: 'entity',
            url: '/chapter',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Chapters'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/chapter/chapters.html',
                    controller: 'ChapterController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('chapter-detail', {
            parent: 'entity',
            url: '/chapter/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Chapter'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/chapter/chapter-detail.html',
                    controller: 'ChapterDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Chapter', function($stateParams, Chapter) {
                    return Chapter.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'chapter',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('chapter-detail.edit', {
            parent: 'chapter-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chapter/chapter-dialog.html',
                    controller: 'ChapterDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Chapter', function(Chapter) {
                            return Chapter.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('chapter.new', {
            parent: 'chapter',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chapter/chapter-dialog.html',
                    controller: 'ChapterDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                page: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('chapter', null, { reload: 'chapter' });
                }, function() {
                    $state.go('chapter');
                });
            }]
        })
        .state('chapter.edit', {
            parent: 'chapter',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chapter/chapter-dialog.html',
                    controller: 'ChapterDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Chapter', function(Chapter) {
                            return Chapter.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('chapter', null, { reload: 'chapter' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('chapter.delete', {
            parent: 'chapter',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chapter/chapter-delete-dialog.html',
                    controller: 'ChapterDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Chapter', function(Chapter) {
                            return Chapter.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('chapter', null, { reload: 'chapter' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
