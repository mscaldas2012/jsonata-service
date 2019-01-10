  
var jsonata = require("jsonata");
var fs = require('fs'); 
var argv = require('minimist')(process.argv.slice(2));
var swagger = require("swagger-node-express");
require('dotenv').config();


//Load express module with `require` directive
var express = require('express') , http = require('http')
  , path = require('path')
  , util = require('util');
var app = express();

  


const port = process.env.PORT || 9081;  //do not pass PORT in '.env' file... must be from cmd line.
const HOST = '0.0.0.0';
console.log('PORT Val: ' + port);
 

//pull initial json and jsonata from file(as example)
var inputJson =   fs.readFileSync('gordonjson.txt', 'utf8');
var parsedJson =  JSON.parse(inputJson);
var parsedJsonata =   fs.readFileSync('gordonjsonata.txt', 'utf8');
  

//set body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
//set json to record Jsonata transforms
 
var jsonatabody = [];
 var jsonatainfo =  {"Jsosonata": "list"};  
 //var jsonatainfo =  {"key": 0,"jsonataid":"1111111111111","jsonatadesc":"default"}  ;
jsonatainfo[Object.keys(jsonatainfo).length ] ={"key": 0,"jsonataid":"1111111111111","jsonatadesc":"default"};
 
jsonatabody.push(parsedJsonata); 

// Create Jsonata query
var expression = jsonata(parsedJsonata);

// Process Jsonata query against var test1
var result = expression.evaluate(parsedJson);  // returns 50 from command line
  



// ROUTES FOR OUR API
var router = express.Router();              //  instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json(  result  );   
});

//pull input json to be processed
app.post('/api/inputJson', function(req, res) {
 inputJson =  req.body ;

//console.log('inputJsonParm: ' + inputJsonParm);
res.send(inputJson  );

parsedJson =   inputJson ;
//var jsonataResult = expression.evaluate(parsedJson);
result = parsedJson;

//console.log(inputJson);

});

// this is to parse jsonata from body as it is not JSon
app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});


// post for Jsonata
app.post('/api/jsonata', function(req, res) {
 
 parsedJsonata =   req.rawBody  ;
var jsonataid = req.query.jsonataid;
var jsonatadesc = req.query.jsonatadesc;
 
//console.log('jsonatainfo.length+1:   '  +  Object.keys(jsonatainfo).length );
jsonatainfo[Object.keys(jsonatainfo).length + 1 ] = { key: Object.keys(jsonatainfo).length -2,jsonataid: jsonataid  ,jsonatadesc: jsonatadesc };
jsonatabody.push(parsedJsonata);

 
 expression = jsonata(parsedJsonata); 
 res.send(parsedJsonata  );  
console.log( jsonatainfo);
});

 
app.get('/api/jsonata/list', function (req,res) {
 



res.format ({
    

   
   'application/json': function() {
      res.send( jsonatainfo);
   },

   'default': function() {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
   }
});


});

//Define request response in root URL (/), return processed inputjson
app.get('/api/result', function (req, res) {

var jsonataidnum = req.query.jsonataidnum;
 
  

//if (jsonatabody.length > jsonataidnum && jsonataidnum != 0){
if (jsonatabody.length > jsonataidnum ){
//console.log('got here length: '+ jsonatabody.length);
var temp = jsonatabody[jsonataidnum];
 
expression = jsonata(temp);
 
result = expression.evaluate(inputJson);
 
res.send(result);
 
} 
else {
 res.send("Value out of range!") ;
 
 }

});



//Define request response in root URL (/), return processed inputjson
app.get('/api/bulkresult', function (req, res) {
    var result2 = [];
    var sourcefile = req.query.sourcefile;
    var destinationfile = req.query.destinationfile;

    var inputJson1 = fs.readFileSync(sourcefile, 'utf8');
    
    var parsedJson1 = JSON.parse(inputJson1);

    require('log-timestamp')(function () { return 'date="' + new Date().toISOString() + '" message="%s"' });
    console.log('start result2 %s');
    var jsonataidnum = req.query.jsonataidnum;  
    var temp = jsonatabody[jsonataidnum];
    expression = jsonata(temp);


    var k = parsedJson1.hits.hits.length;

   // console.log("k : " + k);
    for (var i = 0; i < k; i++) {
        
        j = i % 10;
       // console.log("j value:  " + j);
        parsedJson.fieldSchemas = (parsedJson1.hits.hits[j]._source);
        inputjson = JSON.stringify(parsedJson);
        

        if (jsonatabody.length > jsonataidnum && jsonataidnum !== 0){
            if (jsonatabody.length > jsonataidnum) {
                
                var temp1 = jsonatabody[jsonataidnum];

                expression = jsonata(temp1);
                
                result2.push(expression.evaluate(inputJson));
            }
            else {
                res.send("Value out of range!");
            }
            
        }
    }
    res.send("done");
    fs.writeFileSync(destinationfile, JSON.stringify(result2));
    console.log('finish result_1010 %s' );
});



// info gets:
app.get('/api/info/ping', function (req,res) {
res.send('ok');
});
app.get('/api/info/about', function (req,res) {
res.send(process.env.aboutnote);
});
app.get('/api/info/version', function (req,res) {
var versionres ='version: ' + process.env.version ;
res.send(versionres);
})

// routes will go here
app.post('/test/users2', function(req, res) {
 console.log('got here test.');
    
  var user_id = req.query.id;
  var token = req.query.token;
  var geo = req.query.geo;  

  res.send(user_id + ' ' + token + ' ' + geo);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);




//Launch listening server on port 8081(should be port)
app.listen(port, function () {
  console.log('app listening on port ' + port + '!')
})









