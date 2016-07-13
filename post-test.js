// TEST - works
var http = require("https");
var jwtstring = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2pvbm5vLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNjU4OTExNTUxNjAzOTkyNDQ5NCIsImF1ZCI6ImFMOEtHOXNMU3M2ZEZ2Q1BPb01qcFBTZXc5a3dFd0VPIiwiZXhwIjoxNDY4NDM5OTgwLCJpYXQiOjE0Njg0MDM5ODB9.BNHTaJufVh5pL8EXasVbGGhZ7c-InAXw_kZdT8zIaOQ";
    var idTokenBody = {
        id_token: jwtstring
    };

    var options = {
        method: "POST",
        host: 'jonno.eu.auth0.com',
        path: '/tokeninfo',
        headers: {
            "Content-Type": "application/json"
        }
    };

    var requestPost = http.request(options, function(response){
        response.setEncoding('utf8');
        response.on('data', function (chunk){
            console.log(chunk);
            userobject = JSON.parse(chunk);
            
        });
        response.on("error", function(error){
            console.log(error);
            return;
        });
    });

    
        requestPost.write(JSON.stringify(idTokenBody));
        requestPost.end();
   