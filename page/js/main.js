(function(){
    var appid = 'cyrrWs9Qz',
    conf = 'prod_b72bb5882b708ff9806d930780bde025';
    var doc = document,
    s = doc.createElement('script'),
    h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;
    s.type = 'text/javascript';
    s.charset = 'utf-8';
    s.src =  'http://assets.changyan.sohu.com/upload/changyan.js?conf='+ conf +'&appid=' + appid;
    h.insertBefore(s,h.firstChild);
    window.SCS_NO_IFRAME = true;
  })();

var app = angular.module('gisman', ['ngSanitize']);

app.controller('rootcontroller',function($scope,$http,$sce){
	$scope.html = function(data){
		return	$sce.trustAsHtml(data);
	};
	$http.get('/api/blog/recently').success(function(data){
			$scope.blogs = data;
		});
	$http.get('/api/blog/tuijian').success(function(data){
			$scope.titles = data;
		});
	$http.get('/api/blog/heat').success(function(data){
			$scope.heats = data;
		});
});

app.controller('blogdetailcontroller',function($scope,$http,$sce){
	$scope.html = function(data){
		return	$sce.trustAsHtml(data);
	};
	var url = '/api/blog/detail?blog=' + window.location.hash.split("#")[1];
	$http.get(url).success(function(data){
			$scope.blogs = data;
	});
	$http.get('/api/blog/tuijian').success(function(data){
			$scope.titles = data;
		});
	$http.get('/api/blog/heat').success(function(data){
			$scope.heats = data;
		});
});
