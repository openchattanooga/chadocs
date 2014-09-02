var express = require('express');
var router = express.Router();
var search = require('../search/search');


router.get('/:id', function(req, res) {
  var id = req.params.id;

  search.getDocumentById(id).then(function (resp) {
    res.render('document', { title: 'chadocs', content: resp._source.content, docTitle: resp._source.meta.title });

  }, function (err) {
    res.render('document', { title: 'chadocs', content: 'Your document was not found.', docTitle: 'Not found!' });
  });
});

module.exports = router;
