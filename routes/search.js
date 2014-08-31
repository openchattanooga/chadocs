var express = require('express');
var router = express.Router();
var search = require('../search/search');

function currentPage(p) {
  if (p === undefined || parseInt(p) <= 1) {
    return 1;
  } else {
    return parseInt(p);
  }
}

function totalPages(hits) {
  return hits / search.PAGE;
}

router.get('/', function(req, res) {
  var query = req.query.q;
  var page = currentPage(req.query.page);

  if (query === "") {
    res.render('search', { title: 'chadocs', results: [], query: query });
  } else {
    search.query(query, page - 1).then(function (resp) {
      res.render('search', { title: 'chadocs', results: resp.hits.hits, query: query, pages: totalPages(resp.hits.total), currentPage: page});

    }, function (err) {
      console.trace(err.message);
    });
  }
});

module.exports = router;
