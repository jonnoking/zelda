var jwt = require('jsonwebtoken');
var UnauthorizedError = require('./middleware/errors/UnauthorizedError');


module.exports = function(req, res, next) {  
    if (req.method === 'GET') {
        var lang = 'en';
        var langs = req.acceptsLanguages();
        if (langs[0] !== '*') {
            if (langs[0].length > 2) {
                // ex: en-US
                lang = langs[0].substring(0, 2);
            } else {
                // ex: en
                lang = langs[0];
            }
        }

        if (lang !== res.body.lang) {
            return translate(res.body.message, lang, function(err, translation) {
                res.body.message = translation;
                res.body.lang = lang;
                next();
            });
        }
    }

    next();
};