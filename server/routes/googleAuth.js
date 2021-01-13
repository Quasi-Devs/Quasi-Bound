const { Router } = require('express');

const router = Router();
const passport = require('passport');
const db = require('../db/index');

router.get(
  '/',
  passport.authenticate(
    'google',
    { scope: ['https://www.googleapis.com/auth/plus.login'] },
  ),
);

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/logout' }),
  (req, res) => {
    res.cookie('QuasiBoundId', req.user.id);
    res.cookie('Quasigoogle', req.user.id);
    if (req.cookies.Quasidiscord) {
      db.query(`SELECT * FROM "user" where discord_link = '${req.cookies.Quasidiscord}';`)
        .then(({ rows }) => {
          if (!rows[0].google_link) {
            db.query(
              `UPDATE "user" SET google_link = ${req.user.id} WHERE discord_link = '${req.cookies.Quasidiscord}';`,
              (err) => {
                if (err) {
                  res.redirect('/');
                } else {
                  res.redirect('/rules');
                }
              },
            );
          } else {
            db.query(`SELECT * FROM "user" where google_link = '${req.user.id}';`)
              .then((data) => {
                if (data.rows.length === 0) {
                  db.query(
                    `INSERT INTO "user" (name_user, google_link, thumbnail) VALUES ('${req.user.displayName}', '${req.user.id}', '${req.user.photos[0].value}');`,
                    (err) => {
                      if (err) {
                        console.info(err);
                        res.redirect('/');
                      } else {
                        res.redirect('/rules');
                      }
                    },
                  );
                } else {
                  res.redirect('/home');
                }
              }).catch((err) => console.warn(err));
          }
        }).catch((err) => console.warn(err));
    } else {
      db.query(`SELECT * FROM "user" where google_link = '${req.user.id}';`)
        .then(({ rows }) => {
          if (rows.length === 0) {
            db.query(
              `INSERT INTO "user" (name_user, google_link, thumbnail) VALUES ('${req.user.displayName}', '${req.user.id}', '${req.user.photos[0].value}');`,
              (err) => {
                if (err) {
                  console.info(err);
                  res.redirect('/');
                } else {
                  res.redirect('/rules');
                }
              },
            );
          } else {
            res.redirect('/home');
          }
        }).catch((err) => console.warn(err));
    }
  },
);

module.exports = router;
