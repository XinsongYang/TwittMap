const url = require('url');
const Validator = require('validatorjs');
const APIError = require('../middlewares/rest').APIError;
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'https://search-es-twitt-map-ir5ds3jwvskixnj3tgrcdphmi4.us-west-2.es.amazonaws.com'
});

module.exports = {
    async getHotKeywords(ctx, next) {
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
        }).then(function(resp) {
            let hashtags = resp.aggregations.tophashtags.buckets;
            let hotKeywords = hashtags.map(hashtag => hashtag.key);
            ctx.rest({
                hotKeywords
            });
        }, function(err) {
            throw new APIError(err.code, err.message);
            console.trace(err.message);
        });
    },

    async getTweetsByKeyword(ctx, next) {
        let queryData = url.parse(ctx.request.url, true).query;
        let validation = new Validator(queryData, {
            keyword: 'required',
        });
        if (validation.passes()) {
            let params = {
                index: 'twitter',
                type: 'tweet',
                body: {
                    size: 10,
                    query: {
                        match: {
                            text: queryData.keyword
                        }
                    },
                    sort: [
                        { _uid: { order: 'desc' } },
                    ],
                }
            };
            if ('searchAfter' in queryData) {
                params.body.search_after = [queryData.searchAfter];
            }
            await client.search(params).then(function(resp) {
                // TODO try
                let hits = resp.hits.hits;
                let tweets = hits.map(hit => hit._source);
                ctx.rest({
                    tweets
                });
            }, function(err) {
                throw new APIError(err.code, err.message);
                console.trace(err.message);
            });
        } else {
            // TODO ERROR
            throw new APIError();
        }
    },

    async getTweetsByCoord(ctx, next) {
        let queryData = url.parse(ctx.request.url, true).query;
        let validation = new Validator(queryData, {
            lat: 'required',
            lon: 'required',
            distance: 'required'
        });
        if (validation.passes()) {
            let params = {
                index: 'twitter',
                type: 'tweet',
                body: {
                    size: 10,
                    query: {
                        bool: {
                            must: {
                                match_all: {}
                            },
                            filter: {
                                geo_distance: {
                                    distance: queryData.distance,
                                    "coordinates.coordinates": {
                                        lat: queryData.lat,
                                        lon: queryData.lon
                                    }
                                }
                            }
                        }
                    },
                    sort: [
                        { _uid: { order: 'desc' } },
                    ],
                }
            };
            if ('searchAfter' in queryData) {
                params.body.search_after = [queryData.searchAfter];
            }
            await client.search(params).then(function(resp) {
                // TODO try
                let hits = resp.hits.hits;
                let tweets = hits.map(hit => hit._source);
                ctx.rest({
                    tweets
                });
            }, function(err) {
                throw new APIError(err.code, err.message);
                console.trace(err.message);
            });
        } else {
            // TODO ERROR
            throw new APIError();
        }
    },
}