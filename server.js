var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');


var config = {
    user: "nandhithakamal",
    database: "nandhithakamal",
    password: "db-nandhithakamal-51281",
    host: "db.imad.hasura-app.io",
    port: "5432",
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, "Some-random-string");
    res.send(hashedString);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2', "10000", salt, hashed.toString('hex')].join('$');
}

var pool = new Pool(config);

app.post('/newuser', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    var maild = req.body.mailid;
    var salt = "fjoisfiofiemfksdmfkwaAFFRWG49094023992ksdhfsdfsdjfsdf";
    var dbString = hash(password, salt);
    pool.query('INSERT INTO users (username, password, mailid) VALUES($1, $2, $3)', [username, dbString, mailid], function(err, result){
        if(err){
            res.status(500).send(err.toString());
            
        }
        else{
            res.send("User created successfully!" + username);
        }
        
    });
});


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


app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('select * from users where username = $1', [username], function(err, result){
        if(err){
            res.status(500).send(err.toString());
            
        }
        else{
            if(result.rows.length === 0){
                res.send(err.status(400).send("Invalid username/password"));
            }else{
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(hashedPassword === dbString){
                     res.send("Logged in successfully!" + username);
                }
                else{
                    res.send(err.status(400).send("Invalid username/password"));
                }
               
            }
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
