
var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/data",
      "appId": "CekTransferAja",
      "masterKey": "simplyEasyPaymentCheck",
      "appName": "CekTransferID"
    }
  ]
});


module.exports = function(path, app){
    app.use(path, dashboard);
}

