const express = require('express');
const router = express.Router();
const { dirname } = require('path');
require('express-group-routes');


global.base_path = dirname(require.main.filename)


/* GET users listing. */
router.get('/', (req, res) => {
    res.json({ message: { message: 'respond with a resource' }, status: 200, error: false });
});

const v1 = require('../src/v1/api/routes/index');

router.use('/api/v1', v1);



router.group('/socket',(router) => {
  router.get('/', (req, res) => {
    res.render('index')
  });
  router.get('/user', (req, res) => {
    res.render('room')
  });
})

module.exports = router;
