var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
	    extended: true
		}));
app.use(bodyParser.json());

app.use("/js", express.static(__dirname + '/public/view/js'));





app.get('/', function(request, response) {
	// response.send('Hello World!');
	response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
