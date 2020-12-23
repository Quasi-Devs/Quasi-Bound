const { Router } = require('express');
const router = Router();
const passport = require('passport');
const db = require('../db/index');

router.get('/', passport.authenticate('discord'));
router.get(
  '/redirect',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    db.query(
      `INSERT INTO "user" (name_user, id_link) VALUES ('${req.user.username}', ${req.user.id});`,
      (err, results) => {
        if (err) {
          res.redirect('/');
          console.info(err);
        } else {
          res.redirect('/home');
        }
      }
    );
  }
);

module.exports = router;
