var fs = require('fs');
var Techy = require('techy');
Techy(__dirname + '/CMS/ddefs/', function() {
	this.compilePages();
	fs.renameSync(__dirname + '/public/cms/ddefs/articleindex.html', __dirname + '/public/cms/ddefs/articleindex.json');
	console.log("got ddef articles list"); 
    }, {    dest: __dirname + '/public/cms/ddefs' });


var Converter=require("csvtojson").core.Converter;
var csvConverter=new Converter({constructResult:true});
var out = fs.createWriteStream(__dirname + "/public/cms/map/dharmacenters.json");
csvConverter.on("end_parsed",function(jsonObj){
	out.end(JSON.stringify(jsonObj));
	console.log("got dharmacenters markers");
    });
var fileStream=fs.createReadStream(__dirname + "/CMS/map/dharmacenters.csv");
fileStream.pipe(csvConverter);



var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// app.set('views', __dirname + '/public/views');
app.set('views', __dirname + '/public/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
	    extended: true
		}));
app.use(bodyParser.json());

app.use("/js", express.static(__dirname + '/public/js'));
app.use("/cms", express.static(__dirname + '/public/cms'));
app.use("/html", express.static(__dirname + '/public/ng_html'));

app.get('/', function(request, response) {
	response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
