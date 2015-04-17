var app = angular.module('myBlog', ['ngRoute']);

//
//	CONFIG
//

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			controller: 'HomeCtrl',
			templateUrl: 'templates/home.html'
		})
		.when('/users', {
			controller: 'UsersCtrl',
			templateUrl: 'templates/users.html'
		})
		.when('/feed', {
			controller: 'FeedCtrl',
			templateUrl: 'templates/feed.html'
		});
	$locationProvider.html5Mode(true);
});

//
//	SERVICES
//

app.factory('UserSvc', function($q, $http) {
	return {
		getUsers: function() {
			var dfd = $q.defer();
			$http.get('/api/users').then(
				function(result) {
					dfd.resolve(result.data);
				});
			return dfd.promise;
		},
		createUser: function() {
			var dfd = $q.defer();
			$http.post('/api/users', user).then(
				function(result) {
					dfd.resolve(result.data);
				},
				function(result) {
					dfd.reject(result.data);
				});
			return dfd.promise;
		}
	}
})

app.factory('NavSvc', function() {
	var tabs = [
		{
			title: 'Home',
			path: '/'
		},
		{
			title: 'Users',
			path: '/users'
		},
		{
			title: 'Feed',
			path: '/feed'
		}
	];
	return {
		tabs: tabs,
		setTab: function(title) {
			tabs.forEach(function(tab) {
				if(tab.title == title)
					tab.active = true;
				else
					tab.active = false;
			});
		}
	};
});

//
//	CONTROLLERS
//

app.controller('NavCtrl', function($scope, NavSvc) {
	$scope.tabs = NavSvc.tabs;
});

app.controller('HomeCtrl', function($scope, NavSvc) {
	NavSvc.setTab('Home');
});

app.controller('UsersCtrl', function($scope, NavSvc, UserSvc) {
	NavSvc.setTab('Users');
	function activate() {
		UserSvc.getUsers().then(function(users) {
			$scope.users = users;
		});
	}
	activate();
});

app.controller('FeedCtrl', function($scope, NavSvc) {
	NavSvc.setTab('Feed');
});

//
//	DIRECTIVES
//

app.directive("topNav", function(){
  return {
    restrict: "E",
    templateUrl: "/templates/nav.html",
    controller: "NavCtrl"
  }
});
