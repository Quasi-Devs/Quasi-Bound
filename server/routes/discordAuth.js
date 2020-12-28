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

    db.query(
      `INSERT INTO "user" (name_user, id_link) VALUES ('${req.user.username}', ${req.user.id});`,
      (err) => {
        if (err) {
          res.redirect('/');
        } else {
          res.redirect('/rules');
        }
      }
    );
  }
);

module.exports = router;
