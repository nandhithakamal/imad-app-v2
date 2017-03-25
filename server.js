var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
    user: "nandhithakamal",
    database: "nandhithakamal",
    password: "db-nandhithakamal-51281",
    host: "db.imad.hasura-app.io",
    port: "5432",
};


var app = express();
app.use(morgan('combined'));

counter = 0;
app.get('/counter', function(req, res){
    counter += 1;
    res.send("This has been opened " + counter.toString() + " times");
});


app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, "Some-random-string");
    res.send(hashedString);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/newuser', function(req, res){
    var salt = "BLah! bLaah! thIs is RandOM caPitAlIsatioN";
    var dbString = hash(password, salt);
    pool.query('INSERT INTO users VALUES(username, dbString)', function(err, result){
        if(err){
            res.status(500).send(err.toString());
            
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
        
    });
})
var pool = new Pool(config);

app.get('/test-db', function(req, res){
    pool.query('select * from test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
            
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/aboutme', function(req, res){
    res.sendFile(path.join(__dirname + '/aboutMe.html'));
});

app.get('/page2', function(req, res){
    res.send("Page 2 of my webapp");
});

app.get("/page3", function(req, res){
    res.send("Page3 of my webapp");
});






var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
