
var express = require('express'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.json({limit: '3mB'}));
app.use(bodyParser.urlencoded({ limit: '3mB', extended: true }));
app.use(express.static(__dirname));

var dbName = 'local';
var mongoURL = 'mongodb://localhost:27017/'+dbName;

app.get('/mongo-collections', function(req, res){

	MongoClient.connect(mongoURL, function(err, db) {

		db.listCollections().toArray(function(err,items){
			res.send(items.map(itm=>itm.name));
			db.close();
		});

	});

});

app.post('/mongo-drop', function(req, res){
    var colName = req.body.name;
    if(!colName){
    	res.send('nothing done');
    	return;
    }

	MongoClient.connect(mongoURL, function(err, db) {

		db.collection(colName).drop(function(err,result){
			res.send(result);
			db.close();
		});

	});

});

app.post('/mongo-insert/:col', function(req, res){

    var option = req.body;
    var colName = req.params.col;

	MongoClient.connect(mongoURL, function(err, db) {
		db.collection(colName).insert(option, function(err,result){
			res.send(result);
			db.close();
		});
	});

});
app.post('/mongo-show/:col', function(req, res){
    var option = req.body;
    var colName = req.params.col;

	MongoClient.connect(mongoURL, function(err, db) {
		db.collection(colName).find(option).toArray(function(err,result){
			res.send(result);
			db.close();
		});
	});

});


app.get('*', function(req, res){
    res.redirect('/index.html');
});

app.listen(1111, 'localhost', function(){
  console.log("Server started: http://localhost:1111");
});
