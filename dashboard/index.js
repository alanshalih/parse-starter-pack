
var ParseDashboard = require('parse-dashboard');
require('dotenv').config()

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.SERVER_URL,
      "appId": process.env.APP_ID,
      "masterKey": process.env.MASTER_KEY,
      "appName": process.env.APP_NAME
    }
  ]
});


module.exports = function(path, app){
    app.use(path, dashboard);
}

