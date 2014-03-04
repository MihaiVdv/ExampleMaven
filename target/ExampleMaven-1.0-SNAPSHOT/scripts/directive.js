'use strict'
app
    .directive("error", function($rootScope){
        return{
            restrict: 'E',
            template:'<div ng-show="isError" class="btn btn-danger"> Eroare!!!</div>',
            link: function(scope){
                $rootScope.$on("$routeChangeError", function(event, current, previous, rejection){
                    scope.isError = true;
                })
            }
        }
    })

    .directive("country", function(){
        return{
            restrict: "E",
            controller: function(){
                this.makeAnnouncement = function (message){
                    console.log("Country says: " + message)
                }
            }
        }
    })

    .directive("state", function(){
        return{
            restrict: "E",
            require:"^country",
            controller: function(){
                this.makeLaw = function(law){
                    console.log("Law in state :" + law);
                }
            },
            link: function(scope, element, attrs, countryCtrl){
                countryCtrl.makeAnnouncement("from state")
            }
        }
    })

    .directive("city", function(){
        return{
            restrict: "E",
            require: ["^country", "^state"],
            link: function(scope, element, attrs, ctrls){
                ctrls[0].makeAnnouncement("from city");
                ctrls[1].makeLaw(" from city")
                }
        }
    })

    .directive("hideMe", function($animate){
        return {
            link: function(scope, element, attrs){
                scope.$watch(attrs.hideMe, function(newVal){
                    if(newVal){
                        $animate.addClass(element, "fade")
                    }else{
                        $animate.removeClass(element, "fade")
                    }
                })
            }
        }
    })

    .directive("buton", function(){
        return{
            restrict: 'E',
            scope: {
                'val': '@'
            },
            template: '<button>{{val}}</button>',
            link: function(scope, element, attrs){
                element.on('click', function(){
                    console.log(attrs.val)
                })
            }
        }
    })

    .directive('nameKeys', function(){
        return{
            restrict: 'A',
            link: function(scope, element, attrs, controller){
                element.bind('keydown', function(event){
                    if(!( isCharacter(event.keyCode) || isBackSlash(event.keyCode) || isNavigationKey(event.keyCode) || fKeys(event.keyCode) ))
                        event.preventDefault();
                })
            }
        }
    })

    .directive('repeatX', function($compile){
        return {
            link: function(scope, element, attrs, controller){
                for(var i = 0; i < Number(attrs.repeatX)-1; i++){
                    element.after($compile(element.clone().attr('repeat-x', 0))(scope));
                    //element.after(element.clone());
                }
            }
        }
    })

    .directive('block', function(accountService){
        return {
            restrict: 'E',
            link: function(scope, element, attrs, controller){
                while(true){
                    console.log("Booyah - blocat")
                }
            }
        }
    })

    .directive('crash', function($compile){
        return{
            link: function(scope, element, attrs, controller){
                for(var i = 0; i < Number(attrs.crash); i++){
                    element.after($compile(element.clone())(scope));
                }
            }
        }
    })

    .directive('exempluDirectiva', function($compile) {
        return{
            restrict: 'E',
            templateUrl: 'scripts/directiveTmpl/exempluDirectiva.html',
            scope: {

            },
            replace: true,
            transclude: false,
            controller: controller
        }

        function controller($scope, $attrs, $http, $resource){
            $scope.mesaj = "Mesaj in controller";

            $scope.totalServerItems = 0;
            $scope.pagingOptions = {
                pageSizes: [5, 10, 20],
                pageSize: 5,
                currentPage: 1
            };

            $scope.setPagingData = function(data, page, pageSize){
                var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
                $scope.myData = pagedData;
                $scope.totalServerItems = data.length;
//                if($scope.$root.$$phase != '$apply'  && $scope.$root.$$phase != '$digest'){
//                    $scope.$apply();
//                }
            };
            $scope.loadData = function(){
                $http.get('/ExampleMaven/rest/person').success(function(data){
                                $scope.totalServerItems = data.length;
                                $scope.myData = data;
                                $scope.setPagingData($scope.myData, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
                            });
            }

            $scope.$watch('pagingOptions', function(newVal, oldVal){
                if(newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize) ){
                    $scope.loadData();
                }
            }, true );

            $scope.loadData();

            $scope.gridOptions = {
                data: 'myData',
                enablePaging: true,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions
            };
        }
    })

    .directive('myFirstInh', function(){
        return{
            restrict: 'E',
            scope: true,
            template: 'myFirstInh:<input type="text" ng-model="Gigel.inhModel"/>'+
                    '<br/>  <my-second-inh></my-second-inh>'
        }
    })

    .directive('mySecondInh', function(){
        return{
            restrict: 'E',
            scope: true,
            template: 'mySecondInh:<input type="text" ng-model="Gigel.inhModel"/>'
        }
    })

    .directive('myFirstTransclude', function(){
        return{
            restrict: 'E',
            scope: {},
            transclude: true,
            template: '<input type="text" ng-model="$$nextSibling.transcludeModel"/>  <div ng-transclude></div>'
        }
    })

    .directive('mySecondTransclude', function(){
        return{
            restrict: 'E',
            template: '<div>Ceva din my-second-transclude: <input type="text" ng-model="transcludeModel"/></div>'
        }
    })

    .directive('localeDirPage', function(){
                    return{
                        restrict: 'E',
                        scope:{
                            word:'='
                        },
                        link: function(scope){
                            console.log(scope.word);
                        }
                    }
                })

app.animation(".fade", function(){
    return{
        addClass: function(element, className){
            TweenMax.to(element,1,{opacity:0});
        },
        removeClass: function(element, className){
            TweenMax.to(element,1,{opacity:1});
        }
    }
})

function isCharacter(keyCode){
    return (keyCode >= 65 && keyCode <= 90)
}

function isBackSlash(keyCode){
    return keyCode === 191;
}

function isNavigationKey(keyCode){
    switch (keyCode){
        case 8:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 45:
        case 46:
            return true;
        default:
            return false;
    }
}

function fKeys(keyCode){
    return (keyCode >=112 && keyCode <=123)
}