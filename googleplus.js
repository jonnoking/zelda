// WORKS - 20160729

var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
var config = require("./config");
var oauth2Client = new OAuth2(config.googleapi.CLIENT_ID, config.googleapi.clientSecret, "http://localhost:3000");

var async = require("async");
var rp = require('request-promise');

var  userid = "google-oauth2|106589115516039924494";

// need to create an non-interactive client with user_idp_tokens scope
//https://auth0.com/docs/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api
//https://jonno.eu.auth0.com/api/v2/users/google-oauth2%7C106589115516039924494?include_fields=true


var access_token = "";
var token_type = "";
var google_access_token = "";

async.series([
        function (callback) {
            var atOptions = {
            uri: config.Auth0UserManagement.issuer + "oauth/token",
            method: "POST",
            body: {
                audience: config.Auth0UserManagement.audience,
                grant_type: "client_credentials",
                client_id: config.Auth0UserManagement.clientId,
                client_secret: config.Auth0UserManagement.clientSecret        
            },
            json: true
        };

        var payload = {};

        rp(atOptions)
            .then(function (body){
                //console.log(body);        
                payload = body;
                //console.log(payload.access_token);
            
                access_token = payload.access_token;
                token_type = payload.token_type;
                callback();    
        });
        
    },
    function (callback) {

        console.log("---GETTING READY---");
        console.log(access_token);

        var options = {
            uri: config.Auth0UserManagement.issuer + "api/v2/users/"+userid + "?include_fields=true",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token 
            },
            json: true
        };
        
        rp(options)
            .then(function (body){
                console.log("Success");
                console.log(body);
                google_access_token = body.identities[0].access_token;
            })
            .catch(function (err){
                console.log("Error");
                console.log(err);
            }).finally(function () {
                callback();
            });
	},
    function (callback) {
        // got token post Auth0 login - profile.identities[0].access_token - REMOVED
        //https://auth0.com/docs/migrations
        // need to call auth0.../api/v2/user/{user_id}
        // scope - read:user_idp_tokens
        //var access_token = "ya29.Ci8vAxn_dDbHbXZHonz1t2UDYn0W6t7dubobJDMM6jtAhRbYwlMkgSXz7aUR0ncQPg";
        var refresh_token = "";

        // Retrieve tokens via token exchange explained above or set them:
        oauth2Client.setCredentials({
            access_token: google_access_token,
            refresh_token: refresh_token
        });

        plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
            if (err) {
                console.log("Error");
                console.log(err);
            } else {
                console.log(response);
            }
        });

    }        
]);











