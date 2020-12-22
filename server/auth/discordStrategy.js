const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.get('/redirect', (req, res) => {
  res.send(200);
});

module.exports = router;
