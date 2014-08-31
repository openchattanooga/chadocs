var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH,
});

var PAGE = 10;
var INDEX = 'chadocs';
var TYPE = 'document';

function pageToFrom(p) {
  return p * 10;
}

function query(q, page) {
  return client.search({
           index: INDEX,
           type: TYPE,
             from: pageToFrom(page),
             size: PAGE,
           body: {
             query: {
               filtered: {
                 query: {
                   match: {
                     content: q
                   }
                 }
               }
             },
             highlight: {
               fields: {
                 content: {}
               }
             },
             fields: [
               "title",
               "original_source_url"
             ],
             from: 0,
             size: 50,
             sort: {
               _score: {
                 order: "desc"
               }
             },
           }
           
         });
}

function getDocumentById(id) {
  return client.get({
    index: INDEX,
    type: TYPE,
    id: id,
    fields: ['content', 'title']
  });
}

exports.getDocumentById = getDocumentById;
exports.query = query;
exports.PAGE = PAGE;
