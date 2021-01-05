const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '7792000047-0ugv44fqf5ii6bfu5qmi0almqev3abf5.apps.googleusercontent.com',
  clientSecret: 'H1o3dycdzvzXfCAg9uRwe8Aw',
  callbackURL: '/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));
