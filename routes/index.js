var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shop/index3', { title: 'Express' });
  console.log("as;dklfja;slkdj");
});

module.exports = router;
