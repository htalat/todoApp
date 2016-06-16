var express = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;

var ToDo = require('./ToDo');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connect('mongodb://localhost:27017/db', function(err) {
	if (err) {
		console.error('Could not connect to MongoDB!');
		console.log(err);
	}else
	    console.log("connected to the database");
});

app.get('/api/todos',function(req,res){
      console.log('finding');
      ToDo.find(function(err,todos){
        if(err)
            res.status(500).send('Something broke!');

        res.json(todos);
      });

});

app.post('/api/todos',function(req,res){

  var todo = new ToDo();
  todo.text= req.body.text;
  todo.done = false;
  console.log(todo);
  todo.save(function(err,data){
      if(err)
      {
        console.log(err);
        res.status(500).send('Something broke!');

      }
      else {
        res.status(200).json(data);
      }
  });

});

app.delete('/api/todos/:id',function(req,res){

		ToDo.remove({
			_id:req.params.id
		},function(err){
			if(err)
			{
				console.log(err);
				res.status(500).send('Something broke');
			}else{
				res.status(200).send('Removed');
			}
		});

});

app.get('/api/todos/:id',function(req,res){
	ToDo.findById(req.params.id,function(err,todo){
		if(err){
			console.log(err);
			res.status(500).send('Error');
		}else{
			res.status(200).json(todo);
		}
	});
});

app.put('/api/todos/:id',function(req,res){
	ToDo.findById(req.params.id,function(err,todo){
		if(err)
		{
			console.log(err);
			res.status(500).send('Error finding the item');
		}else {
			todo.text = req.body.text;
			todo.done = req.body.done;
			todo.save(function(err){
					res.status(200).send('Item updated');
			});

		}
	});
});

app.listen(port);
console.log('listening on port: ' + port);
