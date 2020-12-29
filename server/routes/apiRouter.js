const { Router } = require('express');

const apiRouter = Router();

apiRouter.get('/api/stats', (req, res) => {
  res.end();
});

module.exports = apiRouter;
