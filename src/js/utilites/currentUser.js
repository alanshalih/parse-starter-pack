window.Parse = require('parse');
Parse.initialize("CekTransferAja");
Parse.serverURL = 'http://localhost:1337/data'

module.exports = function(bind){
    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        return currentUser;
    } else {
        bind.$router.push('/login')
    }
}