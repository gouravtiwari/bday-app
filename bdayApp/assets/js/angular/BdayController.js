myApp.controller('BdayController', function ($scope, $http, BdayService  ){
	// $scope.todoData = {};
	BdayService.get()
	    .success(function(data){
	    	$scope.bdays = data;
	    })
	    .error(function(err){
	    	console.log(err);
	    });
	// $scope.submitTodo = function(todoData) {
	// 	TodoService.store(todoData)
	// 	.success(function(data) {
	// 		TodoService.get()
	// 		    .success(function(data){
	// 		    	$scope.todos = data;
	// 		    })
	//     	$scope.todos = data;
	//     })
	//     .error(function(err){
	//     	console.log(err);
	//     });
	// };
});