const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const pool = require('../db/index');

/**
 * Creates a new user instance as Req.user.
 */

passport.serializeUser((user, done) => {
  done(null, user);
});

/**
 * Destroys Req.user instance.
 */
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT,
      scope: ['identify', 'email', 'guilds'],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
