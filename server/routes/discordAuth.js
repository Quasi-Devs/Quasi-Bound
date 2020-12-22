const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get(
  '/redirect',
  passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/home',
  })
);

module.exports = router;
