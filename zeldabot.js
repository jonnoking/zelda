var config = require('./config');
var rp = require('request-promise');


console.log("zelda-bot starting....");
// request access-token

var atOptions = {
    uri: config.zeldaBot.issuer + "oauth/token",
    method: "POST",
    body: {
        audience: config.zeldaBot.audience,
        grant_type: "client_credentials",
        client_id: config.zeldaBot.clientId,
        client_secret: config.zeldaBot.clientSecret        
    },
    json: true
};

var payload = {};

rp(atOptions)
    .then(function (body){
        //console.log(body);        
        payload = body;
        console.log(payload.access_token);
    
var access_token = payload.access_token;
var token_type = payload.token_type;



var options = {
    uri: "http://localhost:3000/api/room",
    method: "GET",
    headers: {
        "Authorization": "Bearer "+access_token
    }
}

rp(options)
    .then(function (body){
        console.log("Success");
        console.log(body);
    })
    .catch(function (err){
        console.log("Error");
        console.log(err);
    });


    }). catch(function (err) {
        console.log("Error: ", err);
    });



console.log("zelda-bot finished");