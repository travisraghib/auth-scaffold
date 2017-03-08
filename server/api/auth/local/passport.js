const passport = require('passport');
const { Strategy } = require('passport-local');

function localAuthenticate (User, email, password, done) {
  email = email.toLowerCase();
  User.findOne({ email }).exec()
      .then(user => {
        if (!user) return done(null, false, { message : 'This email is not registered.' });

        user.authenticate(password, (authError, authenticated) => {
          if (authError) return done(authError);

          if (!authenticated)return done(null, false, { message : 'This password is not correct.' });

          return done(null, user);
        });
      })
      .catch(err => done(err));
}

exports.setup  = (User) => {
  passport.use(new Strategy({
    usernameField : 'email',
    passwordField : 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
