import './bootstrap'

new Vue({
    el: '#app',

    data: {
        hotKeywords: [],
        keyword: '',
        coordinate: {},
        searchType: '',
        tweets: [],
    },

    components: {
        'gmap': require('./components/Map'),
        'search-box': require('./components/SearchBox'),
        'tweet': require('./components/Tweet'),
        'tweet-list': require('./components/TweetList')
    },

    methods: {
        search(api, params, isSearchAfter) {
            axios.get(api, {
                params: params
            }).then(response => {
                if (isSearchAfter) {
                    this.tweets = this.tweets.concat(response.data.tweets);
                } else {
                    this.tweets = response.data.tweets;
                }
            }).catch( error => {
                alert("error");
                console.log(error);
            });
        },

        searchByKeyword(keyword, isSearchAfter=false) {
            let params = { keyword };
            if (isSearchAfter) {
                let lastTweet = this.tweets[this.tweets.length - 1];
                params.searchAfter = "tweet#" + lastTweet.id_str;
            }
            this.search('/api/tweetsByKeyword', params, isSearchAfter);
        },

        searchByCoord(coordinate, isSearchAfter=false) {
            let params = coordinate;
            if (isSearchAfter) {
                let lastTweet = this.tweets[this.tweets.length - 1];
                params.searchAfter = "tweet#" + lastTweet.id_str;
            }
            this.search('/api/tweetsByCoord', params, isSearchAfter);
        },

        searchMore() {
            if (this.searchType == 'keyword') {
                this.searchByKeyword(this.keyword, true);
            } else if (this.searchType == 'coordinate') {
                this.searchByCoord(this.coordinate, true);
            }
        }
    },

    created() {
        axios.get('/api/hotKeywords')
            .then(response => {
                this.hotKeywords = response.data.hotKeywords;
            }).catch( error => {
                alert("error");
                console.log(error);
            });
    },

    mounted() {
        
        Event.$on('keywordSubmit', keyword => {
            this.keyword = keyword;
            this.searchType = 'keyword';
            this.searchByKeyword(keyword, false);
        });

        Event.$on('mapClicked', coordinate => {
            this.coordinate = coordinate;
            this.searchType = 'coordinate';
            this.searchByCoord(coordinate, false);
        });

        Event.$on('searchMore', coordinate => {
            this.searchMore();
        });
    
    }

});

