const { Router } = require('express');

const router = Router();
const passport = require('passport');
const db = require('../db/index');

router.get('/', passport.authenticate('discord'));
router.get(
  '/redirect',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    res.cookie('QuasiBoundId', req.user.id);
    res.cookie('Quasidiscord', req.user.id);
    if (req.cookies.Quasigoogle) {
      db.query(`SELECT * FROM "user" where google_link = '${req.cookies.Quasigoogle}';`)
        .then(({ rows }) => {
          if (rows.length === 0) {
            db.query(`SELECT * FROM "user" where discord_link = '${req.user.id}';`)
              .then((data) => {
                if (data.rows.length === 0) {
                  db.query(
                    `INSERT INTO "user" (name_user, discord_link, thumbnail) VALUES ('${req.user.username}', ${req.user.id}, 'https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.jpg');`,
                    (err) => {
                      if (err) {
                        res.redirect('/');
                      } else {
                        res.redirect('/rules');
                      }
                    },
                  );
                } else {
                  res.redirect('/home');
                }
              });
          } else if (!rows[0].discord_link) {
            db.query(
              `UPDATE "user" SET discord_link = ${req.user.id} WHERE google_link = '${req.cookies.Quasigoogle}';`,
              (err) => {
                if (err) {
                  res.redirect('/');
                } else {
                  res.redirect('/rules');
                }
              },
            );
          } else {
            db.query(`SELECT * FROM "user" where discord_link = '${req.user.id}';`)
              .then((rowData) => {
                if (rowData.rows.length === 0) {
                  db.query(
                    `INSERT INTO "user" (name_user, discord_link, thumbnail) VALUES ('${req.user.username}', ${req.user.id}, 'https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.jpg');`,
                    (err) => {
                      if (err) {
                        res.redirect('/');
                      } else {
                        res.redirect('/rules');
                      }
                    },
                  );
                } else {
                  res.redirect('/home');
                }
              });
          }
        });
    } else {
      db.query(`SELECT * FROM "user" where discord_link = '${req.user.id}';`)
        .then(({ rows }) => {
          if (rows.length === 0) {
            db.query(
              `INSERT INTO "user" (name_user, discord_link, thumbnail) VALUES ('${req.user.username}', ${req.user.id}, 'https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.jpg');`,
              (err) => {
                if (err) {
                  res.redirect('/');
                } else {
                  res.redirect('/rules');
                }
              },
            );
          } else {
            res.redirect('/home');
          }
        });
    }
  },
);

module.exports = router;
