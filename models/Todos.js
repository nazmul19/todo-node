var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: { type: String},
  done: { type: Boolean, default: false}
});

TodoSchema.methods.toggleDone = function(cb){
	this.done = !this.done;
	this.save(cb);
}

mongoose.model('Todo', TodoSchema);