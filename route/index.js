var path = require('path');
var express = require('express');
var dashboard = require('../dashboard')
module.exports = function(app){

    // Serve static assets from the /public folder
    app.use('/public', express.static(path.join(__dirname, '../public')));
   
    // front end
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    dashboard('/dashboard',app);
}