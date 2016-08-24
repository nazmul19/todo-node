var app = angular.module("todoApp", ['ngRoute']);
app.factory('TodoFactory', function($http){
	return {
		getAllTodos: function(){
			return $http.get("/todos").then(function(result) { return result.data; });
		},
		addNew: function(todo){
			return $http.post('/todos', todo).then(function(result) { return result.data; });
		},
		toggleStatus: function(todoId){
			return $http.put('/todos/'+ todoId + "/toggle-status", null).then(function(result) { return result.data; });
		}
	};
});
app.controller('TodoController', function($scope, TodoFactory){
	$scope.newTodo = { title: null, done : false};
	
	$scope.addNewTodo = function(){
		TodoFactory.addNew($scope.newTodo).then(function(data){
			$scope.todos.push(data);
			$scope.newTodo = { title: null, done : false};
		});
	}

	$scope.toggleStatus = function(todo){
		console.log(todo);
		TodoFactory.toggleStatus(todo._id).then(function(data){
			todo = data;
			$scope.loadTodos();
		})
	}

	$scope.loadTodos = function(){
		TodoFactory.getAllTodos().then(function(data){
			$scope.todos = data;
		})
	}

	var init = function(){
		$scope.loadTodos();
	}

	init();
});

app.config(function($httpProvider, $routeProvider, $compileProvider) {
	$routeProvider.when('/', { controller: 'TodoController', templateUrl: 'todo-list.html'});
	$routeProvider.otherwise({ controller: 'TodoController', templateUrl: 'todo-list.html'});
})
