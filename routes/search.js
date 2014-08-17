var express = require('express');
var router = express.Router();
var search = require('../search/search');

router.get('/', function(req, res) {
  var query = req.query.q;

  if (query === "") {
    res.render('search', { title: 'chadocs', results: [], query: query });
  } else {
    search.query(query).then(function (resp) {
      res.render('search', { title: 'chadocs', results: resp.hits.hits, query: query });

    }, function (err) {
      console.trace(err.message);
    });
  }
});

module.exports = router;
