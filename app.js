var express = require('express');
var app = express();
var routes = require('./routes/index');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);

app.use('*',function(req,res){
	res.send('This page is not found!');
});


app.listen(process.env.PORT || 1337,function(){
	console.log("server start success!");
});
