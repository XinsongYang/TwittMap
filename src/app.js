import './bootstrap'

new Vue({
    el: '#app',

    data: {
        keyword: '',
        tweets: [],
        response: {}
    },

    components: {
        'gmap': require('./components/Map'),
        'search-box': require('./components/SearchBox'),
        'tweet': require('./components/Tweet'),
        'tweet-list': require('./components/TweetList')
    },

    created() {
        Event.$on('submit', keyword => {
            // range
            this.keyword = keyword;
            
            axios.get('/api/tweets', {
                params: { keyword }
            }).then(response => {
                this.tweets = response.data.tweets;
                // render
            }).catch( error => {
                alert("error");
                console.log(error);
            });
        })
    },

    methods: {
        search() {
            axios.get('/api/tweets', {
                params: { keyword: this.keyword }
            }).then(response => {
                this.tweets = response.data.tweets;
                // render
            }).catch( error => {
                alert("error");
                console.log(error);
            });
        }
    }

});

