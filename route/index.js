var path = require('path');
var express = require('express');
var dashboard = require('../dashboard')
module.exports = function(app){

    // Serve static assets from the /public folder
    app.use('/public', express.static(path.join(__dirname, '../public')));
   
    // front end
    app.get('/', function(req, res) {
        if(process.env.ENVIRONTMENT=='local')
        res.render('index', {locals: {script: '<script src="/public/js/live.js"></script>'}});
        else
        res.render('index');
    });

    dashboard('/dashboard',app);
}