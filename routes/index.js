var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/22', function(req, res, next){
  res.sendFile("C:/dev/webdev/myapp/public/beckDocs/ShowDocument_22.html")
})
module.exports = router;
