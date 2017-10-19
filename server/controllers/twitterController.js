const APIError = require('../middlewares/rest').APIError;
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'https://search-es-twitt-map-ir5ds3jwvskixnj3tgrcdphmi4.us-west-2.es.amazonaws.com'
});

module.exports = {
    async getKeywords(ctx, next) {
        await client.search({
          index: 'twitter',
          type: 'tweet',
          body: {
            aggs: {
              tophashtags: {
                terms: {
                  field: 'hashtags.keyword'
                }
              }
            }
          }
        }).then(function (resp) {
            let hashtags = resp.aggregations.tophashtags.buckets
            ctx.rest({
                keywords: hashtags
            });
        }, function (err) {
            throw new APIError(err.code, err.message);
            console.trace(err.message);
        });
    },

    async getTweets(ctx, next) {
        ctx.rest({
            tweets: 'tweets'
        });
    },
}