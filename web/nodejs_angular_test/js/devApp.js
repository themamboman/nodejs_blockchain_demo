//-------------------------------------------------------------------
//
//	Filename: devApp.js
//
//	This file contains the Angular Module used by the main HTML
//	page.
//
//-------------------------------------------------------------------

var devApp = angular.module('devApp', [] );

   devApp.controller('devAppCtrl', function($scope,$http) {
	  $scope.nodejsUrl = 'http://127.0.0.1/'
	  $scope.dataTable = [];

      $scope.buildTable = function () {
		var url = $scope.nodejsUrl + 'showlateststats';

		$http.get(url)
		.then(function(response) {
			var bFound = false;
			console.log("response = " + JSON.stringify(response.data));
			$scope.dataObj = response.data;
			$scope.curPrice = response.data["market_price_usd"];
			$scope.dataObj.readableTimestamp = new Date($scope.dataObj.timestamp);
			console.log("date = " + $scope.dataObj.readableTimestamp);
			
			// if data is updated, add it to the table array
			for( var i=0; i<$scope.dataTable.length; i++ ) {
				if ($scope.dataTable[i].timestamp == $scope.dataObj.timestamp ) {
					bFound = true;
					break;
				}
			}
			if( bFound === false ) {
				console.log("adding new entry");
				$scope.dataTable.push($scope.dataObj);
			} else {
				console.log("same data, not adding new");
				alert("No updated stats found, nothing to add to historical table");
			}
		});
     };
});
