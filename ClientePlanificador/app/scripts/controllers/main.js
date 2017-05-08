'use strict';

/**
 * @ngdoc function
 * @name clientePlanificadorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientePlanificadorApp
 */
angular.module('clientePlanificadorApp')
  .controller('MainCtrl', function ($scope, $http) {

	$scope.solution = [];
  	$scope.anio = 2017;
  	$scope.periodo = 1;
  	$scope.codCoordinador = 25;
  	$scope.mensaje = '';
	$scope.arr = [];
	$scope.eventSources = [];

  	$scope.makeArray = function () {
                $scope.arr.length = 0;
                for (var i = 0; i < parseInt($scope.cols) ; i++) {
                    $scope.arr.push(i);
                }
            }

	$scope.createCalendars = function (solution) {        
		angular.forEach(solution.data.listaProyectos, function(valorProyectos, llaveProyectos) {		  

			angular.forEach(valorProyectos.listaEstudiantes, function(valorEstudiantes, llaveEstudiantes) {			 
				


				var copia = JSON.parse(JSON.stringify($scope.uiConfig));				
				copia.events = [];
			  	angular.forEach(valorEstudiantes.asignaturasProgramadas, function(valorAsignatura, llaveAsignatura) {
				   	
				   		angular.forEach(valorAsignatura.listaEventosCalendario, function(valorEventos, llaveEventos) {			 
				   				copia.events.push(valorEventos);	
				   		});
				  
				}); 

				    console.log('Codigo Proyecto:' + valorProyectos.codigoProyecto);
				    console.log('Codigo estudiante:' +valorEstudiantes.codigo);
				    console.log('Codigo nombre:' +valorEstudiantes.nombre);
				    console.log('Codigo lista codigos materias por demanda:' +valorEstudiantes.listaCodigosPorDemanda);
				  	var newEle = angular.element("<div class='calendario'><h4>"+valorEstudiantes.nombre+"-"+valorEstudiantes.codigo+"-"+valorEstudiantes.cantidadCreditosProgramados+"-"+valorProyectos.codigoProyecto+"</h4><div id='"+valorEstudiantes.codigo+"' ui-calendar='uiConfig.calendar'></div></div>");
				    var target = document.getElementById('calendarContainer');
				    angular.element(target).append(newEle);								   
					
				  	angular.element("#"+valorEstudiantes.codigo).fullCalendar(copia);

			});  

		});
    }

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

 	$scope.uiConfig = {
      
      	defaultDate: "2017-05-01",
      	minTime: "06:00:00",
		maxTime: "22:00:00",
      	hiddenDays: [ 0 ],
      	width: 300,
        height: 300,
        allDaySlot: false,
        editable: false,
        header:{
          left: '',
          center: '',
          right: ''
        },
        defaultView:'agendaWeek',
        events: [
	        {	            
				start:'2017-05-02T09:00:00',
				end:'2017-05-02T10:00:00',				
				title:'347'
	        },
	        {
				start:'2017-05-02T08:00:00',
				end:'2017-05-02T09:00:00',				
				title:'348'
	        }
	     ]   
      
    };

    $scope.lanzarSolucion = function(){

		var config = {
		    params: {
		        anio: $scope.anio,
		        periodo: $scope.periodo,
		        codCarrera: $scope.codCoordinador, 
		        sessionId : "anacatalina"
		    }
		}

		$http.get('http://localhost:7778/PreinscripcionAuto/rest/solution/solve',config)
	        .then(function(success) {
	            $scope.mensaje = success.data.mensaje;
	            console.log(success);
	        },
	        function(error) {
	            console.log('Error: ' + error);
	        });
    };


    $scope.consultarSolucion = function(){

		var config = {
		    params: {
		        anio: $scope.anio,
		        periodo: $scope.periodo,
		        codCarrera: $scope.codCoordinador, 
		        sessionId : "anacatalina"
		    }
		}

		$http.get('http://localhost:7778/PreinscripcionAuto/rest/solution',config)
		 .then(function(success) {
	            $scope.solution = success;
	            console.log(success);
	            $scope.createCalendars($scope.solution);
	        },
	        function(error) {
	            console.log('Error: ' + error);
	        });	        
    };


  });
