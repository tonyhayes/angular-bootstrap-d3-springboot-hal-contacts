function AccordionCtrl($scope) {

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
}

var ButtonsCtrl = function ($scope) {

  $scope.checkModel = {
    yes: false,
	no: true
  };
};

var DatepickerCtrl = function ($scope) {
  $scope.today = function() {
    $scope.selectedDate = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.selectedDate = null;
  };


  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
};