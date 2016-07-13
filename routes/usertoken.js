var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {

    var userobject = {};
// make http call to tokeninfo service
    var jwtoken = req.headers["authorization"];
    jwtoken = jwtoken.replace("Bearer ", "");
    var idTokenBody = {
        id_token: jwtoken
    };

    // //works
    request.post(
        'https://jonno.eu.auth0.com/tokeninfo',
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