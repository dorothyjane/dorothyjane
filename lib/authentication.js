
// var connection = require('../database'); // up one, ina folder...
// var passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     var encrypt_password = bcrypt.hashSync(password);
//     connection.query("select * from persons where name = ? and password = ?", [username, encrypt_password], function(err, response){
//       if(err){
//         return done(null, false, { message: "error finding person" });
//       }
//       var person = response[0];
//       if(!person){
//         return done(null, false, { message: "couldn't find person!" });
//       }
//       return done(null, person);
//     }); // have to have function, is asynchronous
//     // User.findOne({ username: username }, function(err, user) {
//     //   if (err) { return done(err); }
//     //   if (!user) {
//     //     return done(null, false, { message: 'Incorrect username.' });
//     //   }
//     //   if (!user.validPassword(password)) {
//     //     return done(null, false, { message: 'Incorrect password.' });
//     //   }
//     //   return done(null, user);
//     // });
//   }
// ));
