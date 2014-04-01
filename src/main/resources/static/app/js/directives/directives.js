
/* Directives */


angular.module('customersApp.directives', []).
//This directive adds custom animations to views as they enter or leave a screen
//Note that AngularJS has an ng-animate directive but this one can be used when you 
//want complete control or when you can't use that version of AngularJS yet
    directive('animatedView', ['$route', '$anchorScroll', '$compile', '$controller',
        function ($route, $anchorScroll, $compile, $controller) {
            return {
                restrict: 'ECA',
                terminal: true,
                link: function (scope, element, attr) {
                    var lastScope,
                        onloadExp = attr.onload || '',
                        defaults = {
                            duration: 500,
                            viewEnterAnimation: 'slideLeft',
                            viewExitAnimation: 'fadeOut',
                            slideAmount: 50,
                            disabled: false
                        },
                        locals,
                        template,
                        options = scope.$eval(attr.animations);

                    angular.extend(defaults, options);

                    scope.$on('$routeChangeSuccess', update);
                    update();


                    function destroyLastScope() {
                        if (lastScope) {
                            lastScope.$destroy();
                            lastScope = null;
                        }
                    }

                    function clearContent() {
                        element.html('');
                        destroyLastScope();
                    }

                    function update() {
                        locals = $route.current && $route.current.locals;
                        template = locals && locals.$template;

                        if (template) {
                            if (!defaults.disabled) {
                                if (element.children().length > 0) { //Have content in view
                                    animate(defaults.viewExitAnimation);
                                } else { //No content in view so treat it as an enter animation
                                    animateEnterView(defaults.viewEnterAnimation);
                                }
                            } else {
                                bindElement();
                            }

                        } else {
                            clearContent();
                        }
                    }

                    function animateEnterView(animation) {
                        $(element).css('display', 'block');
                        bindElement();
                        animate(animation);
                    }

                    function animate(animationType) {
                        switch (animationType) {
                            case 'fadeOut':
                                $(element.children()).animate({
                                    //opacity: 0.0,
                                }, defaults.duration, function () {
                                    animateEnterView('slideLeft');
                                });
                                break;
                            case 'slideLeft':
                                $(element.children()).animate({
                                    left: '-=' + defaults.slideAmount,
                                    opacity: 1.0
                                }, defaults.duration);
                                break;
                            case 'slideRight':
                                $(element.children()).animate({
                                    left: '+=' + defaults.slideAmount,
                                    opacity: 1.0
                                }, defaults.duration);
                                break;
                        }
                    }

                    function bindElement() {
                        element.html(template);
                        destroyLastScope();

                        var link = $compile(element.contents()),
                            current = $route.current,
                            controller;

                        lastScope = current.scope = scope.$new();
                        if (current.controller) {
                            locals.$scope = lastScope;
                            controller = $controller(current.controller, locals);
                            element.children().data('$ngControllerController', controller);
                        }

                        link(lastScope);
                        lastScope.$emit('$viewContentLoaded');
                        lastScope.$eval(onloadExp);

                        // $anchorScroll might listen on event...
                        $anchorScroll();
                    }
                }

            };
        }
    ])
    .directive('uiDate', function () {
        return {
            require: '?ngModel',
            link: function ($scope, element, attrs, controller) {
                var originalRender, updateModel, usersOnSelectHandler;
                if ($scope.uiDate === null) $scope.uiDate = {};
                if (controller !== null) {
                    updateModel = function (value, picker) {
                        return $scope.$apply(function () {
                            return controller.$setViewValue(element.datepicker("getDate"));
                        });
                    };
                    if ($scope.uiDate.onSelect !== null) {
                        usersOnSelectHandler = $scope.uiDate.onSelect;
                        $scope.uiDate.onSelect = function (value, picker) {
                            updateModel(value);
                            return usersOnSelectHandler(value, picker);
                        };
                    } else {
                        $scope.uiDate.onSelect = updateModel;
                    }
                    originalRender = controller.$render;
                    controller.$render = function () {
                        originalRender();
                        return element.datepicker("setDate", controller.$viewValue);
                    };
                }
                return element.datepicker($scope.uiDate);
            }
        };
    })

    .directive('modal', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@',
                okFn: '&',
                cancelFn: '&'
            },
            template: '<div class="modal hide fade">' + '<div class="modal-header">' + '<button type="button" class="close" ' + 'data-dismiss="modal" aria-hidden="true">&times;</button>' + '<h3>{{ title }} </h3>' + '</div>' + '<div id="modal-body" class="modal-body">' + '<p ng-transclude></p>' + '</div>' + '<div class="modal-footer">' + '<a href="#" ng-click="cancelFn()" class="btn">Cancel</a>' + '<a href="#" ng-click="okFn()" class="btn btn-primary">Save changes</a>' + '</div>' + '</div>',
            replace: true
        };
    });