'use strict'
var app = angular.module("myApp", [
                'ngRoute',
                'ngAnimate',
                'ngResource',
                'ngGrid',
                'ui.bootstrap',
                'restangular',
                'ui.sortable'
                ]);

app.config(function(RestangularProvider){
    RestangularProvider
        .setBaseUrl('/ExampleMaven/rest')
        .setDefaultHttpFields({cache: true})
})

app.config(function ($routeProvider, $locationProvider){

    $routeProvider.when('/',
        {
            templateUrl:"partials/home.html",
            controller:"HomeController"
        })
        .when('/page',
        {
            templateUrl: "partials/mainPage.html",
            controller: "MainPageController"
        })
        .when('/page/:pageId',
                {
                    templateUrl: "partials/page.html",
                    controller: "PageController"
                })
        .when('/promise',
        {
            templateUrl: "partials/promise.html",
            controller: "PromiseController",
            resolve: {
                loadData: loadData
            }
        })
        .when('/providerExample',
        {
            templateUrl: "partials/providerExample.html",
            controller: "ProviderExampleController"
        })
        .when('/ngRepeat',
        {
            templateUrl: "partials/ngRepeat.html",
            controller: "NgRepeatController"
        })
        .when('/directiveCommunication',
        {
            templateUrl: "partials/directiveCommunication.html",
            controller: "DirectiveCommunication"
        })
        .when('/animate',
        {
            templateUrl: "partials/animate.html",
            controller: "AnimateController"
        })
        .when('/fadeAngular',
        {
            templateUrl: "partials/fadeAngular.html",
            controller: "FadeAngularController"
        })
        .when('/copy',
        {
            templateUrl: "partials/copy.html",
            controller: "CopyController"
        })
        .when('/http',
        {
            templateUrl: "partials/http.html"
            //controller: "HttpController"
        })
        .when('/simpleAnimation',
        {
            templateUrl: "partials/simpleAnimation.html",
            controller: "SimpleAnimationController"
        })
        .when('/pluralize',
        {
            templateUrl: "partials/pluralize.html",
            controller: "PluralizeController"
        })
        .when('/compile',
        {
            templateUrl: "partials/compile.html",
            controller: "CompileController"
        })
        .when('/block',
        {
            templateUrl: "partials/block.html",
            controller: "BlockController"
        })
        .when('/crash',
        {
            templateUrl: "partials/crash.html"
        })
        .when('/rstangular',
        {
            templateUrl: "partials/rstangular.html",
            controller: "RstangularController"
        })
        .when('/cmplDirective',
        {
            templateUrl: "partials/cmplDirective.html",
            controller: "CmplDirectiveController"
        })
        .when('/ngDirective',
        {
            templateUrl: "partials/ngDirective.html",
            controller: "NgDirectiveController"
        })
        .when('/accordion',
        {
            templateUrl: "partials/UI-Bootstrap/accordion.html",
            controller: "UiAccordionController"
        })
        .when('/uiButtons',
        {
            templateUrl: "partials/UI-Bootstrap/buttons.html",
            controller: "UiButtonsController"
        })
        .when('/uiCarousel',
        {
            templateUrl: "partials/UI-Bootstrap/carousel.html",
            controller: "UiCarouselController"
        })
        .when('/uiToggle',
        {
            templateUrl: "partials/UI-Bootstrap/toggle.html",
            controller: "UiToggleController"
        })
        .when('/uiDatepicker',
        {
            templateUrl: "partials/UI-Bootstrap/datepicker.html",
            controller: "UiDatepickerController"
        })
        .when('/uiModal',
        {
            templateUrl: "partials/UI-Bootstrap/modal.html",
            controller: "UiModalController"
        })
        .when('/uiTypeahead',
        {
            templateUrl: "partials/UI-Bootstrap/typeahead.html",
            controller: "UiTypeaheadController"
        })
        .when('/uiSortable',
        {
            templateUrl: "partials/sortable.html",
            controller: "UiSortableController"
        })
        .when('/uiProgressbar',
        {
            templateUrl: "partials/UI-Bootstrap/progressbar.html",
            controller: "UiProgressbarController"
        })
        .otherwise({
            redirectTo: function(routeParams, path){
                console.log("Ruta pusa gresit:" + path)
                return "/";
            }
        })

});

app.provider('game', function(){
    var type;
    return{
         setType: function(value){
            type = value;
         },
         $get: function(){
            return{
                titlu: type + "Craft"
            }
        }
    }
})

app.config(function(gameProvider){
    gameProvider.setType("Gigel");
})


var loadData = function($q, $timeout){
    var defer = $q.defer();
    $timeout(function(){
        defer.resolve("Network down, can`t load");  //reject
    }, 500);
    return defer.promise;
}

