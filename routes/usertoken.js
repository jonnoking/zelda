var express = require('express');
var passport = require('passport');
var router = express.Router();
var https = require('https');
var request = require('request');
var jwt = require('express-jwt');
var config = require('../config.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var userobject = {};
    // make http call to auth0 tokeninfo service
    
    var jwtoken = req.headers["authorization"];
    jwtoken = jwtoken.replace("Bearer ", "");
    var idTokenBody = {
        id_token: jwtoken
    };

    // //works
    request.post(
        config.auth0.tenant_url+'/tokeninfo',
        {
            form:{ id_token: jwtoken }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                userobject = JSON.parse(body);
                console.log(body);
                res.json({info: '/usertoken', user: userobject});
            } else {
                res.json({info: '/usertoken', error: error});
            }                        
            return;
        }
    );    
});

module.exports = router;