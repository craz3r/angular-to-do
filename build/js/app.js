'use strict';

var taskList = angular.module("taskList", ["ngAnimate"]);


taskList.controller("taskListCtrl", ["$scope", "$animate", function($scope, $animate){
  $scope.tasks = [];
  $scope.short = null;

  $scope.addTask = function() {

    if($scope.descr && $scope.descr.length > 10) {
        var tmp = $scope.descr.slice(0,10)
        $scope.short = tmp.concat("...");
    }

    var taskDate = new Date();

    var sh = ($scope.short ? false : true);

    if($scope.title) {
      $scope.tasks.unshift({
        title: $scope.title,
        short: $scope.short,
        descr: $scope.descr,
        fullView: sh,
        date: taskDate
      });
    }

    $scope.title = null;
    $scope.descr = null;
    $scope.short = null;
  }

  $scope.delete = function(item) {
    var idx = $scope.tasks.indexOf(item);
    $scope.tasks.splice(idx, 1);
    console.log($scope.tasks.length);
  }

}]);