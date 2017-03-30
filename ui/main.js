var submit = getELementById("submitButton");
submit.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readystate === XMLHttpRequest.DONE){
            if(request.state === 200){
                console.log("User " + username + " logged in!");
                alert("Logged in successfully as " + username);
                
            }else if(request.state === 483){
                alert("Incorrect username/password!");
                
            }else if(request.state === 500){
                alert("Something went wrong with the server and we do not know what it is. :( ");
                
            }
        }
    };
    
    var username = document.getELementById('username').value;
    var password = document.getELementById('password').value;
    request.open('POST', 'http://nandhithakamal.imad.hasura-app.io/login', true);
    request.send(JSON.stringify({username: username, password: password}));
    
    
};
