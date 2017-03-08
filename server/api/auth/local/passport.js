import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

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

export function setup (User/*, config*/) {
  passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
