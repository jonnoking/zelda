// WORKS - 20160729

var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
var config = require("./config");
var oauth2Client = new OAuth2(config.googleapi.CLIENT_ID, config.googleapi.clientSecret, "http://localhost:3000");

// got token post Auth0 login - profile.identities[0].access_token
var access_token = "ya29.Ci8vAxn_dDbHbXZHonz1t2UDYn0W6t7dubobJDMM6jtAhRbYwlMkgSXz7aUR0ncQPg";
var refresh_token = "";

// Retrieve tokens via token exchange explained above or set them:
oauth2Client.setCredentials({
  access_token: access_token,
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