var express = require('express');
var bodyParser = require('body-parser');

var fs = require('fs');
var Techy = require('techy');
Techy(__dirname + '/public/html/ddefs/_articles', function() {
	this.compilePages();
	fs.renameSync(__dirname + '/public/html/ddefs/_articles/_dist/abc.html', __dirname + '/public/html/ddefs/_articles/_dist/abc.json');
	console.log("got ddef articles list"); 
    }, {    myprop: 'my value'});


//Converter Class
var Converter=require("csvtojson").core.Converter;
var csvFileName= __dirname + "/maplocations/dharmacenters.csv";
var fileStream=fs.createReadStream(csvFileName);

var csvConverter=new Converter({constructResult:true});

//end_parsed will be emitted once parsing finished
var outfile = fs.createWriteStream(__dirname + "/public/html/dharmacenters.json");
csvConverter.on("end_parsed",function(jsonObj){
	outfile.end(JSON.stringify(jsonObj));
	// console.log(jsonObj); //here is your result json object
	console.log("got dharmacenters markers");
    });

//read from file
fileStream.pipe(csvConverter);

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
