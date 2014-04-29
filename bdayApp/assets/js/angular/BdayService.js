myApp.factory('BdayService', function($http){
	return {
	    get : function() {
	    return $http.get('/bday');
	    }
	    // store : function(todoData){
	    // 	return $http ({
     //            method: 'POST',
     //            url: '/todo/create',
     //            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
     //            data: $.param(todoData)
	    // 	});
	    // }
	}
});