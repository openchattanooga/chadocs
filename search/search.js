var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH,
});

function query(q) {
  return client.search({
           index: 'chadocs',
           type: 'document',
           body: {
             query: {
               filtered: {
                 query: {
                   query_string: {
                     query: q
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
                 order: "asc"
               }
             },
           }
           
         });
}

exports.query = query;
