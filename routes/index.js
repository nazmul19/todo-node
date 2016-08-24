var express = require('express');
var router = express.Router();

/* Mongoose includes*/
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET ALL Todo's Items */
router.get('/todos', function(req, res, next) {
  Todo.find(function(err, todos){
    if(err){ return next(err); }

    res.json(todos);
  });
});

/* Adding todo PathVariable For GET/DELETE/UPDATE Specific Todo Item */
router.param('todo', function(req, res, next, id) {
  var query = Todo.findById(id);

  query.exec(function (err, todo){
    if (err) { return next(err); }
    if (!todo) { return next(new Error('can\'t find todo')); }

    req.todo = todo;
    return next();
  });
});

/* Retreive Todo By Todo-Id using todo PathVariable */
router.get('/todos/:todo', function(req, res) {
  res.json(req.todo);
});

/* Delete Todo by Id */
router.delete('/todos/:todo', function(req, res) {
  if(req.todo == undefined) return res.json("Not Found");
  Todo.remove(req.todo, function(err){
     if(err)
        return res.json(false);
  });
  res.json(true);
});

/* Toggle Todo DONE Status */
router.put('/todos/:todo/toggle-status', function(req, res, next) {
  req.todo.toggleDone(function(err, todo){
    if (err) { return next(err); }

    res.json(todo);
  });
});

/* Create New Todo Item */
router.post('/todos', function(req, res, next) {
  var todo = new Todo(req.body);

  todo.save(function(err, todo){
    if(err){ return next(err); }

    res.json(todo);
  });
});

module.exports = router;
