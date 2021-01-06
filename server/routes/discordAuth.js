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

    db.query(`SELECT * FROM "user" where discord_link = '${req.user.id}';`)
      .then(({ rows }) => {
        if (rows.length === 0) {
          db.query(
            `INSERT INTO "user" (name_user, discord_link) VALUES ('${req.user.username}', ${req.user.id});`,
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
  },
);

module.exports = router;
