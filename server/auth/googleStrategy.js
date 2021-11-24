const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const test = 0;
passport.serializeUser((user, done) => {
  done(test, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));
