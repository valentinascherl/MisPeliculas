var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

/* GET home page. */
router.get('/', moviesController.root);

router.get('/detail/:id', moviesController.detail);

router.get('/new', moviesController.new);

router.get('/recommended', moviesController.recommended);

router.get('/search', moviesController.get_search);
router.post('/search', moviesController.search);

module.exports = router;
