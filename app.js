var app = require('express')();
var redis = require('redis');
var bodyParser = require('body-parser');
var path = require('path');

// create a new Redis client and connect to Redis Labs instance
var client = redis.createClient({
  host: 'redis-13348.c15.us-east-1-2.ec2.cloud.redislabs.com',
  port: '13348'
});

// if an error occurs, print it to the console
client.on('error', function (err) {
  console.log("Error " + err);
});

// initial setup of game state
client.set('count', 0);

client.get('count', function (err, reply) {
  console.log(reply.toString());
});

// set server to support JSON-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup server API
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/add', function (req, res) {
  console.log('in POST /add');
  console.log('req.body', req.body);
});

app.post('/sub', function (req, res) {
  console.log('in POST /sub');
  console.log('req.body', req.body);
});

app.post('/clear', function (req, res) {
  console.log('in POST /clear');
  console.log('req.body', req.body);
});

app.post('/show', function (req, res) {
  console.log('in POST /show');
  console.log('req.body', req.body);
});

// set port
app.set('port', (process.env.PORT || 5000));

// start server
app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});
