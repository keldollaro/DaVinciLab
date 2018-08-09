var myApp = angular.module('daVinciLab', ['ngRoute',
	 'Main',
	 'Laboratorio',
	 'Login',
	 'ngAnimate',
	 'ngCookies',
	 'navBar',
	 'Classi',
	 'Docente',
	 'DatiDocente']);
myApp.config(function($routeProvider)
{
	
	$routeProvider
	.when('/',
		{
			controller: 'MainController',
			templateUrl: 'moduli/main/views/main.html'
		})
		.when('/labs/:idLab',
		{
			controller: 'LaboratorioController',
			templateUrl: 'moduli/laboratorio/views/laboratorio.html',
			reloadOnSearch: false
		})
		.when('/labs',
		{
			controller: 'LaboratorioController',
			templateUrl: 'moduli/laboratorio/views/mainLaboratori.html'
		})
		.when('/login',
		{
			controller: 'LoginController',
			templateUrl: 'moduli/authentication/views/login.html'
		})
		.when('/classi',
		{
			controller: 'ClassiController',
			templateUrl: 'moduli/classi/views/classi.html'
		})
		.when('/doc',
		{
			controller: 'DocenteController',
			templateUrl: 'moduli/docente/views/docente.html'
		})
		.when('/doc/info',
		{
			controller: 'DatiDocenteController',
			templateUrl: 'moduli/docente/views/dati.html'
		})
		.otherwise({redirectTo: '/'});
		
		
});

myApp.value('baseUrl', config.baseUrl);

myApp.run(function($rootScope, $cookies)
{
	$rootScope.globals = {};
	$rootScope.globals.currentUser = {};
	
	$rootScope.globals.currentUser.user = $cookies.getObject('currentUser');
});

angular.module('navBar', ['ngCookies']).controller('NavBarController', function($scope, $rootScope, $location, $cookies){
	
	$scope.$watch(function(){
		return $rootScope.globals.currentUser.user;
	}, function(newValue, oldValue)
	{
		if(typeof newValue != 'undefined')
		{
			$scope.cognome = $rootScope.globals.currentUser.user.cognome;
			$scope.nome = $rootScope.globals.currentUser.user.nome;	
			$scope.mostraLoginButton = true;
		}
		else
		{
			$scope.mostraLoginButton = false;
		}
	});
	
	$scope.logout = function()
	{
		$cookies.remove('currentUser');
		$rootScope.globals.currentUser = {};
		swal("Logout avvenuto!", '', 'success');
		$location.path('#/');
	}
	
});