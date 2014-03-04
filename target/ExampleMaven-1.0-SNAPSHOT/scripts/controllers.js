'use strict'
app.controller('AppController', function($rootScope){
        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
            console.log(rejection);
        })
    })

    .controller('HomeController', function($scope){
        $scope.mesaj = "Home Booyah";
        console.log($scope);
    })

    .controller('MainPageController', function($scope){
        $scope.mesaj = "Main Page";
    })

    .controller('PageController', function($scope, $routeParams){
        $scope.mesaj = "Page number" + $routeParams.pageId;
    })

    .controller('PromiseController', function($scope, $route){
        console.log($route);
        $scope.mesaj = "Promisiune Ok";
    })

    .controller('ButtonsController', function($route, $location){
        this.changeRoute = function(route){
            $location.path("/" + route);
        }
    })

    .controller('ProviderExampleController', function($scope, game){
        $scope.titlu = game.titlu;
    })

    .controller('NgRepeatController', function($scope){
        $scope.mesaj = "Ng-repeat";
    })

    .controller('DirectiveCommunication', function($scope){
        $scope.mesaj = "Directive communication";
    })

    .controller('AnimateController', function($scope){
        $scope.mesaj= "Animation";
        this.toggle = true;
    })

    .controller('FadeAngularController', function($scope){
        $scope.mesaj="Fade Angular way";

        this.isHidden = false;

        this.fadeIt = function(){
            this.isHidden = ! this.isHidden;
        }
    })

    .controller('CopyController', function(contacts){
        this.contacts = contacts;
        this.selectedContact = null;
        this.contactCopy = null;

        this.selectContact = function(contact){
            this.selectedContact = contact
            this.contactCopy = angular.copy(contact);
        }
        this.saveContact = function(){
            this.selectedContact.firstName = this.contactCopy.firstName;
        }
    })

    .controller('HttpController', function($scope, accountService, notifier){
        var httpCtrl = this;

        $scope.accounts = {};
        httpCtrl.number = 0;
        httpCtrl.usernameChange = function(){
            httpCtrl.number = httpCtrl.number + 1;
        }

        // on load page -- get accounts
        var init = function(){
        $scope.accounts = accountService.getAll();
//            accountService.getAll().then(
//                function(event){
//                    $scope.accounts = event;
//                },
//                function(response){
//                    console.log(response)
//                }
//            );
         }

         var resetAccount  = function(account){
            account.email = '';
            account.password = '';
            account.userName = '';
            httpCtrl.number = 0;
         }

        httpCtrl.saveAccount = function(formEvent, account){
            if(formEvent.$valid){
                accountService.save(account).then(
                    function(response){
                        console.log('success', response);
                        notifier.notify("Success add");
                        init();
                        resetAccount(account);
                        formEvent.$setPristine();
                    },
                    function(response){
                        console.log('fail from service', response)
                    }
                )
            }else{
                console.log("Fail to validate")
            }
        }
        init();
    })

    .controller('RstangularController', function($scope, personService, notifier){
        $scope.mesaj = "Restangular!";
        $scope.persons = {} ;
        var init = function(){
            personService.getList().then(function(data){
                        $scope.persons = data;
                    });
        };
        var resetPerson = function(person){
            person.firstName = '';
            person.lastName = '';
        }
        $scope.savePerson = function(person){
            personService.post(person).then(function(addedPerson){
                console.log('id', addedPerson.id);
                $scope.persons.push(addedPerson);
                resetPerson(person);
                notifier.notify("Saved");
            });
        }
        $scope.deletePerson = function(personId){
            personService.one(personId).remove().then(function(){
                var personDel = _.find($scope.persons, function(obj){
                    return obj.id == personId;
                })
                var idx = $scope.persons.indexOf(personDel);
                $scope.persons.splice(idx, 1);
                notifier.notifyDelete("Deleted");
            })
        }
        init();
    })

    .controller('SimpleAnimationController', function($scope){
        $scope.mesaj="Animation simple"
    })

    .controller('PluralizeController', function($scope){
        $scope.mesaj = "Pluralize- mesaj"

        $scope.person1 = "Gigel";
        $scope.person2 = "Ion";
        $scope.personCount = 2;
    })

    .controller('CompileController', function($scope, $compile){
           $scope.mesaj= "compiler";
           $scope.addButton = function(valoare){
                var btn = $compile('<buton val="'+ valoare +'"></buton>')($scope); // {{valoare}}
                angular.element(document.getElementById('holder')).append(btn);
           }
    })

    .controller('BlockController', function($scope){
        $scope.mesaj = "Oricum nu apare !"
    })

    .controller('CrashController', function($scope){
        $scope.mesaj = "Useless controller";
    })

    .controller('CmplDirectiveController', function($scope){
        $scope.mesaj = "(ctrl)compile";
    })

    .controller('NgDirectiveController', function($scope, $timeout){
        $scope.mesaj = "ctrl-ng";
        $scope.obj = [];
        $scope.dataLoaded = false;

        $timeout(function(){
            $scope.showDiv = true;
            $scope.dataLoaded = true;
        }, 2000);
    })

    .controller('UiAccordionController', function($scope){
        $scope.mesaj = "accordion-ctrl";
        $scope.oneAtATime = true;

        $scope.groups = [];

        $scope.groups.push(
        {
            title: 'Dynamic 1',
            content: 'Dynamic content 1'
        });
        $scope.groups.push(
        {
            title: 'Dynamic 2',
            content: 'Dynamic content 2'
        });
    })

    .controller('UiButtonsController', function($scope){
        $scope.mesaj = "btts-ctrl";

         $scope.singleModel = 1;

         $scope.radioModel = 'Middle';

         $scope.checkModel = {
            left: false,
            middle: true,
            right: false
         };
    })

    .controller('UiCarouselController', function($scope, $animate){
        $scope.mesaj = "carouselCtrl";

        $scope.myInterval = 3000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 1200 + slides.length;
            slides.push({
                  image: 'http://placekitten.com/g/' + newWidth + '/300',
                  text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                    ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                });
        };

        for (var i=0; i<4; i++) {
            $scope.addSlide();
        }
    })

    .controller('UiToggleController', function($scope){
        $scope.mesaj = "toggle-ctrl";
        $scope.isCollapsed = false;
    })

    .controller('UiDatepickerController', function($scope){
        $scope.mesaj = "datepicker-ctrl";

        $scope.showWeeks = true;
        $scope.today = function(){
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.toggleMin = function(){
            $scope.minDate = ($scope.minDate) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.disabled = function(date, mode){
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };
        $scope.open = function($event){
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        }

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[0];
    })

    .controller('UiModalController', function($scope, $modal, $animate, $log){
        $scope.mesaj = "modal-ctrl";

        $scope.open = function(){
            $animate.enabled(false);
            console.log("animation disabled");
            var modalInstance = $modal.open({
                templateUrl: 'partials/UI-Bootstrap/modalContent.html'
            });

            modalInstance.result.then(function(){
                $log.log("Oricum nu apare!!");
            })
        }
    })

    .controller('UiTypeaheadController', function($scope, $http, $filter){
        $scope.mesaj = "typeahead-ctrl";


        $scope.getPersons = function(){
            return $http.get('/ExampleMaven/rest/person').then(function(res){
                console.log("intra");
                $scope.persons = [];
                angular.forEach(res.data, function(item){
                    $scope.persons.push(item.firstName);
                })
                return $filter('filter')($scope.persons, $scope.asyncSelected)
            })
        }

         $scope.states = ['Alabama', 'Albama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    })

    .controller('UiSortableController', function($scope){
        $scope.mesaj = "Sortable-ctrl";

        var tmpList = [];

          for (var i = 1; i <= 6; i++){
            tmpList.push({
              text: 'Item ' + i,
              value: i
            });
          }

          $scope.list = tmpList;


          $scope.sortingLog = [];

          $scope.sortableOptions = {
            // called after a node is dropped
            stop: function(e, ui) {
              var logEntry = {
                ID: $scope.sortingLog.length + 1,
                Text: 'Moved element: ' + ui.item.scope().item.text
              };
              $scope.sortingLog.push(logEntry);
            }
          };
    })