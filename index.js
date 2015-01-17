var express = require('express');
var bodyParser = require('body-parser');

var fs = require('fs');
var Techy = require('techy');
Techy(__dirname + '/public/html/ddefs/_articles', function() {
	this.compilePages();
	fs.renameSync(__dirname + '/public/html/ddefs/_articles/_dist/abc.html', __dirname + '/public/html/ddefs/_articles/_dist/abc.json');
    }, { myprop: 'my value' });



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
	response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
